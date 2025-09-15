const { createClient } = require('next-sanity');

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5ave8l4g',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-06-04',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

async function populatePortfolioSettings() {
  console.log('🎨 Creating portfolio settings document...');

  const portfolioSettings = {
    _type: 'portfolioSettings',
    _id: 'portfolioSettings',
    title: 'Jennifer Watkins Art Portfolio',
    description: 'Contemporary art portfolio showcasing original paintings and artwork by Jennifer Watkins. Explore a sophisticated collection of contemporary pieces available for purchase.',
    
    heroSection: {
      title: 'Contemporary Art',
      subtitle: 'Portfolio',
      description: 'Discover a curated collection of contemporary artwork that explores the intersection of traditional techniques and modern expression.',
      ctaText: 'Explore Gallery',
      ctaLink: '/portfolio',
      secondaryCtaText: 'About the Artist',
      secondaryCtaLink: '/about',
    },

    galleryTransition: {
      title: 'Enter the Gallery',
      subtitle: 'Discover a curated collection of contemporary artworks that explore the boundaries between traditional and modern artistic expression.',
    },

    artistStatement: {
      title: 'Artist Statement',
      quote: 'Art is not what you see, but what you make others see.',
      paragraphs: [
        'My work explores the delicate balance between chaos and order, finding beauty in the unexpected intersections of color, form, and emotion. Each piece begins as a conversation between my conscious intentions and the spontaneous discoveries that emerge through the creative process.',
        'Drawing inspiration from both the natural world and urban landscapes, I seek to capture moments of transformation—those fleeting instances where light shifts, seasons change, or human experience crystallizes into something profound and universal.',
        'Through a combination of traditional techniques and contemporary approaches, I invite viewers to pause, reflect, and discover their own narratives within the visual language I create.',
      ],
      achievements: {
        artworksCount: 50,
        exhibitionsCount: 12,
        awardsCount: 3,
      },
    },

    socialMedia: {
      instagram: 'https://instagram.com/jenniferwatkinsart',
      facebook: 'https://facebook.com/jenniferwatkinsart',
      twitter: 'https://twitter.com/jwatkins_art',
    },

    contact: {
      email: 'hello@jenniferwatkins.art',
      phone: '+1 (555) 123-4567',
      address: {
        city: 'Brooklyn',
        state: 'NY',
        country: 'United States',
      },
    },

    ecommerce: {
      currency: 'USD',
      taxRate: 8.25,
      shippingRates: {
        domestic: 25,
        international: 75,
        freeShippingThreshold: 500,
      },
      paymentMethods: ['credit-card', 'paypal', 'bank-transfer'],
    },

    seo: {
      metaTitle: 'Jennifer Watkins - Contemporary Artist & Painter',
      metaDescription: 'Explore the contemporary art portfolio of Jennifer Watkins. Original paintings and mixed media artworks available for purchase.',
      keywords: ['contemporary art', 'paintings', 'mixed media', 'Jennifer Watkins', 'artist', 'portfolio'],
    },

    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
  };

  try {
    const result = await client.createOrReplace(portfolioSettings);
    console.log('✅ Portfolio settings created successfully:', result._id);
    return result;
  } catch (error) {
    console.error('❌ Error creating portfolio settings:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Starting portfolio settings population...');
    console.log('Environment check:');
    console.log('- Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5ave8l4g');
    console.log('- Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production');
    console.log('- Token available:', !!process.env.SANITY_API_READ_TOKEN);

    await populatePortfolioSettings();
    console.log('🎉 Portfolio settings population completed!');
  } catch (error) {
    console.error('💥 Population failed:', error);
    console.error('Full error:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { populatePortfolioSettings };
