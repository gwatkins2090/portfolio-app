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

async function testVisualEditingSetup() {
  console.log('🔍 Testing Visual Editing Setup...\n');
  
  // 1. Check Environment Variables
  console.log('1. Environment Variables:');
  console.log('   Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '❌ Missing');
  console.log('   Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || '❌ Missing');
  console.log('   Server Read Token:', process.env.SANITY_API_READ_TOKEN ? '✅ Found' : '❌ Missing');
  console.log('   Client Read Token:', process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN ? '✅ Found' : '❌ Missing');
  console.log('   Preview Secret:', process.env.SANITY_PREVIEW_SECRET ? '✅ Found' : '❌ Missing');
  console.log('');

  // 2. Test Sanity Connection
  console.log('2. Testing Sanity Connection:');
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5ave8l4g',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2025-06-04',
    useCdn: false,
    token: process.env.SANITY_API_READ_TOKEN,
  });

  try {
    // Test basic query
    const portfolioSettings = await client.fetch('*[_type == "portfolioSettings"][0]');
    console.log('   Portfolio Settings:', portfolioSettings ? '✅ Found' : '❌ Not found');
    
    const artist = await client.fetch('*[_type == "artist"][0]');
    console.log('   Artist Profile:', artist ? '✅ Found' : '❌ Not found');
    
    if (portfolioSettings) {
      console.log('   Settings ID:', portfolioSettings._id);
      console.log('   Settings Title:', portfolioSettings.title || 'No title');
      console.log('   Hero Title:', portfolioSettings.heroSection?.title || 'No hero title');
    }
    
    if (artist) {
      console.log('   Artist ID:', artist._id);
      console.log('   Artist Name:', artist.name || 'No name');
    }
    
  } catch (error) {
    console.log('   ❌ Connection failed:', error.message);
  }
  console.log('');

  // 3. Test Stega Configuration
  console.log('3. Testing Stega Configuration:');
  try {
    const stegaClient = client.withConfig({
      perspective: 'previewDrafts',
      token: process.env.SANITY_API_READ_TOKEN,
      stega: {
        enabled: true,
        studioUrl: '/studio',
      },
    });
    
    const stegaResult = await stegaClient.fetch('*[_type == "portfolioSettings"][0]{_id, title}');
    console.log('   Stega Query:', stegaResult ? '✅ Working' : '❌ Failed');
    
    if (stegaResult && typeof stegaResult.title === 'string') {
      // Check if stega encoding is present
      const hasStegaEncoding = stegaResult.title.includes('\u0001') || stegaResult.title.includes('\u0002');
      console.log('   Stega Encoding:', hasStegaEncoding ? '✅ Present' : '⚠️ Not detected');
    }
    
  } catch (error) {
    console.log('   ❌ Stega test failed:', error.message);
  }
  console.log('');

  // 4. Check File Structure
  console.log('4. Checking File Structure:');
  const requiredFiles = [
    'src/components/sanity/visual-editing.tsx',
    'src/components/sanity/visual-editing-wrapper.tsx',
    'src/lib/sanity/lib/live.ts',
    'src/app/api/draft/route.ts',
    'src/lib/sanity/fetch.ts'
  ];
  
  requiredFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`   ${file}:`, exists ? '✅ Exists' : '❌ Missing');
  });
  console.log('');

  // 5. Recommendations
  console.log('5. Recommendations for Visual Editing:');
  console.log('   📍 To test visual editing:');
  console.log('   1. Start dev server: npm run dev');
  console.log('   2. Visit: http://localhost:3000/test-sanity');
  console.log('   3. Open: http://localhost:3000/studio/presentation');
  console.log('   4. Navigate to the test page in presentation mode');
  console.log('   5. Look for edit overlays when hovering over content');
  console.log('');
  console.log('   🔧 If visual editing is not working:');
  console.log('   - Ensure draft mode is enabled via /api/draft');
  console.log('   - Check browser console for errors');
  console.log('   - Verify that content has proper data-sanity-* attributes');
  console.log('   - Make sure the presentation tool can access the preview URL');
  console.log('');
  console.log('   📝 For content updates to appear:');
  console.log('   - Changes in studio should appear immediately in presentation mode');
  console.log('   - Regular website pages need draft mode enabled to show changes');
  console.log('   - Published changes appear on the live site after revalidation');
}

// Add timeout
const timeout = setTimeout(() => {
  console.error('⏰ Test timed out after 20 seconds');
  process.exit(1);
}, 20000);

testVisualEditingSetup()
  .then(() => {
    clearTimeout(timeout);
    console.log('🎉 Visual editing setup test completed!');
    process.exit(0);
  })
  .catch((error) => {
    clearTimeout(timeout);
    console.error('💥 Test failed:', error);
    process.exit(1);
  });
