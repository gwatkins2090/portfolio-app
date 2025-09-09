import { writeClient } from './sanity'
import { sampleArtworks } from './sample-data'

// Migration utility to move existing data to Sanity
export async function migrateArtworksToSanity() {
  try {
    console.log('Starting artwork migration to Sanity...')
    
    const artworkDocuments = sampleArtworks.map((artwork, index) => ({
      _type: 'artwork',
      _id: `artwork-${artwork.id}`,
      title: artwork.title,
      slug: {
        _type: 'slug',
        current: artwork.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      },
      description: `${artwork.medium} artwork created in ${artwork.year}`,
      year: artwork.year,
      medium: mapMediumToSanity(artwork.medium),
      category: 'contemporary',
      dimensions: {
        width: artwork.dimensions.width,
        height: artwork.dimensions.height,
        depth: artwork.dimensions.depth,
        unit: artwork.dimensions.unit
      },
      images: [{
        _key: `image-${index}-0`,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: `image-${artwork.id}` // This would need to be uploaded first
          }
        },
        alt: artwork.title,
        caption: `${artwork.title} by Jennifer Watkins`,
        isMain: true
      }],
      price: {
        amount: artwork.price,
        currency: 'USD',
        isNegotiable: false
      },
      status: artwork.status,
      artistNotes: `Original ${artwork.medium.toLowerCase()} piece showcasing contemporary artistic expression.`,
      technicalDetails: `Created using traditional ${artwork.medium.toLowerCase()} techniques on canvas.`,
      inspiration: 'Inspired by the interplay of light, color, and emotion in everyday moments.',
      featured: artwork.metadata?.featured || false,
      tags: [artwork.medium.toLowerCase(), 'contemporary', 'original'],
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString()
    }))

    // Create documents in Sanity
    const result = await Promise.all(
      artworkDocuments.map(doc => writeClient.createOrReplace(doc))
    )
    console.log('Artwork migration completed:', result)
    
    return result
  } catch (error) {
    console.error('Error migrating artworks:', error)
    throw error
  }
}

// Helper function to map medium values
function mapMediumToSanity(medium: string): string {
  const mediumMap: Record<string, string> = {
    'Oil Painting': 'oil-painting',
    'Acrylic Painting': 'acrylic-painting',
    'Watercolor': 'watercolor',
    'Digital Art': 'digital-art',
    'Mixed Media': 'mixed-media',
    'Sculpture': 'sculpture',
    'Photography': 'photography',
    'Drawing': 'drawing',
    'Printmaking': 'printmaking',
    'Collage': 'collage',
    'Installation': 'installation'
  }
  
  return mediumMap[medium] || 'other'
}

