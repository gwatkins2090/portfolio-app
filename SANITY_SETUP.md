# Sanity CMS Integration Setup

This guide will help you set up Sanity CMS for the Jennifer Watkins Art Portfolio website.

## Prerequisites

1. **Sanity Account**: Create a free account at [sanity.io](https://sanity.io)
2. **Node.js**: Ensure you have Node.js 16+ installed

## Step 1: Create a New Sanity Project

### Option A: Using Sanity CLI (Recommended)

1. Install Sanity CLI globally:
   ```bash
   npm install -g @sanity/cli
   ```

2. Create a new Sanity project:
   ```bash
   sanity init
   ```

3. Follow the prompts:
   - **Create new project**: Yes
   - **Project name**: "Jennifer Watkins Art Portfolio"
   - **Use the default dataset configuration**: Yes
   - **Project output path**: Choose a temporary directory (we'll use the existing schemas)
   - **Select project template**: Clean project with no predefined schemas

4. Note down your **Project ID** and **Dataset name** (usually "production")

### Option B: Using Sanity Management Console

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Click "Create new project"
3. Enter project name: "Jennifer Watkins Art Portfolio"
4. Note down your **Project ID**

## Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update `.env.local` with your Sanity project details:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2023-12-01
   SANITY_API_TOKEN=your_api_token_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

## Step 3: Create API Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Click **Add API token**
5. Name: "Portfolio Website"
6. Permissions: **Editor** (for read/write access)
7. Copy the token and add it to your `.env.local` file

## Step 4: Install Dependencies

The required packages should already be installed. If not, run:

```bash
npm install next-sanity sanity @sanity/vision @sanity/overlays
```

## Step 5: Deploy Schemas to Sanity

1. Install Sanity CLI in your project:
   ```bash
   npx sanity@latest init --env
   ```

2. Deploy the schemas:
   ```bash
   npx sanity@latest schema deploy
   ```

## Step 6: Access Sanity Studio

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/studio`

3. Sign in with your Sanity account

## Step 7: Migrate Existing Data (Optional)

To migrate your existing artwork data to Sanity:

1. Create a migration script in your project:
   ```typescript
   // scripts/migrate-data.ts
   import { runAllMigrations } from '../src/lib/migrate-to-sanity'
   
   runAllMigrations()
     .then(() => {
       console.log('Migration completed!')
       process.exit(0)
     })
     .catch((error) => {
       console.error('Migration failed:', error)
       process.exit(1)
     })
   ```

2. Run the migration:
   ```bash
   npx tsx scripts/migrate-data.ts
   ```

## Step 8: Configure CORS (For Visual Editing)

1. Go to your Sanity project settings
2. Navigate to **API** → **CORS origins**
3. Add your development and production URLs:
   - `http://localhost:3000`
   - `https://your-domain.com` (your production URL)

## Content Types Available

The following content types are configured:

- **Artwork**: Individual art pieces with images, pricing, and details
- **Artist**: Artist profile and biography
- **Exhibition**: Exhibition information and history
- **Collection**: Grouped artworks
- **Blog Post**: Blog articles and news
- **Testimonial**: Client testimonials and reviews
- **Portfolio Settings**: Site-wide settings and configuration

## Using Sanity Studio

### Creating Content

1. **Artworks**: Add new art pieces with images, descriptions, and pricing
2. **Artist Profile**: Update biography, education, and exhibition history
3. **Portfolio Settings**: Configure site-wide settings like contact info and social media

### Managing Images

- Upload images directly in the studio
- Sanity automatically optimizes images for web delivery
- Use the hotspot feature to control image cropping

### Publishing Content

- Use the "Published" toggle to control content visibility
- Featured content appears in special sections of the website

## Development Workflow

1. **Content Changes**: Use Sanity Studio to manage content
2. **Schema Changes**: Update schema files and redeploy with `npx sanity schema deploy`
3. **Visual Editing**: Available in development mode for real-time content editing

## Production Deployment

1. **Environment Variables**: Add your Sanity configuration to your hosting platform
2. **CORS Configuration**: Add your production domain to Sanity CORS settings
3. **API Tokens**: Use environment-specific tokens for production

## Troubleshooting

### Common Issues

1. **"Project not found"**: Check your project ID in environment variables
2. **"Unauthorized"**: Verify your API token has correct permissions
3. **CORS errors**: Ensure your domain is added to CORS origins
4. **Schema deployment fails**: Check for syntax errors in schema files

### Getting Help

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [Sanity Community](https://www.sanity.io/community)

## Next Steps

After setup is complete:

1. Create your first artwork in Sanity Studio
2. Update the artist profile with your information
3. Configure portfolio settings
4. Test the visual editing features
5. Deploy to production

Your art portfolio is now powered by Sanity CMS with full visual editing capabilities!
