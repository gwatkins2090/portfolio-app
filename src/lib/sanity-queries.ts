import { groq } from 'next-sanity'

// Artwork Queries
export const artworkQuery = groq`
  *[_type == "artwork" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    year,
    medium,
    category,
    dimensions,
    images[] {
      _key,
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      alt,
      caption,
      isMain
    },
    price,
    status,
    artistNotes,
    technicalDetails,
    inspiration,
    series,
    edition,
    tags,
    featured,
    _createdAt,
    _updatedAt
  }
`

export const artworksQuery = groq`
  *[_type == "artwork"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    year,
    medium,
    category,
    dimensions,
    images[0] {
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      alt,
      isMain
    },
    price,
    status,
    featured,
    _createdAt
  }
`

export const featuredArtworksQuery = groq`
  *[_type == "artwork" && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    title,
    slug,
    description,
    year,
    medium,
    category,
    dimensions,
    images[0] {
      image {
        asset-> {
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      alt,
      isMain
    },
    price,
    status,
    featured,
    _createdAt
  }
`

// Artist Queries
export const artistQuery = groq`
  *[_type == "artist" && isActive == true][0] {
    _id,
    name,
    bio,
    statement,
    profileImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    birthYear,
    nationality,
    location,
    education,
    exhibitions,
    awards,
    publications,
    collections,
    socialMedia,
    contact,
    _createdAt,
    _updatedAt
  }
`

// Exhibition Queries
export const exhibitionsQuery = groq`
  *[_type == "exhibition" && isPublished == true] | order(startDate desc) {
    _id,
    title,
    slug,
    description,
    startDate,
    endDate,
    location,
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    isVirtual,
    virtualUrl,
    isFeatured,
    curator,
    _createdAt
  }
`

export const featuredExhibitionsQuery = groq`
  *[_type == "exhibition" && isPublished == true && isFeatured == true] | order(startDate desc) [0...3] {
    _id,
    title,
    slug,
    description,
    startDate,
    endDate,
    location,
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    isVirtual,
    virtualUrl,
    curator,
    _createdAt
  }
`

// Collection Queries
export const collectionsQuery = groq`
  *[_type == "collection" && isPublished == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    year,
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    artworks[] -> {
      _id,
      title,
      slug,
      images[0] {
        image {
          asset-> {
            _id,
            url
          }
        },
        alt
      }
    },
    isFeatured,
    tags,
    _createdAt
  }
`

// Blog Queries
export const blogPostsQuery = groq`
  *[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    publishedAt,
    author-> {
      name,
      profileImage {
        asset-> {
          _id,
          url
        }
      }
    },
    categories,
    tags,
    isFeatured,
    _createdAt
  }
`

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    publishedAt,
    author-> {
      name,
      bio,
      profileImage {
        asset-> {
          _id,
          url
        }
      }
    },
    categories,
    tags,
    relatedArtworks[]-> {
      _id,
      title,
      slug,
      images[0] {
        image {
          asset-> {
            _id,
            url
          }
        },
        alt
      }
    },
    seo,
    _createdAt,
    _updatedAt
  }
`

// Testimonial Queries
export const testimonialsQuery = groq`
  *[_type == "testimonial" && isPublished == true] | order(date desc) {
    _id,
    name,
    title,
    company,
    testimonial,
    rating,
    photo {
      asset-> {
        _id,
        url
      }
    },
    artworkPurchased-> {
      title,
      slug
    },
    date,
    isFeatured,
    category,
    _createdAt
  }
`

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && isPublished == true && isFeatured == true] | order(date desc) [0...3] {
    _id,
    name,
    title,
    company,
    testimonial,
    rating,
    photo {
      asset-> {
        _id,
        url
      }
    },
    date,
    category,
    _createdAt
  }
`

// Portfolio Settings Query
export const portfolioSettingsQuery = groq`
  *[_type == "portfolioSettings"][0] {
    _id,
    title,
    description,
    logo {
      asset-> {
        _id,
        url
      }
    },
    favicon {
      asset-> {
        _id,
        url
      }
    },
    primaryArtist-> {
      name,
      bio,
      statement,
      profileImage {
        asset-> {
          _id,
          url
        }
      }
    },
    featuredArtworks[]-> {
      _id,
      title,
      slug,
      images[0] {
        image {
          asset-> {
            _id,
            url
          }
        },
        alt
      }
    },
    heroSection,
    socialMedia,
    contact,
    ecommerce,
    seo,
    analytics,
    _createdAt,
    _updatedAt
  }
`
