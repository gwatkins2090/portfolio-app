// Load environment variables from .env.local manually
const fs = require('fs');
const path = require('path');

function loadEnvLocal() {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // Remove quotes
        process.env[key.trim()] = value.trim();
      }
    });
    
    console.log('✅ Successfully loaded .env.local');
  } catch (error) {
    console.log('⚠️ Could not load .env.local:', error.message);
  }
}

loadEnvLocal();

const { createClient } = require('next-sanity');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5ave8l4g',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-06-04',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function createGlobalSettings() {
  console.log('🌐 Creating Global Settings...');
  
  try {
    const existing = await client.fetch('*[_type == "globalSettings"][0]');
    if (existing) {
      console.log('✅ Global Settings already exist');
      return existing;
    }

    const globalSettings = await client.create({
      _type: 'globalSettings',
      _id: 'globalSettings',
      siteName: 'Jennifer Watkins Art',
      siteDescription: 'Contemporary art portfolio showcasing original paintings and artwork by Jennifer Watkins.',
      siteUrl: 'https://jenniferwatkins.art',
      header: {
        logoText: 'Jennifer Watkins',
        navigation: [
          { label: 'Home', url: '/', openInNewTab: false },
          { label: 'Portfolio', url: '/portfolio', openInNewTab: false },
          { label: 'Exhibitions', url: '/exhibitions', openInNewTab: false },
          { label: 'Shop', url: '/shop', openInNewTab: false },
          { label: 'About', url: '/about', openInNewTab: false },
          { label: 'Contact', url: '/contact', openInNewTab: false },
        ],
        ctaButton: {
          text: 'Shop Artworks',
          url: '/shop',
          style: 'primary'
        }
      },
      footer: {
        copyrightText: '© 2024 Jennifer Watkins. All rights reserved.',
        description: 'Contemporary artist exploring the boundaries between traditional and modern expression.',
        quickLinks: [
          { label: 'Privacy Policy', url: '/privacy' },
          { label: 'Terms of Service', url: '/terms' },
          { label: 'Shipping Info', url: '/shipping' },
        ],
        socialMedia: {
          instagram: 'https://instagram.com/jenniferwatkinsart',
          facebook: 'https://facebook.com/jenniferwatkinsart',
        },
        newsletter: {
          enabled: true,
          title: 'Stay Updated',
          description: 'Get notified about new artworks, exhibitions, and studio updates.',
          buttonText: 'Subscribe'
        }
      },
      seo: {
        defaultMetaTitle: 'Jennifer Watkins - Contemporary Artist',
        defaultMetaDescription: 'Contemporary art portfolio showcasing original paintings and artwork by Jennifer Watkins.',
        defaultKeywords: ['contemporary art', 'paintings', 'Jennifer Watkins', 'artist', 'portfolio'],
      }
    });

    console.log('✅ Created Global Settings:', globalSettings._id);
    return globalSettings;
  } catch (error) {
    console.error('❌ Error creating Global Settings:', error.message);
    throw error;
  }
}

async function createHomepageSettings() {
  console.log('🏠 Creating Homepage Settings...');
  
  try {
    const existing = await client.fetch('*[_type == "homepageSettings"][0]');
    if (existing) {
      console.log('✅ Homepage Settings already exist');
      return existing;
    }

    const homepageSettings = await client.create({
      _type: 'homepageSettings',
      _id: 'homepageSettings',
      title: 'Jennifer Watkins - Contemporary Artist',
      description: 'Contemporary art portfolio showcasing original paintings and artwork by Jennifer Watkins.',
      heroSection: {
        title: 'Contemporary Art',
        subtitle: 'Portfolio',
        description: 'Discover a curated collection of contemporary artwork that explores the intersection of traditional techniques and modern expression.',
        ctaText: 'Explore Gallery',
        ctaLink: '/portfolio',
        secondaryCtaText: 'About the Artist',
        secondaryCtaLink: '/about'
      },
      galleryTransition: {
        title: 'Enter the Gallery',
        subtitle: 'Discover a curated collection of contemporary artworks that explore the boundaries between traditional and modern artistic expression. Each piece invites you to contemplate themes of identity, transformation, and the beauty found in everyday moments.'
      },
      featuredCollection: {
        title: 'Featured Collection',
        subtitle: 'A selection of recent works showcasing diverse mediums and artistic approaches. These pieces represent the evolution of my artistic practice and explore themes of connection, transformation, and the interplay between light and shadow.'
      },
      artistStatement: {
        title: 'Artist Statement',
        quote: 'Art is not what you see, but what you make others see.',
        paragraphs: [
          'My work explores the delicate balance between chaos and order, finding beauty in the unexpected intersections of color, form, and emotion.',
          'Drawing inspiration from both the natural world and urban landscapes, I seek to capture moments of transformation and contemplation.',
          'Through a combination of traditional techniques and contemporary approaches, I invite viewers to pause, reflect, and discover their own narratives within each piece.'
        ],
        achievements: {
          artworksCount: 127,
          exhibitionsCount: 18,
          awardsCount: 5
        }
      },
      continueExploring: {
        title: 'Continue Exploring',
        subtitle: 'Visit our complete portfolio to discover more artworks, learn about upcoming exhibitions, and explore commission opportunities. Each piece represents a unique moment in the ongoing dialogue between artist and canvas.'
      },
      seo: {
        metaTitle: 'Jennifer Watkins - Contemporary Artist Portfolio',
        metaDescription: 'Explore the contemporary art portfolio of Jennifer Watkins featuring original paintings, mixed media works, and artistic explorations.',
        keywords: ['contemporary art', 'paintings', 'Jennifer Watkins', 'artist portfolio', 'original artwork']
      }
    });

    console.log('✅ Created Homepage Settings:', homepageSettings._id);
    return homepageSettings;
  } catch (error) {
    console.error('❌ Error creating Homepage Settings:', error.message);
    throw error;
  }
}

