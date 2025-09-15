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

async function checkAndCreateSettings() {
  console.log('🔍 Checking for portfolio settings...');
  
  try {
    // Check if portfolio settings exist
    const existingSettings = await client.fetch('*[_type == "portfolioSettings"][0]');
    
    if (existingSettings) {
      console.log('✅ Portfolio settings found:', existingSettings._id);
      console.log('📝 Current settings structure:');
      console.log('   - Title:', existingSettings.title || 'Not set');
      console.log('   - Hero Section:', existingSettings.heroSection ? 'Configured' : 'Missing');
      console.log('   - Gallery Transition:', existingSettings.galleryTransition ? 'Configured' : 'Missing');
      console.log('   - Featured Collection:', existingSettings.featuredCollection ? 'Configured' : 'Missing');
      console.log('   - Artist Statement:', existingSettings.artistStatement ? 'Configured' : 'Missing');
      console.log('   - Gallery Transition 2:', existingSettings.galleryTransition2 ? 'Configured' : 'Missing');
      
      // Check if we need to add the new featuredCollection field
      if (!existingSettings.featuredCollection) {
        console.log('🔧 Adding missing featuredCollection field...');
        
        const updatedSettings = await client
          .patch(existingSettings._id)
          .set({
            featuredCollection: {
              title: 'Featured Collection',
              subtitle: 'A selection of recent works showcasing diverse mediums and artistic approaches.'
            }
          })
          .commit();
          
        console.log('✅ Added featuredCollection field to existing settings');
      }
      
      return existingSettings;
    } else {
      console.log('❌ No portfolio settings found. Creating new settings document...');
      
      // Create new portfolio settings
      const newSettings = await client.create({
        _type: 'portfolioSettings',
        title: 'Jennifer Watkins Art Portfolio',
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
          subtitle: 'Discover a curated collection of contemporary artworks that explore the boundaries between traditional and modern artistic expression.'
        },
        featuredCollection: {
          title: 'Featured Collection',
          subtitle: 'A selection of recent works showcasing diverse mediums and artistic approaches.'
        },
        artistStatement: {
          title: 'Artist Statement',
          quote: 'Art is not what you see, but what you make others see.',
          paragraphs: [
            'My work explores the delicate balance between chaos and order, finding beauty in the unexpected intersections of color, form, and emotion.',
            'Drawing inspiration from both the natural world and urban landscapes, I seek to capture moments of transformation.',
            'Through a combination of traditional techniques and contemporary approaches, I invite viewers to pause, reflect, and discover their own narratives.'
          ],
          achievements: {
            artworksCount: 50,
            exhibitionsCount: 12,
            awardsCount: 3
          }
        },
        galleryTransition2: {
          title: 'Continue Exploring',
          subtitle: 'Visit our complete portfolio to discover more artworks, learn about upcoming exhibitions, and explore commission opportunities.'
        },
        contact: {
          email: 'hello@jenniferwatkins.art'
        }
      });
      
      console.log('✅ Created new portfolio settings:', newSettings._id);
      return newSettings;
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

async function checkArtist() {
  console.log('\n🎨 Checking for artist profile...');
  
  try {
    const existingArtist = await client.fetch('*[_type == "artist"][0]');
    
    if (existingArtist) {
      console.log('✅ Artist profile found:', existingArtist._id);
      console.log('   - Name:', existingArtist.name || 'Not set');
      return existingArtist;
    } else {
      console.log('❌ No artist profile found. Creating basic artist profile...');
      
      const newArtist = await client.create({
        _type: 'artist',
        name: 'Jennifer Watkins',
        shortBio: 'Contemporary Artist & Visual Storyteller',
        bio: 'Jennifer Watkins is a contemporary artist whose work explores the intersection of traditional and modern artistic expression.',
        statement: 'My artistic practice centers on the exploration of color, form, and emotion in contemporary life.',
        activeSince: 2018,
        location: {
          city: 'New York',
          country: 'United States'
        }
      });
      
      console.log('✅ Created new artist profile:', newArtist._id);
      return newArtist;
    }
  } catch (error) {
    console.error('❌ Error creating artist:', error.message);
    throw error;
  }
}

// Add timeout
const timeout = setTimeout(() => {
  console.error('⏰ Script timed out after 20 seconds');
  process.exit(1);
}, 20000);

Promise.all([checkAndCreateSettings(), checkArtist()])
  .then(([settings, artist]) => {
    clearTimeout(timeout);
    console.log('\n🎉 Setup complete!');
    console.log('📋 Summary:');
    console.log('   - Portfolio Settings ID:', settings._id);
    console.log('   - Artist Profile ID:', artist._id);
    console.log('\n🚀 Next steps:');
    console.log('   1. Start dev server: npm run dev');
    console.log('   2. Visit: http://localhost:3000/test-sanity');
    console.log('   3. Test visual editing: http://localhost:3000/studio/presentation');
    process.exit(0);
  })
  .catch((error) => {
    clearTimeout(timeout);
    console.error('💥 Setup failed:', error);
    process.exit(1);
  });
