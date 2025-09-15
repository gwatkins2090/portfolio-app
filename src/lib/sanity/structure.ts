import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Jennifer Watkins Art Portfolio')
    .items([
      // Global Settings
      S.listItem()
        .title('🌐 Global Settings')
        .id('globalSettings')
        .child(
          S.document()
            .schemaType('globalSettings')
            .documentId('globalSettings')
        ),

      S.divider(),

      // Page Settings
      S.listItem()
        .title('📄 Page Settings')
        .id('pageSettings')
        .child(
          S.list()
            .title('Page Settings')
            .items([
              S.listItem()
                .title('🏠 Homepage')
                .id('homepageSettings')
                .child(
                  S.document()
                    .schemaType('homepageSettings')
                    .documentId('homepageSettings')
                ),
              S.listItem()
                .title('👤 About Page')
                .id('aboutPageSettings')
                .child(
                  S.document()
                    .schemaType('aboutPageSettings')
                    .documentId('aboutPageSettings')
                ),
              S.listItem()
                .title('🖼️ Portfolio Page')
                .id('portfolioPageSettings')
                .child(
                  S.document()
                    .schemaType('portfolioPageSettings')
                    .documentId('portfolioPageSettings')
                ),
              S.listItem()
                .title('📞 Contact Page')
                .id('contactPageSettings')
                .child(
                  S.document()
                    .schemaType('contactPageSettings')
                    .documentId('contactPageSettings')
                ),
            ])
        ),

      S.divider(),

      // Core Content
      S.listItem()
        .title('🎨 Artworks')
        .schemaType('artwork')
        .child(S.documentTypeList('artwork').title('Artworks')),

      S.listItem()
        .title('📚 Collections')
        .schemaType('collection')
        .child(S.documentTypeList('collection').title('Collections')),

      S.listItem()
        .title('🏛️ Exhibitions')
        .schemaType('exhibition')
        .child(S.documentTypeList('exhibition').title('Exhibitions')),

      S.divider(),

      // Content Management
      S.listItem()
        .title('📝 Blog Posts')
        .schemaType('blogPost')
        .child(S.documentTypeList('blogPost').title('Blog Posts')),

      S.listItem()
        .title('💬 Testimonials')
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('Testimonials')),

      S.divider(),

      // Artist Information
      S.listItem()
        .title('👩‍🎨 Artist Profile')
        .schemaType('artist')
        .child(S.documentTypeList('artist').title('Artist Profile')),

      S.divider(),

      // Legacy Settings (for migration)
      S.listItem()
        .title('⚠️ Legacy Portfolio Settings')
        .id('portfolioSettings')
        .child(
          S.document()
            .schemaType('portfolioSettings')
            .documentId('portfolioSettings')
        ),
    ])
