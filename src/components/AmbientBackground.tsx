/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useEffect, useState } from 'react';

const ThreeHeroBackground = lazy(() => import('./ThreeHeroBackground'));

/**
 * Lazy-mounts the WebGL field once the browser is idle, and skips it entirely
 * for reduced-motion users, Save-Data connections and very low-end devices.
 * The CSS backdrop rendered by the parent is the fallback in all those cases.
 */
export const AmbientBackground: React.FC<{ className?: string }> = ({ className }) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowEnd = (nav.hardwareConcurrency ?? 4) < 2 || (nav.deviceMemory ?? 4) < 1;
    if (reduced || nav.connection?.saveData || lowEnd) return;

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setMount(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setMount(true), 600);
    return () => window.clearTimeout(t);
  }, []);

  if (!mount) return null;
  return (
    <Suspense fallback={null}>
      <ThreeHeroBackground className={className} />
    </Suspense>
  );
};
