import 'server-only';

export const token = process.env.SANITY_API_READ_TOKEN;
export const readToken = token;
export const previewSecret = process.env.SANITY_PREVIEW_SECRET;
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;

if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN');
}

if (!previewSecret) {
  throw new Error('Missing SANITY_PREVIEW_SECRET');
}

if (!revalidateSecret) {
  throw new Error('Missing SANITY_REVALIDATE_SECRET');
}

// Note: experimental_taintUniqueValue can be added here to prevent tokens from being sent to the client
// This is optional and requires React 19+ experimental features
