import { groq } from 'next-sanity';

// Portfolio Settings Queries
export const portfolioSettingsQuery = groq`
  *[_type == "portfolioSettings"][0] {
    _id,
    title,
    description,
    logo {
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
    heroSection {
      title,
      subtitle,
      description,
      backgroundImage {
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
      ctaText,
      ctaLink,
      secondaryCtaText,
      secondaryCtaLink
    },
    galleryTransition {
      title,
      subtitle
    },
    artistStatement {
      title,
      quote,
      paragraphs,
      achievements {
        artworksCount,
        exhibitionsCount,
        awardsCount
      }
    },
    featuredArtworks[]-> {
      _id,
      title,
      slug,
      year,
      medium,
      description,
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
        alt
      }
    },
    socialMedia {
      instagram,
      twitter,
      facebook,
      linkedin,
      youtube,
      pinterest
    },
    contact {
      email,
      phone,
      address {
        street,
        city,
        state,
        zipCode,
        country
      }
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage {
        asset-> {
          _id,
          url
        }
      }
    }
  }
`;

// Artist Profile Queries
export const artistProfileQuery = groq`
  *[_type == "artist" && isActive == true][0] {
    _id,
    name,
    bio,
    shortBio,
    statement,
    aboutPageIntro,
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
    location {
      city,
      country
    },
    activeSince,
    primaryMedium,
    education[] {
      institution,
      degree,
      field,
      startYear,
      endYear,
      location {
        city,
        country
      },
      description
    },
    careerTimeline[] {
      year,
      title,
      description
    },
    exhibitions[] {
      title,
      type,
      venue,
      location {
        city,
        country
      },
      startDate,
      endDate,
      description,
      curator,
      isUpcoming,
      isFeatured
    },
    awards[] {
      title,
      organization,
      year,
      description,
      category
    },
    publications[] {
      title,
      type,
      publisher,
      year,
      authors,
      description,
      url,
      isbn
    },
    collections,
    socialMedia {
      instagram,
      twitter,
      facebook,
      linkedin,
      youtube,
      pinterest,
      behance
    },
    contact {
      email,
      phone,
      website
    }
  }
`;

// Featured Artworks Query
export const featuredArtworksQuery = groq`
  *[_type == "artwork" && featured == true] | order(_createdAt desc) [0...6] {
    _id,
    title,
    slug,
    year,
    medium,
    description,
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
      alt
    }
  }
`;

// Homepage Data Query (combines multiple queries)
export const homepageDataQuery = groq`
  {
    "settings": *[_type == "portfolioSettings"][0] {
      _id,
      title,
      description,
      heroSection,
      galleryTransition,
      artistStatement,
      socialMedia,
      contact
    },
    "artist": *[_type == "artist" && isActive == true][0] {
      _id,
      name,
      shortBio,
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
      }
    },
    "featuredArtworks": *[_type == "artwork" && featured == true] | order(_createdAt desc) [0...6] {
      _id,
      title,
      slug,
      year,
      medium,
      description,
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
        alt
      }
    }
  }
`;

// About Page Data Query
export const aboutPageDataQuery = groq`
  {
    "artist": *[_type == "artist" && isActive == true][0] {
      _id,
      name,
      bio,
      statement,
      aboutPageIntro,
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
      birthYear,
      nationality,
      location,
      activeSince,
      primaryMedium,
      education,
      careerTimeline,
      exhibitions,
      awards,
      contact
    },
    "settings": *[_type == "portfolioSettings"][0] {
      _id,
      contact,
      socialMedia
    }
  }
`;

// Contact Page Data Query
export const contactPageDataQuery = groq`
  {
    "settings": *[_type == "portfolioSettings"][0] {
      _id,
      contact,
      socialMedia
    },
    "artist": *[_type == "artist" && isActive == true][0] {
      _id,
      name,
      contact
    }
  }
`;
