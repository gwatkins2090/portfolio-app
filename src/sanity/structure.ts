import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Jennifer Watkins Art Portfolio')
    .items([
      // Portfolio Settings (Singleton)
      S.listItem()
        .title('Portfolio Settings')
        .id('portfolioSettings')
        .child(
          S.document()
            .schemaType('portfolioSettings')
            .documentId('portfolioSettings')
        ),

      S.divider(),

      // Core Content
      S.listItem()
        .title('Artworks')
        .schemaType('artwork')
        .child(S.documentTypeList('artwork').title('Artworks')),

      S.listItem()
        .title('Collections')
        .schemaType('collection')
        .child(S.documentTypeList('collection').title('Collections')),

      S.listItem()
        .title('Exhibitions')
        .schemaType('exhibition')
        .child(S.documentTypeList('exhibition').title('Exhibitions')),

      S.divider(),

      // Content Management
      S.listItem()
        .title('Blog Posts')
        .schemaType('blogPost')
        .child(S.documentTypeList('blogPost').title('Blog Posts')),

      S.listItem()
        .title('Testimonials')
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('Testimonials')),

      S.divider(),

      // Artist Information
      S.listItem()
        .title('Artist Profile')
        .schemaType('artist')
        .child(S.documentTypeList('artist').title('Artist Profile')),
    ])
