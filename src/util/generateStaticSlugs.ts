import 'server-only';
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity/lib/client';
import { readToken as token } from '@/lib/sanity/lib/tokens';

export async function generateStaticSlugs(type: string) {
  return client
    .withConfig({
      token,
      perspective: 'published',
      useCdn: false,
    })
    .fetch<Array<{ slug: string }>>(
      groq`*[_type == $type && defined(slug.current)][].slug.current`,
      { type }
    );
}

// Specific functions for each content type
export async function getArtworkSlugs() {
  return generateStaticSlugs('artwork');
}

export async function getCollectionSlugs() {
  return generateStaticSlugs('collection');
}

export async function getExhibitionSlugs() {
  return generateStaticSlugs('exhibition');
}

export async function getBlogPostSlugs() {
  return generateStaticSlugs('blogPost');
}
