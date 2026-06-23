import type React from 'react';

export const getOptimizedImageFallback = (src: string) => {
  if (!src.includes('/optimized/') || !src.match(/\.webp(?:$|[?#])/i)) return '';
  return src.replace('/optimized/', '/').replace(/\.webp(?=$|[?#])/i, '.png');
};

export const applyImageFallback = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  explicitFallback?: string,
) => {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === 'true') return;

  const fallback = explicitFallback || getOptimizedImageFallback(img.currentSrc || img.src);
  if (!fallback || fallback === img.src) return;

  img.dataset.fallbackApplied = 'true';
  img.src = fallback;
};
