const { createClient } = require('next-sanity')

// Test Sanity connection and schema
async function testSanity() {
  console.log('🔍 Testing Sanity connection...')
  
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5ave8l4g',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2023-12-01',
    useCdn: false,
  })

  try {
    // Test basic connection
    console.log('📡 Testing basic connection...')
    const result = await client.fetch('*[_type == "sanity.imageAsset"][0]')
    console.log('✅ Connection successful')
    
    // Test schema types
    console.log('📋 Testing schema types...')
    const schemaTypes = await client.fetch('array::unique(*[]._type)')
    console.log('📋 Available document types:', schemaTypes)
    
    // Test specific content
    console.log('🎨 Testing artwork documents...')
    const artworks = await client.fetch('*[_type == "artwork"]')
    console.log(`🎨 Found ${artworks.length} artworks`)
    
    console.log('👤 Testing artist documents...')
    const artists = await client.fetch('*[_type == "artist"]')
    console.log(`👤 Found ${artists.length} artists`)
    
    console.log('⚙️ Testing portfolio settings...')
    const settings = await client.fetch('*[_type == "portfolioSettings"]')
    console.log(`⚙️ Found ${settings.length} portfolio settings`)
    
    console.log('\n✅ All tests passed! Sanity is working correctly.')
    
  } catch (error) {
    console.error('❌ Sanity test failed:', error.message)
    console.error('Full error:', error)
  }
}

testSanity()
