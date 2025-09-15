// Utility functions that can be used in both server and client components
// These do NOT import server-only modules

import imageUrlBuilder from '@sanity/image-url';
import { client } from './lib/client';

// Initialize the image URL builder
const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URL from Sanity image asset
 * Can be used in both server and client components
 */
export function getSanityImageUrl(image: any, options?: { width?: number; height?: number; quality?: number }): string | null {
  if (!image?.asset) return null;
  
  let urlBuilder = builder.image(image.asset);
  
  if (options?.width) {
    urlBuilder = urlBuilder.width(options.width);
  }
  
  if (options?.height) {
    urlBuilder = urlBuilder.height(options.height);
  }
  
  if (options?.quality) {
    urlBuilder = urlBuilder.quality(options.quality);
  }
  
  return urlBuilder.url();
}

/**
 * Get Sanity image dimensions
 * Can be used in both server and client components
 */
export function getSanityImageDimensions(image: any): { width: number; height: number } | null {
  if (!image?.asset?.metadata?.dimensions) return null;
  return {
    width: image.asset.metadata.dimensions.width,
    height: image.asset.metadata.dimensions.height,
  };
}

/**
 * Safely get text content with fallback
 * Can be used in both server and client components
 */
export function getSafeText(text: any, fallback: string = ''): string {
  if (typeof text === 'string') return text;
  if (text && typeof text === 'object' && text.current) return text.current;
  return fallback;
}

/**
 * Safely get array content with fallback
 * Can be used in both server and client components
 */
export function getSafeArray<T>(arr: any): T[] {
  if (Array.isArray(arr)) return arr;
  return [];
}

/**
 * Format date string
 * Can be used in both server and client components
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

/**
 * Format year range for education/experience
 * Can be used in both server and client components
 */
export function formatYearRange(startYear?: number, endYear?: number): string {
  if (!startYear) return '';
  if (!endYear) return `${startYear} - Present`;
  return `${startYear} - ${endYear}`;
}

/**
 * Get display name for location
 * Can be used in both server and client components
 */
export function getLocationDisplay(location: any): string {
  if (!location) return '';
  
  if (typeof location === 'string') return location;
  
  if (location.city && location.country) {
    return `${location.city}, ${location.country}`;
  }
  
  if (location.city && location.state) {
    return `${location.city}, ${location.state}`;
  }
  
  return location.city || location.country || location.state || '';
}

/**
 * Truncate text to specified length
 * Can be used in both server and client components
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Convert portable text to plain text
 * Can be used in both server and client components
 */
export function portableTextToPlainText(blocks: any[]): string {
  if (!Array.isArray(blocks)) return '';
  
  return blocks
    .filter((block) => block._type === 'block')
    .map((block) => {
      if (block.children) {
        return block.children.map((child: any) => child.text).join('');
      }
      return '';
    })
    .join(' ');
}
