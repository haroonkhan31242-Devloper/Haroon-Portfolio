/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

/** Slow CSS marquee; duplicated track is hidden from AT and from reduced-motion users. */
export const Marquee: React.FC<{ items: string[]; className?: string }> = ({ items, className = '' }) => {
  const renderRow = (hidden: boolean) => (
    <ul className={`flex shrink-0 items-center ${hidden ? 'marquee-dup' : ''}`} aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-10 pr-10 text-lg font-medium tracking-tight whitespace-nowrap text-slate-400 sm:text-2xl">
          <span>{item}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent/40" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div className="marquee-track">
        {renderRow(false)}
        {renderRow(true)}
      </div>
    </div>
  );
};
