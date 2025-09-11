import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'year',
      title: 'Year Created',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      options: {
        list: [
          { title: 'Oil Painting', value: 'oil-painting' },
          { title: 'Acrylic Painting', value: 'acrylic-painting' },
          { title: 'Watercolor', value: 'watercolor' },
          { title: 'Digital Art', value: 'digital-art' },
          { title: 'Mixed Media', value: 'mixed-media' },
          { title: 'Sculpture', value: 'sculpture' },
          { title: 'Photography', value: 'photography' },
          { title: 'Drawing', value: 'drawing' },
          { title: 'Printmaking', value: 'printmaking' },
          { title: 'Collage', value: 'collage' },
          { title: 'Installation', value: 'installation' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Abstract', value: 'abstract' },
          { title: 'Landscape', value: 'landscape' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Still Life', value: 'still-life' },
          { title: 'Figurative', value: 'figurative' },
          { title: 'Conceptual', value: 'conceptual' },
          { title: 'Contemporary', value: 'contemporary' },
          { title: 'Experimental', value: 'experimental' },
          { title: 'Nature', value: 'nature' },
          { title: 'Urban', value: 'urban' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      fields: [
        {
          name: 'width',
          title: 'Width',
          type: 'number',
          validation: (Rule) => Rule.required().positive(),
        },
        {
          name: 'height',
          title: 'Height',
          type: 'number',
          validation: (Rule) => Rule.required().positive(),
        },
        {
          name: 'depth',
          title: 'Depth',
          type: 'number',
          validation: (Rule) => Rule.positive(),
        },
        {
          name: 'unit',
          title: 'Unit',
          type: 'string',
          options: {
            list: [
              { title: 'Centimeters', value: 'cm' },
              { title: 'Inches', value: 'in' },
              { title: 'Millimeters', value: 'mm' },
            ],
          },
          initialValue: 'in',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
            {
              name: 'isMain',
              title: 'Main Image',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        {
          name: 'amount',
          title: 'Amount',
          type: 'number',
          validation: (Rule) => Rule.positive(),
        },
        {
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: [
              { title: 'USD', value: 'USD' },
              { title: 'EUR', value: 'EUR' },
              { title: 'GBP', value: 'GBP' },
            ],
          },
          initialValue: 'USD',
        },
        {
          name: 'isNegotiable',
          title: 'Price is Negotiable',
          type: 'boolean',
          initialValue: false,
        },
        {
          name: 'originalPrice',
          title: 'Original Price',
          type: 'number',
          description: 'For sale items',
        },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Reserved', value: 'reserved' },
          { title: 'Not for Sale', value: 'not-for-sale' },
          { title: 'On Loan', value: 'on-loan' },
        ],
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artistNotes',
      title: 'Artist Notes',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'technicalDetails',
      title: 'Technical Details',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'inspiration',
      title: 'Inspiration',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'string',
    }),
    defineField({
      name: 'edition',
      title: 'Edition',
      type: 'object',
      fields: [
        {
          name: 'current',
          title: 'Current Edition',
          type: 'number',
          validation: (Rule) => Rule.positive(),
        },
        {
          name: 'total',
          title: 'Total Editions',
          type: 'number',
          validation: (Rule) => Rule.positive(),
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0.image',
      year: 'year',
      medium: 'medium',
    },
    prepare(selection) {
      const { title, media, year, medium } = selection
      return {
        title,
        subtitle: `${year} • ${medium}`,
        media,
      }
    },
  },
})
