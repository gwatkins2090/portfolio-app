'use client';

import { VisualEditing } from 'next-sanity';
import { useLiveMode } from '@sanity/react-loader';
import { client } from '@/lib/sanity/lib/client';
import { readToken } from '@/lib/sanity/lib/tokens';

export default function SanityVisualEditing() {
  useLiveMode({
    client: client.withConfig({
      perspective: 'previewDrafts',
      token: readToken,
      stega: {
        enabled: true,
        studioUrl: '/studio',
      },
    }),
    allowStudioOrigin: '/studio'
  });
  return <VisualEditing />;
}
