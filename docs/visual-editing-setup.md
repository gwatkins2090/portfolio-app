# Visual Editing Setup Guide

## Overview
This guide explains how to use Sanity Visual Editing with your Next.js portfolio application.

## Current Setup

### 1. Visual Editing Components
- **`SanityVisualEditing`**: Main visual editing component with proper client configuration
- **`SanityLive`**: Live content updates component
- **`VisualEditingWrapper`**: Wrapper for adding visual editing to server components

### 2. Configuration Files
- **`sanity.config.ts`**: Studio configuration with presentation tool
- **`src/lib/sanity/lib/live.ts`**: Live content configuration
- **`src/app/api/draft/route.ts`**: Draft mode API endpoint

## How to Use Visual Editing

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Open Sanity Studio
Navigate to: `http://localhost:3000/studio`

### Step 3: Enable Presentation Mode
1. Click on the "Presentation" tab in the studio
2. This will open a split view with your website on the right and studio on the left

### Step 4: Edit Content
1. Click on any editable content in the preview
2. The studio will automatically focus on the corresponding field
3. Make changes in the studio - they appear instantly in the preview

## Troubleshooting

### Common Issues

#### "Unable to connect to visual editing"
- **Cause**: Missing client configuration in `useLiveMode`
- **Solution**: Ensure `SanityVisualEditing` component has proper client setup ✅ Fixed

#### "The client option in enableLiveMode is required"
- **Cause**: Missing client parameter in `useLiveMode` call
- **Solution**: Pass client with proper configuration ✅ Fixed

#### "Invalid API version"
- **Cause**: Using 'vX' instead of actual API version
- **Solution**: Use proper API version from environment ✅ Fixed

### Environment Variables Required
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=5ave8l4g
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-06-04
SANITY_API_READ_TOKEN=your_token_here
SANITY_PREVIEW_SECRET=your_secret_here
```

## Visual Editing Features

### Current Implementation
- ✅ Draft mode support
- ✅ Live content updates
- ✅ Presentation tool integration
- ✅ Server component compatibility

### Available for Editing
- Homepage hero section
- Artist statement
- About page content
- Contact information
- Gallery transitions

### Future Enhancements
- Add visual editing to portfolio pages
- Implement in-context editing for artworks
- Add visual editing to shop/commerce pages

## Technical Details

### Architecture
```
Sanity Studio → Presentation Tool → Visual Editing → Next.js App
```

### Data Flow
1. User edits content in Sanity Studio
2. Changes are sent via live updates
3. Next.js app receives updates through `SanityLive`
4. Components re-render with new content
5. Visual editing overlays show editable areas

### Components Structure
- **Server Components**: Fetch data and pass to client components
- **Client Components**: Handle visual editing interactions
- **Visual Editing Wrapper**: Adds editing capabilities to server-rendered content
