/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Ambient hero field
 * ---------------------------------------------------------------------------
 * A low-density field of soft points laid on a tilted plane and gently
 * displaced by layered sine waves in the vertex shader. It reads like a quiet
 * topographic surface behind the hero copy.
 *
 * Performance budget:
 *  - Single draw call, all motion computed on the GPU (only 2 uniforms / frame)
 *  - ~3.2k points desktop, ~1.1k mobile; DPR capped at 1.5 (1.25 on mobile)
 *  - Render loop fully stops when off-screen or when the tab is hidden
 *  - Every geometry / material / renderer is disposed on unmount
 *  - This module is lazy-loaded, so `three` never blocks first paint
 */

import React, { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform vec2 uHalf;
  attribute float aSeed;
  varying float vAlpha;
  varying float vHeight;

  void main() {
    vec3 p = position;
    float t = uTime;
    float w = sin(p.x * 0.42 + t * 0.32) * 0.38
            + cos(p.y * 0.55 + t * 0.24) * 0.30
            + sin((p.x + p.y) * 0.21 - t * 0.18) * 0.42;

    float d = distance(p.xy, uMouse);
    w += exp(-d * d * 0.12) * 0.55;
    p.z += w;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.65 + aSeed * 0.7) / -mv.z;

    float ex = 1.0 - smoothstep(0.55, 1.0, abs(position.x) / uHalf.x);
    float ey = 1.0 - smoothstep(0.35, 1.0, abs(position.y) / uHalf.y);
    vHeight = w;
    vAlpha = ex * ey * (0.26 + 0.7 * smoothstep(-0.7, 1.0, w));
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vHeight;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    float disc = smoothstep(0.5, 0.0, r);
    vec3 col = mix(uColorB, uColorA, smoothstep(-0.4, 1.0, vHeight));
    gl_FragColor = vec4(col, disc * vAlpha * uOpacity);
  }
`;

const canUseWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
};

const ThreeHeroBackground: React.FC<{ className?: string }> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !canUseWebGL()) return;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch {
      return; // graceful fallback: CSS backdrop remains
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight, false);
    const canvas = renderer.domElement;
    canvas.style.cssText = 'width:100%;height:100%;display:block;opacity:0;transition:opacity 1.6s cubic-bezier(.16,1,.3,1)';
    container.appendChild(canvas);

    const scene = new Scene();
    const camera = new PerspectiveCamera(50, container.clientWidth / Math.max(container.clientHeight, 1), 0.1, 60);
    camera.position.set(0, 0, 9);

    // Grid of points on a plane
    const cols = isMobile ? 46 : 84;
    const rows = isMobile ? 24 : 38;
    const halfW = isMobile ? 8 : 13;
    const halfH = isMobile ? 6 : 8;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    let i = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const jitter = 0.08;
        positions[i * 3] = (x / (cols - 1) - 0.5) * halfW * 2 + (Math.random() - 0.5) * jitter;
        positions[i * 3 + 1] = (y / (rows - 1) - 0.5) * halfH * 2 + (Math.random() - 0.5) * jitter;
        positions[i * 3 + 2] = 0;
        seeds[i] = Math.random();
        i++;
      }
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0, 0) },
      uPixelRatio: { value: pixelRatio },
      uSize: { value: isMobile ? 44 : 54 },
      uHalf: { value: new Vector2(halfW, halfH) },
      uColorA: { value: new Color('#7ff0fb') },
      uColorB: { value: new Color('#6d7cf5') },
      uOpacity: { value: 0.9 },
    };

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });

    const field = new Points(geometry, material);
    field.rotation.x = -1.12;
    field.position.y = -1.6;
    scene.add(field);

    // Pointer influence (eased; desktop only)
    const targetMouse = new Vector2(0, 0);
    const onPointer = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      targetMouse.set(nx * halfW * 1.6, -ny * halfH * 1.4 + 1.5);
    };
    if (!isMobile && !reduced) window.addEventListener('pointermove', onPointer, { passive: true });

    // Render loop that only runs while visible
    let raf = 0;
    let running = false;
    let inView = true;
    let last = performance.now();
    let elapsed = 0;
    let shown = false;

    const renderFrame = () => {
      renderer.render(scene, camera);
      if (!shown) {
        shown = true;
        requestAnimationFrame(() => (canvas.style.opacity = '1'));
      }
    };

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      elapsed += dt;
      uniforms.uTime.value = elapsed;
      uniforms.uMouse.value.lerp(targetMouse, 0.04);
      camera.position.x += (uniforms.uMouse.value.x * 0.03 - camera.position.x) * 0.05;
      camera.lookAt(0, -0.4, 0);
      renderFrame();
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const update = () => (inView && !document.hidden ? start() : stop());

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    io.observe(container);
    document.addEventListener('visibilitychange', update);

    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = Math.max(container.clientHeight, 1);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      if (!running) renderFrame();
    });
    ro.observe(container);

    // Reduced motion: one calm static frame, no loop.
    uniforms.uTime.value = 2.4;
    camera.lookAt(0, -0.4, 0);
    renderFrame();
    update();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('pointermove', onPointer);
      scene.remove(field);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, []);

  return <div ref={mountRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />;
};

export { ThreeHeroBackground };
export default ThreeHeroBackground;
