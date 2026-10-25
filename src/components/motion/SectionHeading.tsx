/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  size?: 'lg' | 'md';
  className?: string;
  children?: React.ReactNode;
}

/** Consistent eyebrow + heading + description block used across every page. */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  as = 'h2',
  size = 'lg',
  className = '',
  children,
}) => {
  const Tag = as;
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <span data-reveal="fade" className="eyebrow">
        {eyebrow}
      </span>
      <Tag data-reveal="up" className={`${size === 'lg' ? 'heading-lg' : 'heading-md'} mt-5`}>
        {title}
      </Tag>
      {description && (
        <p data-reveal="up" data-delay="0.08" className={`lede mt-5 ${centered ? 'mx-auto' : ''} max-w-2xl`}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
};
