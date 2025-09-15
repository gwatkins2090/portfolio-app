// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from 'next-sanity/live';
import { client } from './client';
import { readToken } from './tokens';
import { apiVersion } from '../env';

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    apiVersion,
    token: readToken,
    perspective: 'previewDrafts',
    stega: {
      enabled: true,
      studioUrl: '/studio',
    },
  }),
  serverToken: readToken,
  browserToken: readToken, // Enable client-side live updates
});
