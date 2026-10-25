/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { isFinePointer } from '../../utils/gsapAnimations';

/**
 * One delegated, passive pointer listener that feeds `--mx/--my` to whichever
 * `.spotlight` card is under the cursor. Replaces per-card listeners.
 */
export const SpotlightTracker = () => {
  useEffect(() => {
    if (!isFinePointer()) return;
    let frame = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!last) return;
      const target = (last.target as Element | null)?.closest?.('.spotlight') as HTMLElement | null;
      if (!target) return;
      const r = target.getBoundingClientRect();
      target.style.setProperty('--mx', `${last.clientX - r.left}px`);
      target.style.setProperty('--my', `${last.clientY - r.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return null;
};
