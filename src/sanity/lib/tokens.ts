import 'server-only';
import { experimental_taintUniqueValue } from 'react';

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

// Taint the tokens to prevent them from being sent to the client
experimental_taintUniqueValue(
  'Do not pass the sanity API read token to the client.',
  process,
  readToken,
);

experimental_taintUniqueValue(
  'Do not pass the sanity preview secret to the client.',
  process,
  previewSecret,
);

experimental_taintUniqueValue(
  'Do not pass the sanity revalidate secret to the client.',
  process,
  revalidateSecret,
);
