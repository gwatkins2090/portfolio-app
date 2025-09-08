/**
 * Image optimization utilities for the art portfolio
 */

export interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  blur?: number;
  sharpen?: boolean;
  progressive?: boolean;
}

/**
 * Generate optimized image URL with query parameters
 */
export function getOptimizedImageUrl(
  src: string, 
  options: ImageOptimizationOptions = {}
): string {
  const {
    quality = 85,
    format = 'webp',
    width,
    height,
    fit = 'cover',
    blur,
    sharpen = false,
    progressive = true
  } = options;

  // If using a CDN like Cloudinary, Vercel, or custom image service
  const params = new URLSearchParams();
  
  if (quality) params.set('q', quality.toString());
  if (format) params.set('f', format);
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  if (fit) params.set('fit', fit);
  if (blur) params.set('blur', blur.toString());
  if (sharpen) params.set('sharpen', 'true');
  if (progressive) params.set('progressive', 'true');

  // For Next.js built-in image optimization
  if (src.startsWith('/') || src.includes(process.env.NEXT_PUBLIC_SITE_URL || '')) {
    return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`;
  }

  // For external CDN (example with Cloudinary)
  if (src.includes('cloudinary.com')) {
    const baseUrl = src.split('/upload/')[0] + '/upload/';
    const imagePath = src.split('/upload/')[1];
    const transformations = [];
    
    if (quality) transformations.push(`q_${quality}`);
    if (format) transformations.push(`f_${format}`);
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (fit) transformations.push(`c_${fit}`);
    if (blur) transformations.push(`e_blur:${blur}`);
    if (sharpen) transformations.push('e_sharpen');
    
    return `${baseUrl}${transformations.join(',')}/${imagePath}`;
  }

  return src;
}

/**
 * Generate responsive image sizes for different breakpoints
 */
export function generateResponsiveSizes(
  baseWidth: number,
  aspectRatio: number = 1
): {
  mobile: ImageOptimizationOptions;
  tablet: ImageOptimizationOptions;
  desktop: ImageOptimizationOptions;
  large: ImageOptimizationOptions;
} {
  return {
    mobile: {
      width: Math.min(baseWidth, 480),
      height: Math.round((Math.min(baseWidth, 480)) * aspectRatio),
      quality: 75,
      format: 'webp'
    },
    tablet: {
      width: Math.min(baseWidth, 768),
      height: Math.round((Math.min(baseWidth, 768)) * aspectRatio),
      quality: 80,
      format: 'webp'
    },
    desktop: {
      width: Math.min(baseWidth, 1200),
      height: Math.round((Math.min(baseWidth, 1200)) * aspectRatio),
      quality: 85,
      format: 'webp'
    },
    large: {
      width: baseWidth,
      height: Math.round(baseWidth * aspectRatio),
      quality: 90,
      format: 'webp'
    }
  };
}

/**
 * Generate srcSet for responsive images
 */
export function generateSrcSet(
  src: string,
  widths: number[],
  options: Omit<ImageOptimizationOptions, 'width'> = {}
): string {
  return widths
    .map(width => {
      const optimizedUrl = getOptimizedImageUrl(src, { ...options, width });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizesAttribute(breakpoints: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  default: string;
}): string {
  const sizes = [];
  
  if (breakpoints.mobile) {
    sizes.push(`(max-width: 640px) ${breakpoints.mobile}`);
  }
  if (breakpoints.tablet) {
    sizes.push(`(max-width: 1024px) ${breakpoints.tablet}`);
  }
  if (breakpoints.desktop) {
    sizes.push(`(max-width: 1280px) ${breakpoints.desktop}`);
  }
  
  sizes.push(breakpoints.default);
  
  return sizes.join(', ');
}

/**
 * Generate blur placeholder for images
 */
export function generateBlurPlaceholder(
  src: string,
  width: number = 10,
  height: number = 10
): string {
  return getOptimizedImageUrl(src, {
    width,
    height,
    quality: 1,
    blur: 5,
    format: 'jpeg'
  });
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, options: ImageOptimizationOptions = {}): void {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = getOptimizedImageUrl(src, options);
  
  // Add responsive preloading
  if (options.width) {
    link.setAttribute('imagesrcset', generateSrcSet(src, [options.width]));
  }
  
  document.head.appendChild(link);
}

/**
 * Lazy load images with intersection observer
 */
export function createLazyImageObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, defaultOptions);
}

/**
 * Calculate optimal image dimensions for artwork display
 */
export function calculateArtworkDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
  maintainAspectRatio: boolean = true
): { width: number; height: number } {
  if (!maintainAspectRatio) {
    return { width: maxWidth, height: maxHeight };
  }

  const aspectRatio = originalWidth / originalHeight;
  
  let width = maxWidth;
  let height = maxWidth / aspectRatio;
  
  if (height > maxHeight) {
    height = maxHeight;
    width = maxHeight * aspectRatio;
  }
  
  return {
    width: Math.round(width),
    height: Math.round(height)
  };
}

/**
 * Generate image metadata for SEO
 */
export function generateImageMetadata(
  src: string,
  alt: string,
  width?: number,
  height?: number
) {
  return {
    url: src,
    alt,
    width,
    height,
    type: 'image/webp' // Default to WebP for modern browsers
  };
}

/**
 * Check if browser supports WebP format
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Check if browser supports AVIF format
 */
export function supportsAVIF(): Promise<boolean> {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
}