async function createAboutPageSettings() {
  console.log('👤 Creating About Page Settings...');
  
  try {
    const existing = await client.fetch('*[_type == "aboutPageSettings"][0]');
    if (existing) {
      console.log('✅ About Page Settings already exist');
      return existing;
    }

    const aboutPageSettings = await client.create({
      _type: 'aboutPageSettings',
      _id: 'aboutPageSettings',
      title: 'About Jennifer Watkins | Contemporary Artist',
      description: 'Learn about Jennifer Watkins, a contemporary artist exploring the boundaries between traditional artistry and contemporary expression.',
      heroSection: {
        title: 'About the Artist',
        subtitle: 'Exploring the boundaries between traditional artistry and contemporary expression, creating works that invite contemplation and emotional connection.'
      },
      biographySection: {
        title: 'Biography',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'Jennifer Watkins is a contemporary artist whose work explores the intersection of traditional techniques and modern expression. Born and raised in the Pacific Northwest, her artistic journey began with a deep appreciation for the natural world and its ever-changing landscapes.'
              }
            ]
          }
        ],
        imageCaption: 'Jennifer Watkins in her studio, 2024'
      },
      philosophySection: {
        title: 'Artistic Philosophy',
        content: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: 'My artistic practice centers on the exploration of color, form, and emotion in contemporary life. I believe that art serves as a bridge between the seen and unseen, the known and unknown.'
              }
            ]
          }
        ],
        quote: 'Art is the language of the soul, spoken through color and form.'
      },
      educationSection: {
        title: 'Education & Training',
        entries: [
          {
            institution: 'Pacific Northwest College of Art',
            degree: 'Master of Fine Arts',
            year: '2018',
            description: 'Specialized in contemporary painting and mixed media'
          },
          {
            institution: 'University of Washington',
            degree: 'Bachelor of Fine Arts',
            year: '2016',
            description: 'Focus on studio art and art history'
          }
        ]
      },
      exhibitionSection: {
        title: 'Exhibition History',
        subtitle: 'A selection of notable exhibitions and shows featuring my work.'
      },
      awardsSection: {
        title: 'Awards & Recognition',
        entries: [
          {
            title: 'Emerging Artist Award',
            organization: 'Pacific Northwest Art Association',
            year: '2023',
            description: 'Recognition for outstanding contribution to contemporary art'
          },
          {
            title: 'Best in Show',
            organization: 'Seattle Art Fair',
            year: '2022',
            description: 'Juried exhibition featuring regional artists'
          }
        ]
      },
      contactCta: {
        title: 'Let\'s Connect',
        subtitle: 'Interested in my work or have a project in mind? I\'d love to hear from you.',
        buttonText: 'Get in Touch'
      },
      seo: {
        metaTitle: 'About Jennifer Watkins | Contemporary Artist Biography',
        metaDescription: 'Learn about Jennifer Watkins\' artistic journey, philosophy, and approach to contemporary art and painting.',
        keywords: ['Jennifer Watkins', 'artist biography', 'contemporary artist', 'about artist', 'artistic philosophy']
      }
    });

    console.log('✅ Created About Page Settings:', aboutPageSettings._id);
    return aboutPageSettings;
  } catch (error) {
    console.error('❌ Error creating About Page Settings:', error.message);
    throw error;
  }
}

// Add timeout
const timeout = setTimeout(() => {
  console.error('⏰ Script timed out after 30 seconds');
  process.exit(1);
}, 30000);

Promise.all([
  createGlobalSettings(),
  createHomepageSettings(),
  createAboutPageSettings()
])
  .then(([globalSettings, homepageSettings, aboutPageSettings]) => {
    clearTimeout(timeout);
    console.log('\n🎉 Page Settings Setup Complete!');
    console.log('📋 Summary:');
    console.log('   - Global Settings ID:', globalSettings._id);
    console.log('   - Homepage Settings ID:', homepageSettings._id);
    console.log('   - About Page Settings ID:', aboutPageSettings._id);
    console.log('\n🚀 Next steps:');
    console.log('   1. Start dev server: npm run dev');
    console.log('   2. Visit studio: http://localhost:3000/studio');
    console.log('   3. Check Page Settings section');
    console.log('   4. Test visual editing: http://localhost:3000/studio/presentation');
    process.exit(0);
  })
  .catch((error) => {
    clearTimeout(timeout);
    console.error('💥 Setup failed:', error);
    process.exit(1);
  });
