import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPageSettings',
  title: 'About Page Settings',
  type: 'document',
  icon: () => '👤',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: '👤 The main title for the about page. This appears in browser tabs and search results.',
      validation: (Rule) => Rule.required(),
      initialValue: 'About Jennifer Watkins | Contemporary Artist',
    }),
    defineField({
      name: 'description',
      title: 'Page Description',
      type: 'text',
      rows: 3,
      description: '📝 Brief description for search engines and social media. Keep under 160 characters.',
      validation: (Rule) => Rule.required().max(160),
      initialValue: 'Learn about Jennifer Watkins, a contemporary artist exploring the boundaries between traditional artistry and contemporary expression.',
    }),
    defineField({
      name: 'heroSection',
      title: '🎨 Hero Section',
      type: 'object',
      description: 'The banner section at the top of the about page',
      fields: [
        {
          name: 'title',
          title: 'Page Heading',
          type: 'string',
          description: '✨ Main heading for the about page',
          validation: (Rule) => Rule.required(),
          initialValue: 'About the Artist',
        },
        {
          name: 'subtitle',
          title: 'Page Subtitle',
          type: 'text',
          rows: 3,
          description: '📖 Introductory text that appears below the main heading',
          initialValue: 'Exploring the boundaries between traditional artistry and contemporary expression, creating works that invite contemplation and emotional connection.',
        },
      ],
    }),
    defineField({
      name: 'biographySection',
      title: '📖 Biography Section',
      type: 'object',
      description: 'Detailed information about the artist\'s background and journey',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: '📝 Heading for the biography section',
          initialValue: 'Biography',
        },
        {
          name: 'content',
          title: 'Biography Content',
          type: 'array',
          of: [{ type: 'block' }],
          description: '📖 Rich text content for the artist biography',
        },
        {
          name: 'profileImage',
          title: 'Profile Image',
          type: 'image',
          description: '📷 Professional photo of the artist',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'imageCaption',
          title: 'Image Caption',
          type: 'string',
          description: '📝 Caption for the profile image',
        },
      ],
    }),
    defineField({
      name: 'philosophySection',
      title: '💭 Artistic Philosophy Section',
      type: 'object',
      description: 'The artist\'s approach to art and creative philosophy',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: '💭 Heading for the philosophy section',
          initialValue: 'Artistic Philosophy',
        },
        {
          name: 'content',
          title: 'Philosophy Content',
          type: 'array',
          of: [{ type: 'block' }],
          description: '📖 Rich text content describing artistic philosophy and approach',
        },
        {
          name: 'quote',
          title: 'Featured Quote',
          type: 'string',
          description: '💬 A meaningful quote that represents the artist\'s philosophy',
        },
      ],
    }),
    defineField({
      name: 'educationSection',
      title: '🎓 Education & Training Section',
      type: 'object',
      description: 'Educational background and artistic training',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: '🎓 Heading for the education section',
          initialValue: 'Education & Training',
        },
        {
          name: 'entries',
          title: 'Education Entries',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'institution',
                  title: 'Institution',
                  type: 'string',
                  description: '🏫 Name of the school or institution',
                },
                {
                  name: 'degree',
                  title: 'Degree/Program',
                  type: 'string',
                  description: '📜 Degree or program name',
                },
                {
                  name: 'year',
                  title: 'Year',
                  type: 'string',
                  description: '📅 Year of completion or attendance',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2,
                  description: '📝 Additional details about the education',
                },
              ],
            },
          ],
          description: '📚 List of educational achievements and training',
        },
      ],
    }),
    defineField({
      name: 'exhibitionSection',
      title: '🏛️ Exhibition History Section',
      type: 'object',
      description: 'Showcase of exhibitions and shows',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: '🏛️ Heading for the exhibition section',
          initialValue: 'Exhibition History',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
          rows: 2,
          description: '📝 Brief description of exhibition experience',
          initialValue: 'A selection of notable exhibitions and shows featuring my work.',
        },
        {
          name: 'featuredExhibitions',
          title: 'Featured Exhibitions',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'exhibition' }],
            },
          ],
          description: '🎨 Select exhibitions to highlight on the about page',
          validation: (Rule) => Rule.max(6),
        },
      ],
    }),
    defineField({
      name: 'awardsSection',
      title: '🏆 Awards & Recognition Section',
      type: 'object',
      description: 'Awards, honors, and professional recognition',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          description: '🏆 Heading for the awards section',
          initialValue: 'Awards & Recognition',
        },
        {
          name: 'entries',
          title: 'Awards & Recognition',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Award Title',
                  type: 'string',
                  description: '🏆 Name of the award or recognition',
                },
                {
                  name: 'organization',
                  title: 'Organization',
                  type: 'string',
                  description: '🏢 Organization that gave the award',
                },
                {
                  name: 'year',
                  title: 'Year',
                  type: 'string',
                  description: '📅 Year the award was received',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                  rows: 2,
                  description: '📝 Details about the award or recognition',
                },
              ],
            },
          ],
          description: '🏆 List of awards and professional recognition',
        },
      ],
    }),
    defineField({
      name: 'contactCta',
      title: '📞 Contact Call-to-Action',
      type: 'object',
      description: 'Section encouraging visitors to get in touch',
      fields: [
        {
          name: 'title',
          title: 'CTA Title',
          type: 'string',
          description: '📞 Heading for the contact section',
          initialValue: 'Let\'s Connect',
        },
        {
          name: 'subtitle',
          title: 'CTA Description',
          type: 'text',
          rows: 3,
          description: '📝 Text encouraging visitors to make contact',
          initialValue: 'Interested in my work or have a project in mind? I\'d love to hear from you.',
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          description: '🔘 Text for the contact button',
          initialValue: 'Get in Touch',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: '🔍 SEO Settings',
      type: 'object',
      description: 'Search engine optimization settings for the about page',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: '📝 Title that appears in search results (max 60 characters)',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: '📝 Description that appears in search results (max 160 characters)',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: '🏷️ Keywords for search engine optimization',
          options: {
            layout: 'tags',
          },
        },
        {
          name: 'ogImage',
          title: 'Social Media Image',
          type: 'image',
          description: '📷 Image that appears when the about page is shared on social media',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'About Page Settings',
        subtitle: subtitle || 'Configure about page content and layout',
      }
    },
  },
})
