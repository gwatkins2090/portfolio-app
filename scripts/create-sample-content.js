const { createClient } = require('next-sanity')

// Create sample content to test Sanity
async function createSampleContent() {
  console.log('🎨 Creating sample content...')
  
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5ave8l4g',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2023-12-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN, // You'll need to set this
  })

  try {
    // Create artist profile
    console.log('👤 Creating artist profile...')
    const artist = await client.createOrReplace({
      _type: 'artist',
      _id: 'jennifer-watkins',
      name: 'Jennifer Watkins',
      bio: 'Contemporary artist specializing in abstract expressionism and mixed media works.',
      email: 'jennifer@jenniferwatkins.art',
      website: 'https://jenniferwatkins.art',
      location: 'New York, NY',
      education: [
        {
          degree: 'MFA in Fine Arts',
          institution: 'Yale School of Art',
          year: 2015,
        }
      ],
      exhibitions: [
        {
          title: 'Emerging Voices',
          venue: 'Gallery Modern',
          year: 2023,
          type: 'group',
        }
      ]
    })
    console.log('✅ Artist created:', artist._id)

    // Create portfolio settings
    console.log('⚙️ Creating portfolio settings...')
    const settings = await client.createOrReplace({
      _type: 'portfolioSettings',
      _id: 'portfolioSettings',
      siteName: 'Jennifer Watkins Art',
      tagline: 'Contemporary Abstract Expressionism',
      description: 'Explore the vibrant world of contemporary abstract art through the lens of Jennifer Watkins.',
      contactEmail: 'jennifer@jenniferwatkins.art',
      socialMedia: {
        instagram: 'https://instagram.com/jenniferwatkinsart',
        facebook: 'https://facebook.com/jenniferwatkinsart',
      },
      seo: {
        metaTitle: 'Jennifer Watkins - Contemporary Artist',
        metaDescription: 'Contemporary abstract expressionist artist creating vibrant mixed media works.',
        keywords: ['contemporary art', 'abstract expressionism', 'mixed media', 'Jennifer Watkins']
      }
    })
    console.log('✅ Settings created:', settings._id)

    // Create sample artwork
    console.log('🎨 Creating sample artwork...')
    const artwork = await client.createOrReplace({
      _type: 'artwork',
      _id: 'sample-artwork-1',
      title: 'Ethereal Moments',
      slug: { current: 'ethereal-moments' },
      year: 2024,
      medium: 'Acrylic on Canvas',
      category: 'painting',
      dimensions: {
        width: 36,
        height: 48,
        depth: 1.5,
        unit: 'inches'
      },
      description: 'A vibrant exploration of color and emotion, capturing fleeting moments of beauty.',
      price: 2500,
      currency: 'USD',
      status: 'available',
      featured: true,
      metadata: {
        featured: true,
        tags: ['abstract', 'colorful', 'contemporary']
      }
    })
    console.log('✅ Artwork created:', artwork._id)

    console.log('\n🎉 Sample content created successfully!')
    console.log('Visit http://localhost:3000/studio to see your content')
    
  } catch (error) {
    console.error('❌ Failed to create content:', error.message)
    if (error.message.includes('token')) {
      console.log('\n💡 You need to set SANITY_API_TOKEN in your .env.local file')
      console.log('Get your token from: https://sanity.io/manage')
    }
  }
}

createSampleContent()
