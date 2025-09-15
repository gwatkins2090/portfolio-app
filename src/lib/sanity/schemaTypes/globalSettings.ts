import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'globalSettings',
  title: 'Global Settings',
  type: 'document',
  icon: () => '🌐',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      description: '🌐 The name of your website. This appears in the browser tab and throughout the site.',
      validation: (Rule) => Rule.required(),
      initialValue: 'Jennifer Watkins Art',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: '📝 Brief description of your website for search engines and social media.',
      validation: (Rule) => Rule.required().max(160),
      initialValue: 'Contemporary art portfolio showcasing original paintings and artwork by Jennifer Watkins.',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: '🔗 The main URL of your website (e.g., https://jenniferwatkins.art)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'header',
      title: '🔝 Header Settings',
      type: 'object',
      description: 'Configure the site header and navigation',
      fields: [
        {
          name: 'logo',
          title: 'Logo',
          type: 'image',
          description: '🎨 Site logo (optional - will use site name if not provided)',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'logoText',
          title: 'Logo Text',
          type: 'string',
          description: '📝 Text to display as logo (if no image logo is provided)',
          initialValue: 'Jennifer Watkins',
        },
        {
          name: 'navigation',
          title: 'Navigation Menu',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Menu Label',
                  type: 'string',
                  description: '📝 Text to display in the navigation menu',
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                  description: '🔗 Where this menu item should link to',
                },
                {
                  name: 'openInNewTab',
                  title: 'Open in New Tab',
                  type: 'boolean',
                  description: '🔗 Whether this link should open in a new tab',
                  initialValue: false,
                },
              ],
            },
          ],
          description: '🧭 Main navigation menu items',
          initialValue: [
            { label: 'Home', url: '/', openInNewTab: false },
            { label: 'Portfolio', url: '/portfolio', openInNewTab: false },
            { label: 'Exhibitions', url: '/exhibitions', openInNewTab: false },
            { label: 'Shop', url: '/shop', openInNewTab: false },
            { label: 'About', url: '/about', openInNewTab: false },
            { label: 'Contact', url: '/contact', openInNewTab: false },
          ],
        },
        {
          name: 'ctaButton',
          title: 'Header CTA Button',
          type: 'object',
          description: '🔘 Optional call-to-action button in the header',
          fields: [
            {
              name: 'text',
              title: 'Button Text',
              type: 'string',
              description: '📝 Text for the CTA button',
            },
            {
              name: 'url',
              title: 'Button URL',
              type: 'string',
              description: '🔗 Where the button should link to',
            },
            {
              name: 'style',
              title: 'Button Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Outline', value: 'outline' },
                ],
              },
              initialValue: 'primary',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'footer',
      title: '🔽 Footer Settings',
      type: 'object',
      description: 'Configure the site footer content',
      fields: [
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          description: '© Copyright notice for the footer',
          initialValue: '© 2024 Jennifer Watkins. All rights reserved.',
        },
        {
          name: 'description',
          title: 'Footer Description',
          type: 'text',
          rows: 2,
          description: '📝 Brief description or tagline for the footer',
          initialValue: 'Contemporary artist exploring the boundaries between traditional and modern expression.',
        },
        {
          name: 'quickLinks',
          title: 'Quick Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Link Label',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                },
              ],
            },
          ],
          description: '🔗 Additional links to display in the footer',
          initialValue: [
            { label: 'Privacy Policy', url: '/privacy' },
            { label: 'Terms of Service', url: '/terms' },
            { label: 'Shipping Info', url: '/shipping' },
          ],
        },
        {
          name: 'socialMedia',
          title: 'Social Media Links',
          type: 'object',
          description: '📱 Social media profiles for the footer',
          fields: [
            {
              name: 'instagram',
              title: 'Instagram URL',
              type: 'url',
            },
            {
              name: 'facebook',
              title: 'Facebook URL',
              type: 'url',
            },
            {
              name: 'twitter',
              title: 'Twitter URL',
              type: 'url',
            },
            {
              name: 'linkedin',
              title: 'LinkedIn URL',
              type: 'url',
            },
          ],
        },
        {
          name: 'newsletter',
          title: 'Newsletter Signup',
          type: 'object',
          description: '📧 Newsletter subscription section',
          fields: [
            {
              name: 'enabled',
              title: 'Enable Newsletter Signup',
              type: 'boolean',
              description: '📧 Show newsletter signup in footer',
              initialValue: true,
            },
            {
              name: 'title',
              title: 'Newsletter Title',
              type: 'string',
              description: '📧 Heading for newsletter signup',
              initialValue: 'Stay Updated',
            },
            {
              name: 'description',
              title: 'Newsletter Description',
              type: 'text',
              rows: 2,
              description: '📝 Text encouraging newsletter signup',
              initialValue: 'Get notified about new artworks, exhibitions, and studio updates.',
            },
            {
              name: 'buttonText',
              title: 'Subscribe Button Text',
              type: 'string',
              description: '🔘 Text for the subscribe button',
              initialValue: 'Subscribe',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: '🔍 Global SEO Settings',
      type: 'object',
      description: 'Default SEO settings that apply site-wide',
      fields: [
        {
          name: 'defaultMetaTitle',
          title: 'Default Meta Title',
          type: 'string',
          description: '📝 Default title for pages without specific SEO settings',
          validation: (Rule) => Rule.max(60),
          initialValue: 'Jennifer Watkins - Contemporary Artist',
        },
        {
          name: 'defaultMetaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 3,
          description: '📝 Default description for pages without specific SEO settings',
          validation: (Rule) => Rule.max(160),
          initialValue: 'Contemporary art portfolio showcasing original paintings and artwork by Jennifer Watkins.',
        },
        {
          name: 'defaultKeywords',
          title: 'Default Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: '🏷️ Default keywords for SEO',
          options: {
            layout: 'tags',
          },
          initialValue: ['contemporary art', 'paintings', 'Jennifer Watkins', 'artist', 'portfolio'],
        },
        {
          name: 'defaultOgImage',
          title: 'Default Social Media Image',
          type: 'image',
          description: '📷 Default image for social media sharing',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'favicon',
          title: 'Favicon',
          type: 'image',
          description: '🔖 Small icon that appears in browser tabs',
          options: {
            accept: '.ico,.png,.svg',
          },
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: '📊 Analytics & Tracking',
      type: 'object',
      description: 'Configure website analytics and tracking',
      fields: [
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: '📊 Google Analytics tracking ID (e.g., GA-XXXXXXXXX)',
        },
        {
          name: 'googleTagManagerId',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: '🏷️ Google Tag Manager container ID (e.g., GTM-XXXXXXX)',
        },
        {
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
          description: '📘 Facebook Pixel ID for tracking',
        },
      ],
    }),
    defineField({
      name: 'maintenance',
      title: '🚧 Maintenance Mode',
      type: 'object',
      description: 'Configure maintenance mode settings',
      fields: [
        {
          name: 'enabled',
          title: 'Enable Maintenance Mode',
          type: 'boolean',
          description: '🚧 Put the site in maintenance mode',
          initialValue: false,
        },
        {
          name: 'title',
          title: 'Maintenance Title',
          type: 'string',
          description: '🚧 Title to show during maintenance',
          initialValue: 'Site Under Maintenance',
        },
        {
          name: 'message',
          title: 'Maintenance Message',
          type: 'text',
          rows: 3,
          description: '📝 Message to show visitors during maintenance',
          initialValue: 'We\'re currently updating the site to bring you an even better experience. Please check back soon!',
        },
        {
          name: 'estimatedCompletion',
          title: 'Estimated Completion',
          type: 'datetime',
          description: '⏰ When maintenance is expected to be complete',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'siteDescription',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: title || 'Global Settings',
        subtitle: subtitle || 'Configure site-wide settings and content',
      }
    },
  },
})
