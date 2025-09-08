import { Artwork, Artist } from '@/types';

/**
 * Generate structured data for an artwork
 */
export function generateArtworkStructuredData(artwork: Artwork) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: artwork.title,
    description: artwork.description,
    creator: {
      '@type': 'Person',
      name: 'Jennifer Watkins', // This would come from artist data
      url: 'https://jenniferwatkins.art/about'
    },
    dateCreated: artwork.year.toString(),
    artMedium: artwork.medium,
    artworkSurface: artwork.technicalDetails || artwork.medium,
    width: {
      '@type': 'QuantitativeValue',
      value: artwork.dimensions.width,
      unitCode: artwork.dimensions.unit.toUpperCase()
    },
    height: {
      '@type': 'QuantitativeValue',
      value: artwork.dimensions.height,
      unitCode: artwork.dimensions.unit.toUpperCase()
    },
    ...(artwork.dimensions.depth && {
      depth: {
        '@type': 'QuantitativeValue',
        value: artwork.dimensions.depth,
        unitCode: artwork.dimensions.unit.toUpperCase()
      }
    }),
    image: artwork.images.map(img => ({
      '@type': 'ImageObject',
      url: img.url,
      description: img.alt,
      width: img.width,
      height: img.height
    })),
    url: `https://jenniferwatkins.art/artwork/${artwork.slug}`,
    ...(artwork.price && artwork.status === 'available' && {
      offers: {
        '@type': 'Offer',
        price: artwork.price.amount,
        priceCurrency: artwork.price.currency,
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Person',
          name: 'Jennifer Watkins'
        }
      }
    }),
    ...(artwork.status === 'sold' && {
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/SoldOut'
      }
    }),
    genre: artwork.category,
    ...(artwork.series && {
      isPartOf: {
        '@type': 'CreativeWorkSeries',
        name: artwork.series
      }
    }),
    ...(artwork.edition && {
      copyrightNotice: `Edition ${artwork.edition.current} of ${artwork.edition.total}`
    }),
    keywords: [
      artwork.category,
      artwork.medium,
      'contemporary art',
      'original artwork',
      ...(artwork.series ? [artwork.series] : [])
    ].join(', ')
  };

  return structuredData;
}

/**
 * Generate structured data for artist profile
 */
export function generateArtistStructuredData(artist: Artist) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: artist.name,
    description: artist.bio,
    jobTitle: 'Contemporary Artist',
    url: 'https://jenniferwatkins.art',
    sameAs: [
      artist.socialMedia?.instagram,
      artist.socialMedia?.twitter,
      artist.socialMedia?.facebook
    ].filter(Boolean),
    nationality: artist.nationality,
    alumniOf: artist.education?.map(edu => ({
      '@type': 'EducationalOrganization',
      name: edu.institution,
      location: edu.location
    })),
    award: artist.awards?.map(award => award.title),
    knowsAbout: [
      'Contemporary Art',
      'Mixed Media',
      'Painting',
      'Digital Art',
      'Art Installation'
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Visual Artist',
      occupationLocation: {
        '@type': 'Place',
        name: artist.location
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://alexandrachen.art/about'
    }
  };

  return structuredData;
}

/**
 * Generate structured data for gallery/organization
 */
export function generateGalleryStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ArtGallery',
    name: 'Jennifer Watkins Art Portfolio',
    description: 'Contemporary art portfolio featuring original paintings, mixed media works, and digital art by Jennifer Watkins.',
    url: 'https://jenniferwatkins.art',
    logo: 'https://jenniferwatkins.art/logo.png',
    image: 'https://jenniferwatkins.art/gallery-hero.jpg',
    founder: {
      '@type': 'Person',
      name: 'Jennifer Watkins'
    },
    artMedium: [
      'Painting',
      'Mixed Media',
      'Digital Art',
      'Contemporary Art'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Artwork Collection',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'VisualArtwork',
            category: 'Original Artwork'
          }
        }
      ]
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@alexandrachen.art',
      availableLanguage: 'English'
    },
    sameAs: [
      'https://instagram.com/alexandrachen.art',
      'https://twitter.com/alexandrachen',
      'https://facebook.com/alexandrachen.art'
    ]
  };

  return structuredData;
}

/**
 * Generate structured data for exhibition
 */
export function generateExhibitionStructuredData(exhibition: any) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ExhibitionEvent',
    name: exhibition.title,
    description: exhibition.description,
    startDate: exhibition.startDate,
    endDate: exhibition.endDate,
    location: {
      '@type': 'Place',
      name: exhibition.venue,
      address: exhibition.location
    },
    organizer: {
      '@type': 'Organization',
      name: exhibition.venue
    },
    performer: {
      '@type': 'Person',
      name: 'Jennifer Watkins'
    },
    ...(exhibition.curator && {
      director: {
        '@type': 'Person',
        name: exhibition.curator
      }
    }),
    workFeatured: exhibition.artworks?.map((artwork: string) => ({
      '@type': 'VisualArtwork',
      name: artwork,
      creator: {
        '@type': 'Person',
        name: 'Jennifer Watkins'
      }
    })),
    eventStatus: exhibition.isUpcoming 
      ? 'https://schema.org/EventScheduled'
      : 'https://schema.org/EventPostponed',
    ...(exhibition.website && {
      url: exhibition.website
    })
  };

  return structuredData;
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };

  return structuredData;
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return structuredData;
}

/**
 * Helper function to inject structured data into page head
 */
export function injectStructuredData(data: any) {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }
}
