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

// NEW PAGE-SPECIFIC QUERIES

// Global Settings Query
export const globalSettingsQuery = groq`
  *[_type == "globalSettings"][0] {
    _id,
    siteName,
    siteDescription,
    siteUrl,
    header {
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
      logoText,
      navigation,
      ctaButton
    },
    footer {
      copyrightText,
      description,
      quickLinks,
      socialMedia,
      newsletter
    },
    seo {
      defaultMetaTitle,
      defaultMetaDescription,
      defaultKeywords,
      defaultOgImage {
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
      }
    },
    analytics,
    maintenance
  }
`;

// Homepage Settings Query
export const homepageSettingsQuery = groq`
  *[_type == "homepageSettings"][0] {
    _id,
    title,
    description,
    heroSection,
    galleryTransition,
    featuredCollection,
    artistStatement,
    continueExploring,
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

// About Page Settings Query
export const aboutPageSettingsQuery = groq`
  *[_type == "aboutPageSettings"][0] {
    _id,
    title,
    description,
    heroSection,
    biographySection {
      title,
      content,
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
      imageCaption
    },
    philosophySection,
    educationSection,
    exhibitionSection {
      title,
      subtitle,
      featuredExhibitions[]-> {
        _id,
        title,
        venue,
        location,
        startDate,
        endDate,
        description,
        type
      }
    },
    awardsSection,
    contactCta,
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

// Portfolio Page Settings Query
export const portfolioPageSettingsQuery = groq`
  *[_type == "portfolioPageSettings"][0] {
    _id,
    title,
    description,
    heroSection,
    portfolioStats,
    categoriesSection,
    featuredSection {
      title,
      subtitle,
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
      }
    },
    callToAction,
    filterSettings,
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

// Contact Page Settings Query
export const contactPageSettingsQuery = groq`
  *[_type == "contactPageSettings"][0] {
    _id,
    title,
    description,
    heroSection,
    contactForm,
    inquiryTypes,
    contactInfo,
    socialMedia,
    studioVisits,
    commissions,
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

// NEW COMBINED PAGE DATA QUERIES

// New Homepage Data Query (using new schema)
export const newHomepageDataQuery = groq`
  {
    "homepageSettings": *[_type == "homepageSettings"][0] {
      _id,
      title,
      description,
      heroSection,
      galleryTransition,
      featuredCollection,
      artistStatement,
      continueExploring,
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
      seo
    },
    "globalSettings": *[_type == "globalSettings"][0] {
      _id,
      siteName,
      header,
      footer,
      seo
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
    }
  }
`;

// New About Page Data Query (using new schema)
export const newAboutPageDataQuery = groq`
  {
    "aboutPageSettings": *[_type == "aboutPageSettings"][0] {
      _id,
      title,
      description,
      heroSection,
      biographySection,
      philosophySection,
      educationSection,
      exhibitionSection,
      awardsSection,
      contactCta,
      seo
    },
    "globalSettings": *[_type == "globalSettings"][0] {
      _id,
      siteName,
      header,
      footer,
      seo
    },
    "artist": *[_type == "artist" && isActive == true][0] {
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
      education,
      exhibitions,
      awards,
      contact
    }
  }
`;

// New Portfolio Page Data Query (using new schema)
export const newPortfolioPageDataQuery = groq`
  {
    "portfolioPageSettings": *[_type == "portfolioPageSettings"][0] {
      _id,
      title,
      description,
      heroSection,
      portfolioStats,
      categoriesSection,
      featuredSection,
      callToAction,
      filterSettings,
      seo
    },
    "globalSettings": *[_type == "globalSettings"][0] {
      _id,
      siteName,
      header,
      footer,
      seo
    },
    "artworks": *[_type == "artwork"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      year,
      medium,
      category,
      description,
      featured,
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

// New Contact Page Data Query (using new schema)
export const newContactPageDataQuery = groq`
  {
    "contactPageSettings": *[_type == "contactPageSettings"][0] {
      _id,
      title,
      description,
      heroSection,
      contactForm,
      inquiryTypes,
      contactInfo,
      socialMedia,
      studioVisits,
      commissions,
      seo
    },
    "globalSettings": *[_type == "globalSettings"][0] {
      _id,
      siteName,
      header,
      footer,
      seo
    },
    "artist": *[_type == "artist" && isActive == true][0] {
      _id,
      name,
      contact
    }
  }
`;
