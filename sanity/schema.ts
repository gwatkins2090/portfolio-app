import { type SchemaTypeDefinition } from 'sanity'

// Import schema definitions
import artwork from './schemas/artwork'
import artist from './schemas/artist'
import exhibition from './schemas/exhibition'
import collection from './schemas/collection'
import blogPost from './schemas/blogPost'
import testimonial from './schemas/testimonial'
import portfolioSettings from './schemas/portfolioSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Core content types
    artwork,
    artist,
    exhibition,
    collection,
    
    // Content management
    blogPost,
    testimonial,
    
    // Settings
    portfolioSettings,
  ],
}
