# Deployment Guide - Jennifer Watkins Portfolio

## Vercel Deployment Setup

### 1. Environment Variables Configuration

In your Vercel dashboard, add the following environment variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=5ave8l4g
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-12-01
```

**Optional (for content editing):**
```
SANITY_API_TOKEN=your_sanity_api_token_here
```

### 2. Build Configuration

The project includes a `vercel.json` file with the correct build settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_SANITY_PROJECT_ID": "5ave8l4g",
    "NEXT_PUBLIC_SANITY_DATASET": "production",
    "NEXT_PUBLIC_SANITY_API_VERSION": "2023-12-01"
  }
}
```

### 3. Deployment Steps

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Configure Environment Variables**: Add the variables listed above in Vercel dashboard
3. **Deploy**: Vercel will automatically build and deploy

### 4. Build Verification

✅ **Local Build Test Passed**:
- All TypeScript errors resolved
- All pages prerender successfully
- Portfolio category pages working
- Sanity integration with fallbacks

### 5. Features Included

- **Static Site Generation (SSG)** for optimal performance
- **Portfolio Category Pages**: `/portfolio/paintings`, `/portfolio/mixed-media`, etc.
- **Sanity CMS Integration** with graceful fallbacks
- **Visual Editing** capabilities (when Sanity is configured)
- **Mobile-Responsive Design**
- **SEO Optimization**

### 6. Post-Deployment Testing

After deployment, verify:
- [ ] Homepage loads correctly
- [ ] Portfolio categories work: `/portfolio/paintings`, `/portfolio/mixed-media`, `/portfolio/metalwork`, `/portfolio/fiberwork`
- [ ] About page renders without errors
- [ ] Mobile navigation functions properly
- [ ] Contact form is accessible
- [ ] Sanity Studio accessible at `/studio`

### 7. Troubleshooting

If you encounter issues:

1. **Check Environment Variables**: Ensure all required variables are set in Vercel
2. **Review Build Logs**: Check Vercel deployment logs for specific errors
3. **Sanity Configuration**: Verify project ID and dataset are correct
4. **Clear Cache**: Try redeploying to clear any cached issues

### 8. Performance Optimizations

The build includes:
- **Optimized Images**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic route-based code splitting
- **Static Generation**: Pre-rendered pages for fast loading
- **Compressed Assets**: Automatic compression and optimization

## Ready for Production! 🚀

The portfolio is now fully prepared for deployment with all errors resolved and optimizations in place.
