import 'server-only';
import { draftMode } from 'next/headers';
import { client } from './lib/client';
import { readToken } from './lib/tokens';
import {
  portfolioSettingsQuery,
  artistProfileQuery,
  featuredArtworksQuery,
  homepageDataQuery,
  aboutPageDataQuery,
  contactPageDataQuery,
} from './queries';

// Generic fetch function with draft mode support
async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: any;
  tags?: string[];
}): Promise<T> {
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode && !readToken) {
    throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required.');
  }

  const perspective = isDraftMode ? 'previewDrafts' : 'published';

  const queryClient = client.withConfig({
    token: isDraftMode ? readToken : undefined,
    perspective,
    useCdn: !isDraftMode,
    stega: isDraftMode,
  });

  return queryClient.fetch<T>(query, params, {
    next: {
      revalidate: isDraftMode ? 0 : false,
      tags,
    },
  });
}

// Portfolio Settings
export async function getPortfolioSettings() {
  return sanityFetch<any>({
    query: portfolioSettingsQuery,
    tags: ['portfolioSettings'],
  });
}

// Artist Profile
export async function getArtistProfile() {
  return sanityFetch<any>({
    query: artistProfileQuery,
    tags: ['artist'],
  });
}

// Featured Artworks
export async function getFeaturedArtworks() {
  return sanityFetch<any[]>({
    query: featuredArtworksQuery,
    tags: ['artwork', 'featured'],
  });
}

// Homepage Data (combined)
export async function getHomepageData() {
  return sanityFetch<{
    settings: any;
    artist: any;
    featuredArtworks: any[];
  }>({
    query: homepageDataQuery,
    tags: ['homepage', 'portfolioSettings', 'artist', 'artwork'],
  });
}

// About Page Data (combined)
export async function getAboutPageData() {
  return sanityFetch<{
    artist: any;
    settings: any;
  }>({
    query: aboutPageDataQuery,
    tags: ['about', 'artist', 'portfolioSettings'],
  });
}

// Contact Page Data (combined)
export async function getContactPageData() {
  return sanityFetch<{
    settings: any;
    artist: any;
  }>({
    query: contactPageDataQuery,
    tags: ['contact', 'portfolioSettings', 'artist'],
  });
}

// Utility function to get Sanity image URL
export function getSanityImageUrl(image: any): string | null {
  if (!image?.asset?.url) return null;
  return image.asset.url;
}

// Utility function to get Sanity image dimensions
export function getSanityImageDimensions(image: any): { width: number; height: number } | null {
  if (!image?.asset?.metadata?.dimensions) return null;
  return {
    width: image.asset.metadata.dimensions.width,
    height: image.asset.metadata.dimensions.height,
  };
}

// Utility function for safe text content
export function getSafeText(text: string | undefined, fallback: string = ''): string {
  return text || fallback;
}

// Utility function for safe array content
export function getSafeArray<T>(array: T[] | undefined): T[] {
  return array || [];
}

// Utility function to format date
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Utility function to format year range
export function formatYearRange(startYear: number, endYear?: number): string {
  if (!startYear) return '';
  if (!endYear) return `${startYear} - Present`;
  return `${startYear} - ${endYear}`;
}
