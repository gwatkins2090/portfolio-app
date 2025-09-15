import { type SchemaTypeDefinition } from 'sanity'

// Import all schema types
import artwork from './artwork'
import artist from './artist'
import exhibition from './exhibition'
import collection from './collection'
import blogPost from './blogPost'
import testimonial from './testimonial'
import portfolioSettings from './portfolioSettings'

// New page-specific settings
import homepageSettings from './homepageSettings'
import aboutPageSettings from './aboutPageSettings'
import portfolioPageSettings from './portfolioPageSettings'
import contactPageSettings from './contactPageSettings'
import globalSettings from './globalSettings'

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

    // Page-specific settings
    homepageSettings,
    aboutPageSettings,
    portfolioPageSettings,
    contactPageSettings,

    // Global settings
    globalSettings,

    // Legacy settings (will be migrated)
    portfolioSettings,
  ],
}
