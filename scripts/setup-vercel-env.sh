#!/bin/bash

# Setup Vercel Environment Variables for Portfolio App
echo "🔧 Setting up Vercel environment variables..."

# Public Sanity Configuration
echo "Setting NEXT_PUBLIC_SANITY_PROJECT_ID..."
echo "5ave8l4g" | vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production

echo "Setting NEXT_PUBLIC_SANITY_DATASET..."
echo "production" | vercel env add NEXT_PUBLIC_SANITY_DATASET production

echo "Setting NEXT_PUBLIC_SANITY_API_VERSION..."
echo "2025-06-04" | vercel env add NEXT_PUBLIC_SANITY_API_VERSION production

echo "Setting NEXT_PUBLIC_SANITY_PROJECT_TITLE..."
echo "Jennifer Watkins Art Portfolio" | vercel env add NEXT_PUBLIC_SANITY_PROJECT_TITLE production

# Private Sanity Tokens
echo "Setting SANITY_API_READ_TOKEN..."
echo "sk93yeTa0srujsxCA2JO7bYstep9mDeRNSlTfPFCG7O77tg5KcKKFkzYwJ3PPMPZC0CSbpJlt202fMpuOBKnlkIyjzrUseDSsc0k31DcgcF3Zm1sAwg7e2lUgMsEOG8OyIeisyV2sZHnlIumrO3iKXPusk7F78tB6BqIQzn505eLGBujrsdJ" | vercel env add SANITY_API_READ_TOKEN production

echo "Setting SANITY_PREVIEW_SECRET..."
echo "xvw9fazokd9" | vercel env add SANITY_PREVIEW_SECRET production

echo "Setting SANITY_REVALIDATE_SECRET..."
echo "wlsb0dqabni" | vercel env add SANITY_REVALIDATE_SECRET production

# Public read token for visual editing
echo "Setting NEXT_PUBLIC_SANITY_API_READ_TOKEN..."
echo "sk93yeTa0srujsxCA2JO7bYstep9mDeRNSlTfPFCG7O77tg5KcKKFkzYwJ3PPMPZC0CSbpJlt202fMpuOBKnlkIyjzrUseDSsc0k31DcgcF3Zm1sAwg7e2lUgMsEOG8OyIeisyV2sZHnlIumrO3iKXPusk7F78tB6BqIQzn505eLGBujrsdJ" | vercel env add NEXT_PUBLIC_SANITY_API_READ_TOKEN production

echo "✅ Environment variables setup complete!"
echo "🚀 Ready to deploy to production"
