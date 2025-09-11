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
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'ctaText',
          title: 'Call to Action Text',
          type: 'string',
        },
        {
          name: 'ctaLink',
          title: 'Call to Action Link',
          type: 'string',
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
