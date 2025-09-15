import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolioSettings',
  title: 'Portfolio Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'primaryArtist',
      title: 'Primary Artist',
      type: 'reference',
      to: [{ type: 'artist' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredArtworks',
      title: 'Featured Artworks (Homepage)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'artwork' }],
        },
      ],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Hero Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Hero Subtitle',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Hero Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'ctaText',
          title: 'Primary CTA Text',
          type: 'string',
          initialValue: 'Explore Gallery',
        },
        {
          name: 'ctaLink',
          title: 'Primary CTA Link',
          type: 'string',
          initialValue: '/portfolio',
        },
        {
          name: 'secondaryCtaText',
          title: 'Secondary CTA Text',
          type: 'string',
          initialValue: 'About the Artist',
        },
        {
          name: 'secondaryCtaLink',
          title: 'Secondary CTA Link',
          type: 'string',
          initialValue: '/about',
        },
      ],
    }),
    defineField({
      name: 'galleryTransition',
      title: 'Gallery Transition Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Enter the Gallery',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
          rows: 3,
          initialValue: 'Discover a curated collection of contemporary artworks that explore the boundaries between traditional and modern artistic expression.',
        },
      ],
    }),
    defineField({
      name: 'artistStatement',
      title: 'Artist Statement Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Artist Statement',
        },
        {
          name: 'quote',
          title: 'Featured Quote',
          type: 'string',
          initialValue: 'Art is not what you see, but what you make others see.',
        },
        {
          name: 'paragraphs',
          title: 'Statement Paragraphs',
          type: 'array',
          of: [{ type: 'text' }],
          validation: (Rule) => Rule.min(1).max(5),
        },
        {
          name: 'achievements',
          title: 'Key Achievements',
          type: 'object',
          fields: [
            {
              name: 'artworksCount',
              title: 'Artworks Created',
              type: 'number',
              initialValue: 50,
            },
            {
              name: 'exhibitionsCount',
              title: 'Exhibitions',
              type: 'number',
              initialValue: 12,
            },
            {
              name: 'awardsCount',
              title: 'Awards',
              type: 'number',
              initialValue: 3,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'galleryTransition2',
      title: 'Second Gallery Transition Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Continue Exploring',
        },
        {
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
          rows: 3,
          initialValue: 'Visit our complete portfolio to discover more artworks, learn about upcoming exhibitions, and explore commission opportunities.',
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter',
          type: 'url',
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
        {
          name: 'pinterest',
          title: 'Pinterest',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'email',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'object',
          fields: [
            {
              name: 'street',
              title: 'Street',
              type: 'string',
            },
            {
              name: 'city',
              title: 'City',
              type: 'string',
            },
            {
              name: 'state',
              title: 'State/Province',
              type: 'string',
            },
            {
              name: 'zipCode',
              title: 'ZIP/Postal Code',
              type: 'string',
            },
            {
              name: 'country',
              title: 'Country',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'ecommerce',
      title: 'E-commerce Settings',
      type: 'object',
      fields: [
        {
          name: 'currency',
          title: 'Default Currency',
          type: 'string',
          options: {
            list: [
              { title: 'USD', value: 'USD' },
              { title: 'EUR', value: 'EUR' },
              { title: 'GBP', value: 'GBP' },
              { title: 'CAD', value: 'CAD' },
              { title: 'AUD', value: 'AUD' },
            ],
          },
          initialValue: 'USD',
        },
        {
          name: 'taxRate',
          title: 'Tax Rate (%)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(100),
        },
        {
          name: 'shippingRates',
          title: 'Shipping Rates',
          type: 'object',
          fields: [
            {
              name: 'domestic',
              title: 'Domestic Shipping',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            },
            {
              name: 'international',
              title: 'International Shipping',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            },
            {
              name: 'freeShippingThreshold',
              title: 'Free Shipping Threshold',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            },
          ],
        },
        {
          name: 'paymentMethods',
          title: 'Accepted Payment Methods',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: 'Credit Card', value: 'credit-card' },
              { title: 'PayPal', value: 'paypal' },
              { title: 'Bank Transfer', value: 'bank-transfer' },
              { title: 'Check', value: 'check' },
              { title: 'Cash', value: 'cash' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
        },
        {
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Portfolio Settings',
        media,
      }
    },
  },
})
