/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Code2 } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  containerClassName?: string;
  /** Above-the-fold images: load eagerly with high fetch priority. */
  priority?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Portfolio visual asset',
  fallbackTitle,
  className = '',
  containerClassName = '',
  priority = false,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex h-full min-h-[160px] w-full flex-col items-center justify-center bg-gradient-to-br from-ink-800 to-ink-950 p-6 text-center select-none ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <div className="icon-tile mb-3">
          <Code2 className="h-5 w-5" />
        </div>
        <p className="text-sm font-semibold text-slate-200">{fallbackTitle || alt || 'MERN Project Visual'}</p>
        <p className="mt-1 text-xs text-slate-500">Haroon Khan · Developer Portfolio</p>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${containerClassName}`}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900" aria-hidden="true" />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
};
