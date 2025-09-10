// Test if schemas are properly configured
const path = require('path')

async function testSchemas() {
  console.log('🔍 Testing schema configuration...')
  
  try {
    // Test importing the schema
    const schemaPath = path.join(process.cwd(), 'src', 'sanity', 'schemaTypes', 'index.ts')
    console.log('📁 Schema path:', schemaPath)
    
    // Check if files exist
    const fs = require('fs')
    
    const files = [
      'src/sanity/schemaTypes/index.ts',
      'src/sanity/schemaTypes/artwork.ts',
      'src/sanity/schemaTypes/artist.ts',
      'src/sanity/schemaTypes/portfolioSettings.ts',
      'sanity.config.ts'
    ]
    
    console.log('📋 Checking schema files...')
    for (const file of files) {
      if (fs.existsSync(file)) {
        console.log(`✅ ${file} - exists`)
      } else {
        console.log(`❌ ${file} - missing`)
      }
    }
    
    // Check environment variables
    console.log('\n🔧 Environment variables:')
    console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'NOT SET')
    console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'NOT SET')
    
    console.log('\n💡 Next steps:')
    console.log('1. Restart your development server: npm run dev')
    console.log('2. Visit http://localhost:3000/studio')
    console.log('3. Check if content types appear in the sidebar')
    console.log('4. If not, try visiting http://localhost:3000/visual-editing-demo')
    
  } catch (error) {
    console.error('❌ Schema test failed:', error.message)
  }
}

testSchemas()
