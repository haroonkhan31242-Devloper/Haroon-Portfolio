/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useMagnetic } from '../../utils/gsapAnimations';

/** Wraps a single interactive child in a span that drifts toward the cursor. */
export const Magnetic: React.FC<{ children: React.ReactNode; strength?: number; className?: string }> = ({
  children,
  strength = 0.25,
  className = '',
}) => {
  const ref = useMagnetic<HTMLSpanElement>(strength);
  return (
    <span ref={ref} className={`inline-flex will-change-transform ${className}`}>
      {children}
    </span>
  );
};
