import { groq } from 'next-sanity';

// Portfolio Settings
export const queryPortfolioSettings = groq`
  *[_type == "portfolioSettings"][0] {
    _id,
    _type,
    siteName,
    tagline,
    description,
    contactEmail,
    socialMedia,
    seo,
    heroSection,
    _updatedAt
  }
`;

// Artworks
export const queryAllArtworks = groq`
  *[_type == "artwork"] | order(createdDate desc) {
    _id,
    _type,
    title,
    slug,
    description,
    medium,
    dimensions,
    year,
    price,
    availability,
    featured,
    images[] {
      asset->,
      alt,
      caption
    },
    collection->,
    tags,
    createdDate,
    _updatedAt
  }
`;

export const queryFeaturedArtworks = groq`
  *[_type == "artwork" && featured == true] | order(createdDate desc) {
    _id,
    _type,
    title,
    slug,
    description,
    medium,
    dimensions,
    year,
    price,
    availability,
    featured,
    images[] {
      asset->,
      alt,
      caption
    },
    collection->,
    tags,
    createdDate,
    _updatedAt
  }
`;

export const queryArtworkBySlug = groq`
  *[_type == "artwork" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    description,
    medium,
    dimensions,
    year,
    price,
    availability,
    featured,
    images[] {
      asset->,
      alt,
      caption
    },
    collection->,
    tags,
    createdDate,
    _updatedAt
  }
`;

// Collections
export const queryAllCollections = groq`
  *[_type == "collection"] | order(title asc) {
    _id,
    _type,
    title,
    slug,
    description,
    coverImage {
      asset->,
      alt
    },
    artworks[]-> {
      _id,
      title,
      slug,
      images[0] {
        asset->,
        alt
      }
    },
    _updatedAt
  }
`;

// Exhibitions
export const queryAllExhibitions = groq`
  *[_type == "exhibition"] | order(startDate desc) {
    _id,
    _type,
    title,
    slug,
    description,
    venue,
    location,
    startDate,
    endDate,
    type,
    featured,
    images[] {
      asset->,
      alt,
      caption
    },
    artworks[]-> {
      _id,
      title,
      slug,
      images[0] {
        asset->,
        alt
      }
    },
    _updatedAt
  }
`;

// Artist Profile
export const queryArtistProfile = groq`
  *[_type == "artist"][0] {
    _id,
    _type,
    name,
    bio,
    statement,
    profileImage {
      asset->,
      alt
    },
    education,
    exhibitions,
    awards,
    publications,
    contactInfo,
    socialMedia,
    _updatedAt
  }
`;

// Blog Posts
export const queryAllBlogPosts = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    featured,
    coverImage {
      asset->,
      alt
    },
    tags,
    _updatedAt
  }
`;

// Testimonials
export const queryAllTestimonials = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    _type,
    name,
    role,
    company,
    content,
    rating,
    featured,
    image {
      asset->,
      alt
    },
    _updatedAt
  }
`;
