'use client';

import { VisualEditing } from 'next-sanity';
import { useLiveMode } from '@sanity/react-loader';
import { client } from '@/lib/sanity/lib/client';

export default function SanityVisualEditing() {
  useLiveMode({
    client: client.withConfig({
      perspective: 'previewDrafts',
    }),
    allowStudioOrigin: '/studio'
  });
  return <VisualEditing />;
}
