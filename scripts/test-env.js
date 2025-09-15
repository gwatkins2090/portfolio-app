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

console.log('=== Environment Variables Test ===');
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'Missing');
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'Missing');
console.log('Read Token:', process.env.SANITY_API_READ_TOKEN ? 'Found ✅' : 'Missing ❌');
console.log('Write Token:', process.env.SANITY_API_WRITE_TOKEN ? 'Found ✅' : 'Missing ❌');

if (process.env.SANITY_API_WRITE_TOKEN) {
  console.log('✅ All required environment variables are present!');
  console.log('You can now run the populate script.');
} else {
  console.log('❌ Missing SANITY_API_WRITE_TOKEN');
  console.log('💡 Make sure your .env.local file contains:');
  console.log('SANITY_API_WRITE_TOKEN="your_write_token_here"');
}
