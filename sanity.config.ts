'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool, defineLocations } from 'sanity/presentation';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId, projectTitle } from './src/lib/sanity/env';
import { schema } from './src/lib/sanity/schemaTypes';
import { structure } from './src/lib/sanity/structure';
import { generatePreviewUrl } from './src/components/sanity/PreviewLink';

export default defineConfig({
  name: 'jennifer-watkins-portfolio',
  title: projectTitle,

  basePath: '/studio',
  projectId,
  dataset,

  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        draftMode: {
          enable: '/api/draft',
        },
      },
      resolve: {
        mainDocuments: defineLocations({
          select: {
            title: 'title',
            slug: 'slug.current',
          },
          resolve: (doc) => ({
            locations: [
              {
                title: doc?.title || 'Untitled',
                href: `/${doc?.slug || ''}`,
              },
            ],
          }),
        }),
      },
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  document: {
    // Remove 'Settings' from new document options, since it's a singleton
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId !== 'portfolioSettings');
      }
      return prev;
    },
    // Removes the "duplicate" action on the Settings singleton
    actions: (prev, { schemaType }) => {
      if (schemaType === 'portfolioSettings') {
        return prev.filter(({ action }) => action && action !== 'duplicate');
      }
      return prev;
    },
  },
});
