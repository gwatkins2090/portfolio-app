# Sanity Token Architecture

## Overview
This document explains the token architecture for Sanity CMS integration, specifically addressing the separation between server-only and client-safe token access.

## Problem Solved
**Issue**: Next.js build error when client components import server-only modules
```
Error: You're importing a component that needs 'server-only'. That only works in a Server Component which is not supported in the pages/ directory.
```

**Root Cause**: Client component (`SanityVisualEditing`) was importing from `tokens.ts` which has `'server-only'` import.

## Solution: Dual Token Architecture

### 1. Server-Only Tokens (`src/lib/sanity/lib/tokens.ts`)
```typescript
import 'server-only';

export const token = process.env.SANITY_API_READ_TOKEN;
export const readToken = token;
export const previewSecret = process.env.SANITY_PREVIEW_SECRET;
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;
```

**Usage**: Server components, API routes, server-side data fetching
**Files that import this**:
- `src/lib/sanity/fetch.ts`
- `src/lib/sanity/lib/fetch.ts`
- `src/lib/sanity/lib/live.ts`
- `src/app/api/draft/route.ts`
- `src/util/generateStaticSlugs.ts`

### 2. Client-Safe Tokens (`src/lib/sanity/lib/client-tokens.ts`)
```typescript
// No 'server-only' import - safe for client components

export const readToken = process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN || process.env.SANITY_API_READ_TOKEN;
```

**Usage**: Client components that need Sanity access (visual editing)
**Files that import this**:
- `src/components/sanity/visual-editing.tsx`

## Environment Variables

### Development (.env.local)
```env
# Server-only token (not exposed to client)
SANITY_API_READ_TOKEN="your_token_here"

# Client-accessible token for visual editing
NEXT_PUBLIC_SANITY_API_READ_TOKEN="your_token_here"

# Other secrets (server-only)
SANITY_PREVIEW_SECRET="your_secret_here"
SANITY_REVALIDATE_SECRET="your_secret_here"
```

### Production Recommendations
```env
# Server-only token with full permissions
SANITY_API_READ_TOKEN="server_token_with_full_permissions"

# Client token with minimal read-only permissions
NEXT_PUBLIC_SANITY_API_READ_TOKEN="client_token_read_only"
```

## Security Considerations

### Development
- **Same token for both**: In development, we use the same token for simplicity
- **Risk**: Low, as it's only local development

### Production
- **Separate tokens recommended**: Use different tokens with different permission levels
- **Server token**: Full permissions for server-side operations
- **Client token**: Read-only permissions, minimal scope
- **Principle**: Never expose more permissions than necessary to the client

## Token Permissions

### Server Token (SANITY_API_READ_TOKEN)
- **Permissions**: Read, Write (if needed for mutations)
- **Usage**: Server-side data fetching, draft mode, API routes
- **Security**: Never exposed to client

### Client Token (NEXT_PUBLIC_SANITY_API_READ_TOKEN)
- **Permissions**: Read-only, minimal scope
- **Usage**: Visual editing, client-side Sanity operations
- **Security**: Exposed to client, should have minimal permissions

## File Structure

```
src/lib/sanity/lib/
├── tokens.ts          # Server-only tokens (import 'server-only')
├── client-tokens.ts   # Client-safe tokens (no server-only import)
├── client.ts          # Sanity client configuration
├── live.ts           # Live content configuration (uses server tokens)
└── fetch.ts          # Server-side fetch utilities (uses server tokens)

src/components/sanity/
└── visual-editing.tsx # Client component (uses client-safe tokens)
```

## Import Guidelines

### ✅ Correct Usage

**Server Components/API Routes:**
```typescript
import { readToken } from '@/lib/sanity/lib/tokens'; // Server-only
```

**Client Components:**
```typescript
import { readToken } from '@/lib/sanity/lib/client-tokens'; // Client-safe
```

### ❌ Incorrect Usage

**Client Components (causes build error):**
```typescript
import { readToken } from '@/lib/sanity/lib/tokens'; // ❌ Server-only in client
```

## Visual Editing Requirements

For visual editing to work properly:
1. **Client token must be available**: `NEXT_PUBLIC_SANITY_API_READ_TOKEN`
2. **Token must have read permissions**: To fetch content for preview
3. **Studio URL must be configured**: For proper communication
4. **Stega must be enabled**: For visual editing overlays

## Troubleshooting

### Build Error: "server-only" import
**Cause**: Client component importing from server-only token file
**Solution**: Use `client-tokens.ts` instead of `tokens.ts` in client components

### Visual Editing Not Working
**Cause**: Missing or incorrect client token
**Solution**: Ensure `NEXT_PUBLIC_SANITY_API_READ_TOKEN` is set correctly

### Token Not Found
**Cause**: Environment variable not set or incorrect name
**Solution**: Check `.env.local` file and variable names

## Migration Guide

If you encounter server-only import errors:

1. **Identify the problematic import**:
   ```typescript
   // ❌ This causes the error in client components
   import { readToken } from '@/lib/sanity/lib/tokens';
   ```

2. **Replace with client-safe import**:
   ```typescript
   // ✅ This works in client components
   import { readToken } from '@/lib/sanity/lib/client-tokens';
   ```

3. **Add public environment variable**:
   ```env
   NEXT_PUBLIC_SANITY_API_READ_TOKEN="your_token_here"
   ```

4. **Test the build**:
   ```bash
   npm run build
   ```

## Best Practices

1. **Separate concerns**: Keep server and client token access separate
2. **Minimal permissions**: Use least-privilege principle for client tokens
3. **Environment-specific tokens**: Different tokens for development/production
4. **Regular rotation**: Rotate tokens periodically for security
5. **Monitor usage**: Track token usage and permissions
