# Visual Editing Integration Guide

## 🎨 Complete Visual Editing Setup for Jennifer Watkins Portfolio

This guide shows you how to make all your existing pages editable through Sanity's visual editing interface.

## ✅ Current Status

**Working Components:**
- ✅ Sanity connection established
- ✅ Visual editing framework implemented
- ✅ Homepage partially integrated
- ✅ About page started
- ✅ Demo page created (`/visual-editing-demo`)

## 🚀 How to Test Visual Editing

### 1. View the Demo Page
Visit: http://localhost:3000/visual-editing-demo

This page shows:
- How editable content works
- Real-time content from Sanity
- Visual editing indicators
- Examples of all editable components

### 2. Create Content in Studio
1. Go to http://localhost:3000/studio
2. Create these documents:
   - **Portfolio Settings** (site-wide settings)
   - **Artist Profile** (your information)
   - **Artworks** (your art pieces)

### 3. See Real-time Updates
- Make changes in the studio
- Watch them appear instantly on your website
- No page refresh needed!

## 📝 Integration Steps for Each Page

### Homepage (`/`)
**Status:** ✅ Partially Integrated

**Editable Elements:**
- Hero section content
- Featured collection titles
- Gallery transition text
- Artist statement

**To Complete:**
- Add more granular editing for hero slideshow
- Make artwork grid fully dynamic

### About Page (`/about`)
**Status:** 🔄 In Progress

**Editable Elements:**
- Page title
- Artist biography
- Exhibition history
- Awards and recognition

**To Complete:**
- Finish integrating all sections
- Add image editing capabilities

### Shop Page (`/shop`)
**Status:** ⏳ Not Started

**Should Be Editable:**
- Product listings (artworks)
- Pricing information
- Availability status
- Product descriptions

### Portfolio Page (`/portfolio`)
**Status:** ⏳ Not Started

**Should Be Editable:**
- Artwork collections
- Gallery organization
- Artwork details and descriptions

### Contact Page (`/contact`)
**Status:** ⏳ Not Started

**Should Be Editable:**
- Contact information
- Studio location
- Contact form settings
- Social media links

### Exhibitions Page (`/exhibitions`)
**Status:** ⏳ Not Started

**Should Be Editable:**
- Current exhibitions
- Past exhibitions
- Exhibition details and descriptions

## 🛠️ How to Make Any Page Editable

### Step 1: Convert to Client Component
```tsx
'use client' // Add this at the top

import { EditableContent, EditableText } from '@/components/sanity/editable-content'
import { usePortfolioSettings, useArtistProfile } from '@/hooks/use-sanity-content'
```

### Step 2: Fetch Content
```tsx
const MyPage = () => {
  const { content: settings } = usePortfolioSettings()
  const { content: artist } = useArtistProfile()
  
  // Your existing component code...
}
```

### Step 3: Wrap Content in Editable Components
```tsx
// For text content
<EditableText
  text="Your text here"
  documentId={settings?._id}
  documentType="portfolioSettings"
  fieldPath="yourField"
  as="h1"
  className="your-classes"
/>

// For sections
<EditableContent
  documentId={settings?._id}
  documentType="portfolioSettings"
  fieldPath="sectionName"
>
  <YourExistingComponent />
</EditableContent>
```

### Step 4: Test and Refine
1. Visit your page
2. Look for visual editing indicators
3. Test editing in the studio
4. Verify real-time updates work

## 📋 Available Hooks

### `usePortfolioSettings()`
Site-wide settings like:
- Site name and tagline
- Contact information
- Social media links
- SEO settings

### `useArtistProfile()`
Artist information like:
- Name and biography
- Profile images
- Education and exhibitions
- Awards and recognition

### `useFeaturedArtworks()`
Featured artwork data:
- Artwork details
- Images and descriptions
- Pricing and availability

### `useArtworks(limit?)`
All artworks with optional limit

### `useBlogPosts(limit?)`
Blog posts for news/updates

### `useTestimonials()`
Client testimonials and reviews

## 🎯 Priority Integration Order

### Phase 1: Core Content (This Week)
1. ✅ Homepage - Featured content
2. 🔄 About page - Artist information
3. ⏳ Shop page - Artwork listings

### Phase 2: Extended Content (Next Week)
4. ⏳ Portfolio page - Gallery organization
5. ⏳ Contact page - Contact information
6. ⏳ Exhibitions page - Exhibition listings

### Phase 3: Advanced Features (Future)
7. ⏳ Blog functionality
8. ⏳ Advanced visual editing
9. ⏳ E-commerce integration

## 🔧 Troubleshooting

### No Content Showing?
1. Check if schemas are deployed: Visit `/sanity-debug`
2. Create content in studio: Visit `/studio`
3. Verify environment variables in `.env.local`

### Visual Editing Not Working?
1. Ensure you're in development mode
2. Check browser console for errors
3. Verify visual editing indicators appear
4. Test with the demo page first

### Content Not Updating?
1. Check Sanity connection status
2. Verify document IDs match
3. Check field paths are correct
4. Restart development server

## 📞 Next Steps

1. **Test the Demo**: Visit `/visual-editing-demo` to see how it works
2. **Create Content**: Add your real content in the studio
3. **Choose a Page**: Pick your next page to integrate
4. **Follow the Pattern**: Use the examples to integrate more pages
5. **Iterate**: Test, refine, and expand

## 🎉 Benefits of Visual Editing

- **Client-Friendly**: Non-technical users can edit content
- **Real-time**: See changes instantly
- **Professional**: Maintain design consistency
- **Flexible**: Edit any content without code changes
- **Scalable**: Easy to add new content types

Your portfolio is now ready for professional content management! 🎨✨
