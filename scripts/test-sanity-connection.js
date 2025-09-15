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

async function testConnection() {
  console.log('🔌 Testing Sanity connection...');
  
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5ave8l4g',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2025-06-04',
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  });

  try {
    // Test basic connection
    console.log('📡 Testing basic query...');
    const result = await client.fetch('*[_type == "portfolioSettings"][0]._id');
    console.log('✅ Basic query successful:', result || 'No portfolioSettings found');
    
    // Test write permissions
    console.log('✏️ Testing write permissions...');
    const testDoc = await client.create({
      _type: 'artist',
      name: 'Test Artist - DELETE ME',
      bio: 'This is a test document that can be safely deleted.',
      statement: 'Test statement',
      shortBio: 'Test short bio',
      aboutPageIntro: 'Test intro',
      isActive: false
    });
    
    console.log('✅ Write test successful, created:', testDoc._id);
    
    // Clean up test document
    console.log('🧹 Cleaning up test document...');
    await client.delete(testDoc._id);
    console.log('✅ Test document deleted');
    
    console.log('\n🎉 All tests passed! Sanity connection is working correctly.');
    console.log('You can now run the populate script safely.');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    if (error.message.includes('Insufficient permissions')) {
      console.log('\n💡 Token permissions issue:');
      console.log('- Make sure your SANITY_API_WRITE_TOKEN has write permissions');
      console.log('- Check that the token is for the correct project and dataset');
      console.log('- Get a new token from: https://sanity.io/manage');
    }
  }
}

// Add timeout
const timeout = setTimeout(() => {
  console.error('⏰ Connection test timed out after 15 seconds');
  process.exit(1);
}, 15000);

testConnection()
  .then(() => {
    clearTimeout(timeout);
    process.exit(0);
  })
  .catch((error) => {
    clearTimeout(timeout);
    console.error('💥 Unhandled error:', error);
    process.exit(1);
  });