// Create artist profile
export async function createArtistProfile() {
  try {
    console.log('Creating artist profile in Sanity...')
    
    const artistDocument = {
      _type: 'artist',
      _id: 'jennifer-watkins',
      name: 'Jennifer Watkins',
      bio: 'Jennifer Watkins is a contemporary artist whose work explores the intersection of traditional techniques and modern expression. With a focus on capturing the essence of light and emotion, her paintings invite viewers into a world of contemplative beauty and artistic sophistication.',
      statement: 'My art is a dialogue between the seen and the felt, the tangible and the ethereal. Through careful attention to color, composition, and texture, I seek to create works that resonate on both an aesthetic and emotional level. Each piece is an invitation to pause, reflect, and find beauty in the complexity of human experience.',
      birthYear: 1985,
      nationality: 'American',
      location: {
        city: 'New York',
        country: 'United States'
      },
      education: [
        {
          institution: 'Rhode Island School of Design',
          degree: 'Master of Fine Arts',
          field: 'Painting',
          startYear: 2008,
          endYear: 2010,
          location: {
            city: 'Providence',
            country: 'United States'
          },
          description: 'Focused on contemporary painting techniques and art theory'
        },
        {
          institution: 'Yale University',
          degree: 'Bachelor of Fine Arts',
          field: 'Studio Art',
          startYear: 2004,
          endYear: 2008,
          location: {
            city: 'New Haven',
            country: 'United States'
          },
          description: 'Comprehensive study in fine arts with emphasis on painting and drawing'
        }
      ],
      exhibitions: [
        {
          title: 'Contemporary Visions',
          type: 'group',
          venue: 'Modern Art Gallery',
          location: {
            city: 'New York',
            country: 'United States'
          },
          startDate: '2023-09-15',
          endDate: '2023-11-30',
          description: 'Group exhibition featuring emerging contemporary artists',
          isUpcoming: false,
          isFeatured: true
        },
        {
          title: 'Light and Shadow',
          type: 'solo',
          venue: 'Chelsea Art Space',
          location: {
            city: 'New York',
            country: 'United States'
          },
          startDate: '2023-03-01',
          endDate: '2023-04-15',
          description: 'Solo exhibition exploring the interplay of light and shadow in contemporary painting',
          isUpcoming: false,
          isFeatured: true
        }
      ],
      awards: [
        {
          title: 'Emerging Artist Award',
          organization: 'Contemporary Art Foundation',
          year: 2023,
          description: 'Recognition for outstanding contribution to contemporary painting',
          category: 'Painting'
        }
      ],
      collections: [
        'Private collections throughout the United States',
        'Corporate collections in New York and California'
      ],
      socialMedia: {
        instagram: 'https://instagram.com/jenniferwatkinsart',
        facebook: 'https://facebook.com/jenniferwatkinsart'
      },
      contact: {
        email: 'jennifer@jenniferwatkinsart.com',
        phone: '+1 (555) 123-4567',
        website: 'https://jenniferwatkinsart.com'
      },
      isActive: true,
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString()
    }

    const result = await writeClient.createOrReplace(artistDocument)
    console.log('Artist profile created:', result)
    
    return result
  } catch (error) {
    console.error('Error creating artist profile:', error)
    throw error
  }
}

// Create portfolio settings
export async function createPortfolioSettings() {
  try {
    console.log('Creating portfolio settings in Sanity...')
    
    const settingsDocument = {
      _type: 'portfolioSettings',
      _id: 'portfolioSettings',
      title: 'Jennifer Watkins Art Portfolio',
      description: 'Contemporary art portfolio showcasing original paintings and artwork by Jennifer Watkins. Explore a sophisticated collection of contemporary pieces available for purchase.',
      heroSection: {
        title: 'Jennifer Watkins',
        subtitle: 'Contemporary Artist & Painter',
        ctaText: 'Explore Gallery',
        ctaLink: '/portfolio'
      },
      socialMedia: {
        instagram: 'https://instagram.com/jenniferwatkinsart',
        facebook: 'https://facebook.com/jenniferwatkinsart'
      },
      contact: {
        email: 'jennifer@jenniferwatkinsart.com',
        phone: '+1 (555) 123-4567',
        address: {
          city: 'New York',
          state: 'NY',
          country: 'United States'
        }
      },
      ecommerce: {
        currency: 'USD',
        taxRate: 8.5,
        shippingRates: {
          domestic: 25,
          international: 75,
          freeShippingThreshold: 500
        },
        paymentMethods: ['credit-card', 'paypal']
      },
      seo: {
        metaTitle: 'Jennifer Watkins Art Portfolio | Contemporary Paintings',
        metaDescription: 'Explore contemporary paintings and artwork by Jennifer Watkins. Original pieces available for purchase with worldwide shipping.',
        keywords: ['contemporary art', 'paintings', 'Jennifer Watkins', 'original artwork', 'art for sale']
      },
      _createdAt: new Date().toISOString(),
      _updatedAt: new Date().toISOString()
    }

    const result = await writeClient.createOrReplace(settingsDocument)
    console.log('Portfolio settings created:', result)
    
    return result
  } catch (error) {
    console.error('Error creating portfolio settings:', error)
    throw error
  }
}

// Run all migrations
export async function runAllMigrations() {
  try {
    console.log('Starting complete migration to Sanity...')
    
    await createArtistProfile()
    await createPortfolioSettings()
    await migrateArtworksToSanity()
    
    console.log('All migrations completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  }
}
