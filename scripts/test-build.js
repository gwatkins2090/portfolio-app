// Simple test to check environment variables and basic functionality
console.log('🔍 Testing build environment...');

// Check environment variables
console.log('Environment Variables:');
console.log('- NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'NOT SET');
console.log('- NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'NOT SET');
console.log('- SANITY_API_READ_TOKEN:', process.env.SANITY_API_READ_TOKEN ? 'SET' : 'NOT SET');
console.log('- SANITY_API_WRITE_TOKEN:', process.env.SANITY_API_WRITE_TOKEN ? 'SET' : 'NOT SET');

// Test basic imports
try {
  console.log('\n📦 Testing imports...');
  
  // Test schema imports
  const { schema } = require('../src/lib/sanity/schemaTypes/index.ts');
  console.log('✅ Schema types imported successfully');
  console.log('- Schema types count:', schema.types.length);
  
  // Test queries
  const queries = require('../src/lib/sanity/queries.ts');
  console.log('✅ Queries imported successfully');
  
  // Test fetch functions
  const fetchFunctions = require('../src/lib/sanity/fetch.ts');
  console.log('✅ Fetch functions imported successfully');
  
  console.log('\n🎉 All imports successful!');
  
} catch (error) {
  console.error('\n❌ Import error:', error.message);
  console.error('Stack:', error.stack);
}

console.log('\n✅ Build environment test complete');
