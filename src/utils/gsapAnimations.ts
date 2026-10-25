/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Central motion system.
 * ---------------------------------------------------------------------------
 * Every animation in the portfolio pulls its timing from `MOTION` so the site
 * feels consistent: fast natural easing, short travel distances, controlled
 * stagger and no bounce. All hooks use `gsap.matchMedia()` so they are fully
 * reverted on unmount (timelines + ScrollTriggers) and skipped entirely when
 * the visitor prefers reduced motion.
 *
 * Declarative usage inside a scoped container:
 *   data-reveal="up | fade | scale | left | right | clip"   single element
 *   data-delay="0.1"                                        optional delay
 *   data-reveal-group  +  children with data-reveal-item    staggered group
 *   data-parallax="12"                                      scrubbed yPercent drift (desktop)
 */

import { useEffect, useLayoutEffect, useRef, type DependencyList, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const MOTION = {
  ease: 'power3.out',
  easeSoft: 'power2.out',
  easeInOut: 'power2.inOut',
  duration: { fast: 0.35, base: 0.7, slow: 1 },
  stagger: { tight: 0.04, base: 0.07, loose: 0.12 },
  distance: 24,
  start: 'top 88%',
} as const;

gsap.defaults({ ease: MOTION.ease, duration: MOTION.duration.base });

export const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
export const MOTION_OK_QUERY = '(prefers-reduced-motion: no-preference)';

export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(REDUCED_QUERY).matches;
};

export const isFinePointer = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
};

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const REVEAL_PRESETS: Record<string, gsap.TweenVars> = {
  up: { autoAlpha: 0, y: MOTION.distance },
  fade: { autoAlpha: 0 },
  scale: { autoAlpha: 0, scale: 0.96, y: 12 },
  left: { autoAlpha: 0, x: -MOTION.distance },
  right: { autoAlpha: 0, x: MOTION.distance },
  clip: { clipPath: 'inset(12% 12% 12% 12% round 24px)', autoAlpha: 0 },
};

/**
 * Wires up all declarative reveal / parallax attributes inside `scope`.
 * Re-runs when `deps` change (e.g. filtered lists) and cleans up completely.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, deps: DependencyList = []) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);

    mm.add(MOTION_OK_QUERY, () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach((el) => {
        const preset = REVEAL_PRESETS[el.dataset.reveal || 'up'] || REVEAL_PRESETS.up;
        gsap.from(el, {
          ...preset,
          delay: Number(el.dataset.delay || 0),
          duration: el.dataset.reveal === 'clip' ? MOTION.duration.slow : MOTION.duration.base,
          ease: el.dataset.reveal === 'clip' ? 'expo.out' : MOTION.ease,
          clearProps: 'transform,clipPath',
          scrollTrigger: { trigger: el, start: MOTION.start, once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal-group]', root).forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');
        if (!items.length) return;
        gsap.from(items, {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
          stagger: { each: MOTION.stagger.base, from: 'start' },
          clearProps: 'transform',
          scrollTrigger: { trigger: group, start: 'top 86%', once: true },
        });
      });
    });

    // Parallax only on larger screens with motion allowed.
    mm.add(`${MOTION_OK_QUERY} and (min-width: 768px)`, () => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]', root).forEach((el) => {
        const amount = Number(el.dataset.parallax || 10);
        gsap.fromTo(
          el,
          { yPercent: amount / 2 },
          {
            yPercent: -amount / 2,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          }
        );
      });
    });

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Re-plays a short stagger on a container's children whenever `dep` changes (filters). */
export function useStaggerOnChange(container: RefObject<HTMLElement | null>, dep: unknown) {
  const first = useRef(true);
  useIsoLayoutEffect(() => {
    const el = container.current;
    if (!el) return;
    if (first.current) {
      first.current = false;
      return;
    }
    if (isReducedMotion()) return;
    const tween = gsap.fromTo(
      el.children,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.45, stagger: MOTION.stagger.tight, clearProps: 'transform' }
    );
    return () => {
      tween.kill();
    };
  }, [dep]);
}

/**
 * Magnetic hover for buttons: the element drifts a few pixels toward the cursor.
 * Fine pointers only; uses quickTo so it never allocates per frame.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.25, max = 8) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer() || isReducedMotion()) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * strength;
      const dy = (e.clientY - (r.top + r.height / 2)) * strength;
      xTo(gsap.utils.clamp(-max, max, dx));
      yTo(gsap.utils.clamp(-max, max, dy));
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: 'x,y' });
    };
  }, [strength, max]);
  return ref;
}

/**
 * Pointer-driven image drift inside a frame (used on project imagery).
 * Attach the returned ref to the frame; the first <img> inside moves.
 */
export function useHoverDrift<T extends HTMLElement>(amount = 10, scale = 1.06) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const frame = ref.current;
    if (!frame || !isFinePointer() || isReducedMotion()) return;
    const target = () => frame.querySelector('img');

    let xTo: ((v: number) => void) | null = null;
    let yTo: ((v: number) => void) | null = null;

    const ensure = () => {
      const img = target();
      if (!img) return null;
      if (!xTo || !yTo) {
        xTo = gsap.quickTo(img, 'x', { duration: 0.8, ease: 'power3.out' });
        yTo = gsap.quickTo(img, 'y', { duration: 0.8, ease: 'power3.out' });
      }
      return img;
    };

    const onEnter = () => {
      const img = ensure();
      if (img) gsap.to(img, { scale, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
    };
    const onMove = (e: PointerEvent) => {
      if (!ensure()) return;
      const r = frame.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      xTo!(-nx * amount * 2);
      yTo!(-ny * amount * 2);
    };
    const onLeave = () => {
      const img = target();
      if (!img) return;
      xTo?.(0);
      yTo?.(0);
      gsap.to(img, { scale: 1, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
    };

    frame.addEventListener('pointerenter', onEnter);
    frame.addEventListener('pointermove', onMove);
    frame.addEventListener('pointerleave', onLeave);
    return () => {
      frame.removeEventListener('pointerenter', onEnter);
      frame.removeEventListener('pointermove', onMove);
      frame.removeEventListener('pointerleave', onLeave);
      const img = target();
      if (img) {
        gsap.killTweensOf(img);
        gsap.set(img, { clearProps: 'x,y,scale' });
      }
    };
  }, [amount, scale]);
  return ref;
}

export { gsap, ScrollTrigger };
