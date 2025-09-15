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

async function populateContent() {
  console.log('🎨 Populating sample content...');
  
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5ave8l4g',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2025-06-04',
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  });

  try {
    // Check if artist already exists
    console.log('👤 Checking for existing artist...');
    const existingArtist = await client.fetch('*[_type == "artist" && name == "Jennifer Watkins"][0]');
    
    let artist;
    if (existingArtist) {
      console.log('✅ Artist already exists:', existingArtist._id);
      artist = existingArtist;
    } else {
      console.log('👩‍🎨 Creating new artist profile...');
      artist = await client.create({
        _type: 'artist',
        name: 'Jennifer Watkins',
        bio: 'Jennifer Watkins is a contemporary artist whose work explores the intersection of traditional painting techniques and modern digital expression. This biography appears on the About page and provides visitors with background about the artist\'s journey and artistic philosophy.',
        statement: 'My artistic practice is rooted in the belief that art has the power to transform both creator and viewer. Each piece I create is an exploration of color, form, and emotion - a visual conversation about what it means to be human in our rapidly changing world. This artist statement appears in the dedicated section on your website.',
        shortBio: 'Contemporary artist exploring the intersection of traditional painting and modern expression through bold colors and dynamic compositions. This short bio appears on the homepage and artwork cards.',
        aboutPageIntro: 'Discover the artist behind the canvas and the inspiration that drives each creation. This text appears as a subtitle on the About page.',
        birthYear: 1985,
        nationality: 'American',
        location: {
          city: 'New York',
          country: 'United States'
        },
        activeSince: 2010,
        primaryMedium: 'Mixed Media on Canvas',
        socialMedia: {
          instagram: 'https://instagram.com/jenniferwatkinsart',
          facebook: 'https://facebook.com/jenniferwatkinsartist',
          linkedin: 'https://linkedin.com/in/jenniferwatkins'
        },
        contact: {
          email: 'jennifer@jenniferwatkinsart.com',
          phone: '+1 (555) 123-4567',
          website: 'https://jenniferwatkinsart.com'
        },
        isActive: true
      });
      console.log('✅ Artist created:', artist._id);
    }

    // Check if portfolio settings already exist
    console.log('⚙️ Checking for existing portfolio settings...');
    const existingSettings = await client.fetch('*[_type == "portfolioSettings"][0]');
    
    if (existingSettings) {
      console.log('✅ Portfolio settings already exist:', existingSettings._id);
      console.log('📝 Updating existing settings with sample content...');
      
      const updatedSettings = await client
        .patch(existingSettings._id)
        .set({
          title: 'Jennifer Watkins Art Portfolio - This title appears in browser tabs and search results',
          description: 'Contemporary art portfolio showcasing original paintings and mixed media works. This description appears in Google search results and social media previews.',
          heroSection: {
            title: 'Welcome to Jennifer Watkins Art - This large headline appears at the top of your homepage',
            subtitle: 'Contemporary Abstract Expressionism - This subtitle appears below the main title',
            description: 'Explore a curated collection of contemporary artworks that bridge traditional painting techniques with modern digital expression. This paragraph introduces visitors to your work and appears below the hero title.',
            ctaText: 'Explore Gallery',
            ctaLink: '/portfolio',
            secondaryCtaText: 'About the Artist',
            secondaryCtaLink: '/about'
          },
          primaryArtist: {
            _type: 'reference',
            _ref: artist._id
          }
        })
        .commit();
        
      console.log('✅ Portfolio settings updated:', updatedSettings._id);
    } else {
      console.log('⚙️ Creating new portfolio settings...');
      const portfolioSettings = await client.create({
        _type: 'portfolioSettings',
        _id: 'portfolioSettings',
        title: 'Jennifer Watkins Art Portfolio - This title appears in browser tabs and search results',
        description: 'Contemporary art portfolio showcasing original paintings and mixed media works. This description appears in Google search results and social media previews.',
        primaryArtist: {
          _type: 'reference',
          _ref: artist._id
        },
        heroSection: {
          title: 'Welcome to Jennifer Watkins Art - This large headline appears at the top of your homepage',
          subtitle: 'Contemporary Abstract Expressionism - This subtitle appears below the main title',
          description: 'Explore a curated collection of contemporary artworks that bridge traditional painting techniques with modern digital expression. This paragraph introduces visitors to your work and appears below the hero title.',
          ctaText: 'Explore Gallery',
          ctaLink: '/portfolio',
          secondaryCtaText: 'About the Artist',
          secondaryCtaLink: '/about'
        }
      });
      console.log('✅ Portfolio settings created:', portfolioSettings._id);
    }

    console.log('\n🎉 Sample content populated successfully!');
    console.log('📍 Next steps:');
    console.log('1. Visit http://localhost:3000/studio to see your content');
    console.log('2. Notice how each field has explanatory text showing what it controls');
    console.log('3. Edit the sample content to match your actual portfolio');
    console.log('4. Test the visual editing in presentation mode');
    
  } catch (error) {
    console.error('❌ Failed to populate content:', error.message);
    console.error('Full error:', error);
  }
}

// Add timeout
const timeout = setTimeout(() => {
  console.error('⏰ Script timed out after 20 seconds');
  process.exit(1);
}, 20000);

populateContent()
  .then(() => {
    clearTimeout(timeout);
    console.log('🎉 Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    clearTimeout(timeout);
    console.error('💥 Unhandled error:', error);
    process.exit(1);
  });
