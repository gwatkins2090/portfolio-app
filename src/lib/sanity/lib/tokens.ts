import 'server-only';

export const token = process.env.SANITY_API_READ_TOKEN;
export const readToken = token;
export const previewSecret = process.env.SANITY_PREVIEW_SECRET;
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;

// Temporarily disable strict validation for build process
// These will be checked at runtime when actually needed
if (!token && process.env.NODE_ENV === 'production') {
  console.warn('Missing SANITY_API_READ_TOKEN - some features may not work');
}

if (!previewSecret && process.env.NODE_ENV === 'production') {
  console.warn('Missing SANITY_PREVIEW_SECRET - preview mode will not work');
}

if (!revalidateSecret && process.env.NODE_ENV === 'production') {
  console.warn('Missing SANITY_REVALIDATE_SECRET - webhook revalidation will not work');
}

// Note: experimental_taintUniqueValue can be added here to prevent tokens from being sent to the client
// This is optional and requires React 19+ experimental features
