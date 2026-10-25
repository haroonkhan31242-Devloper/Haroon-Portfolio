/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useReveal } from '../utils/gsapAnimations';

export const NotFound: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <div ref={ref} className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 py-24">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative max-w-lg text-center">
        <p data-reveal="fade" className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase">
          HTTP 404 Error
        </p>
        <h1 data-reveal="up" className="mt-6 text-[7rem] leading-none font-semibold tracking-[-0.06em] text-white/90 sm:text-[9rem]">
          4<span className="serif-accent text-accent">0</span>4
        </h1>
        <h2 data-reveal="up" data-delay="0.05" className="mt-4 text-2xl font-semibold tracking-tight text-white">
          Page Not Found
        </h2>
        <p data-reveal="up" data-delay="0.1" className="mt-3 text-sm leading-relaxed text-slate-400">
          The route you requested does not exist or may have been relocated in the portfolio architecture.
        </p>
        <div data-reveal="up" data-delay="0.15" className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/" className="btn btn-primary btn-sm w-full sm:w-auto">
            <Home className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
          <Link to="/projects" className="btn btn-secondary btn-sm w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4" />
            <span>Browse Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
