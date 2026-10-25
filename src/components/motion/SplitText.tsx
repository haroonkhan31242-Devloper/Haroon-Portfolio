/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
}

/**
 * Renders text as masked words (`.split-word > .split-inner`) so GSAP can
 * slide each word up from behind its mask. Screen readers get the plain text.
 */
export const SplitText: React.FC<SplitTextProps> = ({ text, className = '', wordClassName = '' }) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="split-word">
            <span className={`split-inner ${wordClassName}`}>{word}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
      </span>
    </span>
  );
};
