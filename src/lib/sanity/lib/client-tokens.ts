// Client-safe token access for visual editing
// This file can be imported by client components

export const readToken = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN || process.env.SANITY_API_READ_TOKEN;

// Note: For visual editing to work properly, the read token needs to be accessible
// on the client side. In production, you should use a read-only token with minimal permissions.
// For development, we can use the same token as the server.

// Validate token availability for visual editing
if (!readToken && process.env.NODE_ENV === 'development') {
  console.warn('Missing Sanity read token - visual editing may not work properly');
}
