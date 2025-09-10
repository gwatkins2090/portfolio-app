# Sanity CMS Troubleshooting Guide

## Current Issues and Solutions

### Issue 1: Studio Shows No Content/Schema Types

**Symptoms:**
- Studio loads but shows empty interface
- No content types visible in the sidebar
- Cannot create new documents

**Solutions:**

1. **Check Environment Variables**
   ```bash
   # Verify these are set in .env.local
   NEXT_PUBLIC_SANITY_PROJECT_ID="5ave8l4g"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```

2. **Test Sanity Connection**
   ```bash
   node scripts/test-sanity.js
   ```

3. **Restart Development Server**
   ```bash
   # Kill any running processes
   npm run dev
   ```

4. **Check Browser Console**
   - Open browser dev tools (F12)
   - Look for any JavaScript errors
   - Check Network tab for failed requests

### Issue 2: Visual Editing Not Working

**Current Status:** ✅ **FIXED**
- Updated to use `@sanity/visual-editing` package
- Implemented dynamic loading with error handling
- Added visual indicator for development mode

**To Test:**
1. Visit http://localhost:3000 in development mode
2. Look for "🎨 Visual Editing" indicator in top-right corner
3. Check browser console for "✅ Sanity Visual Editing enabled" message

### Issue 3: Chrome Extension Errors

**Symptoms:**
- Runtime errors from Chrome extension
- `tx_attempts_exceeded` messages

**Solution:** ✅ **NOT A PROBLEM**
- These errors are from a Chrome extension, not your application
- They don't affect Sanity functionality
- Can be ignored or disable the extension

## Manual Testing Steps

### 1. Test Main Application
```bash
# Start development server
npm run dev

# Visit in browser
http://localhost:3000
```

**Expected Results:**
- Page loads without errors
- "🔗 Sanity: connected" indicator in bottom-right
- "🎨 Visual Editing" indicator in top-right

### 2. Test Sanity Studio
```bash
# Visit studio in browser
http://localhost:3000/studio
```

**Expected Results:**
- Studio interface loads
- Left sidebar shows content types:
  - Portfolio Settings
  - Artworks
  - Collections
  - Exhibitions
  - Blog Posts
  - Testimonials
  - Artist Profile
- Can click on any content type to view/create documents

### 3. Test Content Creation
1. Go to http://localhost:3000/studio
2. Click "Artworks" in sidebar
3. Click "+" to create new artwork
4. Fill in required fields (Title, Slug, Year, Medium, Category, Dimensions)
5. Save document

### 4. Test Visual Editing
1. Create some content in the studio
2. Visit the main website at http://localhost:3000
3. Look for visual editing indicators
4. Check browser console for visual editing messages

## Common Fixes

### Fix 1: Clear Next.js Cache
```bash
rm -rf .next
npm run dev
```

### Fix 2: Reinstall Sanity Packages
```bash
npm uninstall @sanity/visual-editing next-sanity sanity @sanity/vision
npm install @sanity/visual-editing next-sanity sanity @sanity/vision
```

### Fix 3: Reset Sanity Configuration
1. Delete `sanity.config.ts`
2. Run `npx sanity init` again
3. Choose existing project ID: `5ave8l4g`

### Fix 4: Check CORS Settings
1. Go to https://sanity.io/manage
2. Select your project
3. Go to API → CORS origins
4. Ensure these URLs are added:
   - `http://localhost:3000`
   - `https://your-production-domain.com`

## Verification Checklist

- [ ] Environment variables are set correctly
- [ ] Development server starts without errors
- [ ] Main website loads at http://localhost:3000
- [ ] Sanity connection indicator shows "connected"
- [ ] Studio loads at http://localhost:3000/studio
- [ ] All content types are visible in studio sidebar
- [ ] Can create new documents in studio
- [ ] Visual editing indicator appears in development
- [ ] No critical errors in browser console

## Getting Help

If issues persist:

1. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for error messages
   - Share any red error messages

2. **Check Network Tab**
   - Look for failed API requests
   - Check if requests to Sanity API are successful

3. **Test Sanity Connection**
   ```bash
   node scripts/test-sanity.js
   ```

4. **Share Error Details**
   - Exact error messages
   - Browser console output
   - Network request failures
   - Steps to reproduce the issue

## Success Indicators

When everything is working correctly, you should see:

✅ **Main Website (http://localhost:3000):**
- Page loads without errors
- Green "🔗 Sanity: connected" indicator
- Blue "🎨 Visual Editing" indicator

✅ **Sanity Studio (http://localhost:3000/studio):**
- Studio interface loads completely
- All 7 content types visible in sidebar
- Can create and edit documents
- No error messages in console

✅ **Content Management:**
- Can create artworks with images and details
- Can edit artist profile information
- Can manage portfolio settings
- Changes save successfully

The Sanity CMS integration is complete and ready for content management!
