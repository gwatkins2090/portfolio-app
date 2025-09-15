'use client';

import { VisualEditing } from 'next-sanity';
import { useLiveMode } from '@sanity/react-loader';
import { client } from '@/lib/sanity/lib/client';
import { readToken } from '@/lib/sanity/lib/client-tokens';
import { useEffect, useState } from 'react';

export default function SanityVisualEditing() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Enable visual editing in draft mode or when in presentation mode
    const isDraftMode = document.cookie.includes('__prerender_bypass');
    const isPresentationMode = window.location.pathname.includes('/studio/presentation') ||
                              window.parent !== window; // iframe detection

    if (isDraftMode || isPresentationMode) {
      setIsEnabled(true);
    }
  }, []);

  useLiveMode({
    client: client.withConfig({
      perspective: 'previewDrafts',
      token: readToken,
      stega: {
        enabled: true,
        studioUrl: '/studio',
      },
    }),
    allowStudioOrigin: [
      'http://localhost:3000',
      'https://localhost:3000',
      window.location.origin
    ]
  });

  // Always render VisualEditing component for presentation mode to work
  return <VisualEditing />;
}
