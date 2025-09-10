import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5ave8l4g'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-12-01'

// Validate required configuration
if (!projectId) {
  console.warn('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

// For authenticated requests (mutations)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export { projectId, dataset, apiVersion }

// Data fetching functions
export async function sanityFetch<T = any>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: any
  tags?: string[]
}): Promise<T> {
  try {
    return client.fetch<T>(query, params, {
      next: {
        tags,
      },
    })
  } catch (error) {
    console.warn('Sanity fetch error:', error)
    return null as T
  }
}

// Image URL builder
const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}
