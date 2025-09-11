'use client';

import { VisualEditing } from 'next-sanity';
import { useLiveMode } from '@sanity/react-loader';

export default function SanityVisualEditing() {
  useLiveMode({ allowStudioOrigin: true });
  return <VisualEditing />;
}
