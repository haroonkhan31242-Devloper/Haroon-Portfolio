/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap, ScrollTrigger, isReducedMotion, MOTION } from '../../utils/gsapAnimations';

/**
 * Route-level transition: a thin progress line sweeps across the top while the
 * incoming page eases up into place. Scroll reset lives in <ScrollToTop />.
 */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const bar = barRef.current;
    if (!wrap || !bar) return;

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (isReducedMotion()) {
      ScrollTrigger.refresh();
      return;
    }

    const tl = gsap.timeline({ onComplete: () => ScrollTrigger.refresh() });
    tl.set(bar, { scaleX: 0, autoAlpha: 1, transformOrigin: '0% 50%' })
      .to(bar, { scaleX: 1, duration: 0.55, ease: MOTION.easeInOut }, 0)
      .fromTo(
        wrap,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: MOTION.ease, clearProps: 'transform,opacity,visibility' },
        0.08
      )
      .to(bar, { autoAlpha: 0, duration: 0.3 }, 0.55);

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      <div ref={barRef} className="route-progress" aria-hidden="true" />
      <div ref={wrapRef}>{children}</div>
    </>
  );
};
