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
  // New page-specific queries
  globalSettingsQuery,
  homepageSettingsQuery,
  aboutPageSettingsQuery,
  portfolioPageSettingsQuery,
  contactPageSettingsQuery,
  newHomepageDataQuery,
  newAboutPageDataQuery,
  newPortfolioPageDataQuery,
  newContactPageDataQuery,
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
    stega: isDraftMode ? {
      enabled: true,
      studioUrl: '/studio',
    } : false,
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

// NEW PAGE-SPECIFIC FETCH FUNCTIONS

// Global Settings
export async function getGlobalSettings() {
  return sanityFetch<any>({
    query: globalSettingsQuery,
    tags: ['globalSettings'],
  });
}

// Homepage Settings
export async function getHomepageSettings() {
  return sanityFetch<any>({
    query: homepageSettingsQuery,
    tags: ['homepageSettings'],
  });
}

// About Page Settings
export async function getAboutPageSettings() {
  return sanityFetch<any>({
    query: aboutPageSettingsQuery,
    tags: ['aboutPageSettings'],
  });
}

// Portfolio Page Settings
export async function getPortfolioPageSettings() {
  return sanityFetch<any>({
    query: portfolioPageSettingsQuery,
    tags: ['portfolioPageSettings'],
  });
}

// Contact Page Settings
export async function getContactPageSettings() {
  return sanityFetch<any>({
    query: contactPageSettingsQuery,
    tags: ['contactPageSettings'],
  });
}

// NEW COMBINED PAGE DATA FUNCTIONS

// New Homepage Data (using new schema structure)
export async function getNewHomepageData() {
  return sanityFetch<{
    homepageSettings: any;
    globalSettings: any;
    artist: any;
  }>({
    query: newHomepageDataQuery,
    tags: ['homepage', 'homepageSettings', 'globalSettings', 'artist'],
  });
}

// New About Page Data (using new schema structure)
export async function getNewAboutPageData() {
  return sanityFetch<{
    aboutPageSettings: any;
    globalSettings: any;
    artist: any;
  }>({
    query: newAboutPageDataQuery,
    tags: ['about', 'aboutPageSettings', 'globalSettings', 'artist'],
  });
}

// New Portfolio Page Data (using new schema structure)
export async function getNewPortfolioPageData() {
  return sanityFetch<{
    portfolioPageSettings: any;
    globalSettings: any;
    artworks: any[];
  }>({
    query: newPortfolioPageDataQuery,
    tags: ['portfolio', 'portfolioPageSettings', 'globalSettings', 'artwork'],
  });
}

// New Contact Page Data (using new schema structure)
export async function getNewContactPageData() {
  return sanityFetch<{
    contactPageSettings: any;
    globalSettings: any;
    artist: any;
  }>({
    query: newContactPageDataQuery,
    tags: ['contact', 'contactPageSettings', 'globalSettings', 'artist'],
  });
}

// Note: Utility functions moved to @/lib/sanity/utils for client/server compatibility
