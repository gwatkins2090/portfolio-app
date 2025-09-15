import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Artist Name',
      type: 'string',
      description: '👤 Full name of the artist as it should appear throughout the website. Example: "Jennifer Watkins"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Full Biography',
      type: 'text',
      rows: 6,
      description: '📚 Complete artist biography that appears on the About page. Include background, education, artistic journey, and achievements.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'statement',
      title: 'Artist Statement',
      type: 'text',
      rows: 6,
      description: '🎨 Personal artistic philosophy and approach. This appears in the artist statement section and explains your creative process and inspiration.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Biography',
      type: 'text',
      rows: 3,
      description: '📝 Brief 2-3 sentence bio for homepage and artwork cards. Should capture the essence of your artistic practice.',
    }),
    defineField({
      name: 'aboutPageIntro',
      title: 'About Page Introduction',
      type: 'text',
      rows: 2,
      description: '🌟 Subtitle text that appears at the top of the About page, below the main heading. Sets the tone for the page.',
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'birthYear',
      title: 'Birth Year',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Current Location',
      type: 'object',
      fields: [
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'activeSince',
      title: 'Active Since (Year)',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'primaryMedium',
      title: 'Primary Medium',
      type: 'string',
      initialValue: 'Mixed Media',
    }),
    defineField({
      name: 'careerTimeline',
      title: 'Career Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'year',
              title: 'Year',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Milestone Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'institution',
              title: 'Institution',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'degree',
              title: 'Degree',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'field',
              title: 'Field of Study',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'startYear',
              title: 'Start Year',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'endYear',
              title: 'End Year',
              type: 'number',
            },
            {
              name: 'location',
              title: 'Location',
              type: 'object',
              fields: [
                {
                  name: 'city',
                  title: 'City',
                  type: 'string',
                },
                {
                  name: 'country',
                  title: 'Country',
                  type: 'string',
                },
              ],
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'exhibitions',
      title: 'Exhibition History',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Exhibition Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Solo', value: 'solo' },
                  { title: 'Group', value: 'group' },
                  { title: 'Online', value: 'online' },
                  { title: 'Art Fair', value: 'art-fair' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'venue',
              title: 'Venue',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'location',
              title: 'Location',
              type: 'object',
              fields: [
                {
                  name: 'city',
                  title: 'City',
                  type: 'string',
                },
                {
                  name: 'country',
                  title: 'Country',
                  type: 'string',
                },
              ],
            },
            {
              name: 'startDate',
              title: 'Start Date',
              type: 'date',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'endDate',
              title: 'End Date',
              type: 'date',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'curator',
              title: 'Curator',
              type: 'string',
            },
            {
              name: 'isUpcoming',
              title: 'Upcoming Exhibition',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'isFeatured',
              title: 'Featured Exhibition',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'awards',
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
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'organization',
              title: 'Organization',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'year',
              title: 'Year',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'category',
              title: 'Category',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'publications',
      title: 'Publications',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Publication Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Book', value: 'book' },
                  { title: 'Magazine', value: 'magazine' },
                  { title: 'Catalog', value: 'catalog' },
                  { title: 'Newspaper', value: 'newspaper' },
                  { title: 'Online', value: 'online' },
                  { title: 'Academic', value: 'academic' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'publisher',
              title: 'Publisher',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'year',
              title: 'Year',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'authors',
              title: 'Authors',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'isbn',
              title: 'ISBN',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Museums and collections that own the work',
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
        {
          name: 'behance',
          title: 'Behance',
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
          name: 'website',
          title: 'Website',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active Artist',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'profileImage',
      nationality: 'nationality',
    },
    prepare(selection) {
      const { title, media, nationality } = selection
      return {
        title,
        subtitle: nationality || 'Artist',
        media,
      }
    },
  },
})
