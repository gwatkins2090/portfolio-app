/**
 * Performance monitoring and optimization utilities
 */

export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

/**
 * Measure and report Core Web Vitals
 */
export function measureWebVitals(callback: (metric: any) => void) {
  if (typeof window === 'undefined') return;

  // First Contentful Paint
  const fcpObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        callback({
          name: 'FCP',
          value: entry.startTime,
          rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor'
        });
      }
    }
  });

  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    callback({
      name: 'LCP',
      value: lastEntry.startTime,
      rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
    });
  });

  // First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const fidEntry = entry as any; // Type assertion for FID entry
      const fidValue = fidEntry.processingStart - fidEntry.startTime;
      callback({
        name: 'FID',
        value: fidValue,
        rating: fidValue < 100 ? 'good' : fidValue < 300 ? 'needs-improvement' : 'poor'
      });
    }
  });

  // Cumulative Layout Shift
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const clsEntry = entry as any; // Type assertion for CLS entry
      if (!clsEntry.hadRecentInput) {
        clsValue += clsEntry.value;
      }
    }
    callback({
      name: 'CLS',
      value: clsValue,
      rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
    });
  });

  try {
    fcpObserver.observe({ entryTypes: ['paint'] });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    fidObserver.observe({ entryTypes: ['first-input'] });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (error) {
    console.warn('Performance Observer not supported:', error);
  }
}

/**
 * Measure resource loading performance
 */
export function measureResourcePerformance() {
  if (typeof window === 'undefined') return {};

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

  return {
    navigation: {
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      ssl: navigation.secureConnectionStart > 0 ? navigation.connectEnd - navigation.secureConnectionStart : 0,
      ttfb: navigation.responseStart - navigation.requestStart,
      download: navigation.responseEnd - navigation.responseStart,
      domParsing: navigation.domContentLoadedEventStart - navigation.responseEnd,
      resourceLoading: navigation.loadEventStart - navigation.domContentLoadedEventStart
    },
    resources: resources.map(resource => ({
      name: resource.name,
      type: resource.initiatorType,
      size: resource.transferSize,
      duration: resource.duration,
      startTime: resource.startTime
    }))
  };
}

/**
 * Optimize image loading with lazy loading and preloading
 */
export function optimizeImageLoading() {
  if (typeof window === 'undefined') return;

  // Preload critical images
  const criticalImages = document.querySelectorAll('img[data-priority="high"]');
  criticalImages.forEach((img) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = img.getAttribute('src') || '';
    document.head.appendChild(link);
  });

  // Lazy load non-critical images
  const lazyImages = document.querySelectorAll('img[data-lazy="true"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          img.removeAttribute('data-lazy');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px'
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
}

/**
 * Optimize font loading
 */
export function optimizeFontLoading() {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const criticalFonts = [
    '/fonts/playfair-display-variable.woff2',
    '/fonts/inter-variable.woff2'
  ];

  criticalFonts.forEach((font) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = font;
    document.head.appendChild(link);
  });
}

/**
 * Implement service worker for caching
 */
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate?: boolean
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Measure component render performance
 */
export function measureRenderPerformance(componentName: string) {
  if (typeof window === 'undefined') return { start: () => {}, end: () => {} };

  let startTime: number;

  return {
    start: () => {
      startTime = performance.now();
    },
    end: () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Log slow renders (> 16ms for 60fps)
      if (duration > 16) {
        console.warn(`Slow render detected in ${componentName}: ${duration.toFixed(2)}ms`);
      }
      
      // Send to analytics if needed
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'timing_complete', {
          name: `render_${componentName}`,
          value: Math.round(duration)
        });
      }
    }
  };
}

/**
 * Optimize scroll performance
 */
export function optimizeScrollPerformance() {
  if (typeof window === 'undefined') return;

  let ticking = false;

  function updateScrollPosition() {
    // Perform scroll-related updates here
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

/**
 * Monitor memory usage
 */
export function monitorMemoryUsage() {
  if (typeof window === 'undefined' || !(performance as any).memory) return null;

  const memory = (performance as any).memory;
  
  return {
    used: Math.round(memory.usedJSHeapSize / 1048576), // MB
    total: Math.round(memory.totalJSHeapSize / 1048576), // MB
    limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
  };
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  const criticalResources = [
    { href: '/api/artworks/featured', as: 'fetch' },
    { href: '/images/hero-bg.webp', as: 'image' }
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.as;
    link.href = resource.href;
    if (resource.as === 'fetch') {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
}
