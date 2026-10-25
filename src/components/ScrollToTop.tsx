/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll instantly before paint on route change, so the page
 * transition plays on a clean viewport instead of a visible smooth-scroll.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
};
