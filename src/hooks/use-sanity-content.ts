'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface SanityContent {
  [key: string]: any
}

interface UseSanityContentResult {
  content: SanityContent | null
  loading: boolean
  error: string | null
}

/**
 * Hook to fetch content from Sanity with real-time updates in development
 */
export function useSanityContent(query: string, params?: Record<string, any>): UseSanityContentResult {
  const [content, setContent] = useState<SanityContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        setError(null)

        // Check if Sanity is properly configured
        if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
          console.warn('Sanity not configured, using fallback data')
          setContent(null)
          setLoading(false)
          return
        }

        const result = await client.fetch(query, params)
        setContent(result)
      } catch (err) {
        console.error('Failed to fetch Sanity content:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchContent()

    // Set up real-time updates in development
    if (process.env.NODE_ENV === 'development') {
      const subscription = client.listen(query, params).subscribe({
        next: (update) => {
          if (update.result) {
            setContent(update.result)
          }
        },
        error: (err) => {
          console.error('Sanity subscription error:', err)
        }
      })

      return () => subscription.unsubscribe()
    }
  }, [query, params])

  return { content, loading, error }
}

/**
 * Hook to fetch portfolio settings
 */
export function usePortfolioSettings() {
  return useSanityContent(`
    *[_type == "portfolioSettings"][0] {
      siteName,
      tagline,
      description,
      contactEmail,
      socialMedia,
      seo,
      _id,
      _type
    }
  `)
}

/**
 * Hook to fetch artist profile
 */
export function useArtistProfile() {
  return useSanityContent(`
    *[_type == "artist"][0] {
      name,
      bio,
      profileImage,
      email,
      website,
      location,
      education,
      exhibitions,
      awards,
      _id,
      _type
    }
  `)
}

/**
 * Hook to fetch artworks
 */
export function useArtworks(limit?: number) {
  const query = `
    *[_type == "artwork"] | order(_createdAt desc) ${limit ? `[0...${limit}]` : ''} {
      _id,
      _type,
      title,
      slug,
      year,
      medium,
      category,
      dimensions,
      description,
      price,
      currency,
      status,
      featured,
      image,
      metadata
    }
  `
  
  return useSanityContent(query)
}

/**
 * Hook to fetch featured artworks
 */
export function useFeaturedArtworks() {
  return useSanityContent(`
    *[_type == "artwork" && featured == true] | order(_createdAt desc) {
      _id,
      _type,
      title,
      slug,
      year,
      medium,
      category,
      dimensions,
      description,
      price,
      currency,
      status,
      featured,
      image,
      metadata
    }
  `)
}

/**
 * Hook to fetch blog posts
 */
export function useBlogPosts(limit?: number) {
  const query = `
    *[_type == "blogPost"] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ''} {
      _id,
      _type,
      title,
      slug,
      excerpt,
      content,
      publishedAt,
      author,
      featuredImage,
      tags,
      seo
    }
  `
  
  return useSanityContent(query)
}

/**
 * Hook to fetch testimonials
 */
export function useTestimonials() {
  return useSanityContent(`
    *[_type == "testimonial"] | order(_createdAt desc) {
      _id,
      _type,
      clientName,
      testimonial,
      rating,
      date,
      projectType,
      featured
    }
  `)
}
