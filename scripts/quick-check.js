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
  } catch (error) {
    console.log('Could not load .env.local');
  }
}

loadEnvLocal();

const { createClient } = require('next-sanity');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5ave8l4g',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-06-04',
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

async function quickCheck() {
  try {
    console.log('Checking current data...');
    
    const settings = await client.fetch('*[_type == "portfolioSettings"][0]');
    const artist = await client.fetch('*[_type == "artist"][0]');
    
    console.log('\nPortfolio Settings:');
    if (settings) {
      console.log('✅ Found settings document');
      console.log('   ID:', settings._id);
      console.log('   Title:', settings.title || 'Not set');
      console.log('   Hero Section:', settings.heroSection ? 'Yes' : 'No');
      console.log('   Gallery Transition:', settings.galleryTransition ? 'Yes' : 'No');
      console.log('   Featured Collection:', settings.featuredCollection ? 'Yes' : 'No');
      console.log('   Artist Statement:', settings.artistStatement ? 'Yes' : 'No');
      console.log('   Gallery Transition 2:', settings.galleryTransition2 ? 'Yes' : 'No');
    } else {
      console.log('❌ No settings found');
    }
    
    console.log('\nArtist Profile:');
    if (artist) {
      console.log('✅ Found artist document');
      console.log('   ID:', artist._id);
      console.log('   Name:', artist.name || 'Not set');
    } else {
      console.log('❌ No artist found');
    }
    
    console.log('\nTo fix missing fields:');
    console.log('1. Visit http://localhost:3000/studio');
    console.log('2. Go to Portfolio Settings');
    console.log('3. Add the missing sections manually');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

quickCheck();
