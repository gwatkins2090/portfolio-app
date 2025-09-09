import { Artwork } from '@/types';

// Sample artwork data for development and demo purposes
export const sampleArtworks: Artwork[] = [
  {
    id: '1',
    title: 'Whispers of Dawn',
    description: 'A contemplative piece exploring the transition between night and day, capturing the ethereal moments when light first touches the horizon.',
    year: 2024,
    medium: 'oil-painting',
    category: 'abstract',
    dimensions: {
      width: 60,
      height: 80,
      unit: 'cm'
    },
    images: [
      {
        id: 'img-1',
        url: '/1.jpg',
        alt: 'Whispers of Dawn - Abstract painting with warm morning colors',
        width: 800,
        height: 1000,
        isMain: true
      }
    ],
    price: {
      amount: 2500,
      currency: 'USD'
    },
    status: 'available',
    artistNotes: 'This piece was inspired by early morning walks along the coast.',
    metadata: {
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
      featured: true,
      tags: ['abstract', 'morning', 'light', 'contemplative']
    },
    slug: 'whispers-of-dawn'
  },
  {
    id: '2',
    title: 'Urban Symphony',
    description: 'The rhythm and energy of city life captured in vibrant colors and dynamic forms.',
    year: 2023,
    medium: 'mixed-media',
    category: 'contemporary',
    dimensions: {
      width: 50,
      height: 70,
      unit: 'cm'
    },
    images: [
      {
        id: 'img-2',
        url: '/2.jpg',
        alt: 'Urban Symphony - Mixed media artwork depicting city energy',
        width: 800,
        height: 600,
        isMain: true
      }
    ],
    price: {
      amount: 1800,
      currency: 'USD'
    },
    status: 'available',
    artistNotes: 'Created during my residency in downtown Brooklyn.',
    metadata: {
      createdAt: '2023-08-20T00:00:00Z',
      updatedAt: '2023-08-20T00:00:00Z',
      featured: true,
      tags: ['urban', 'contemporary', 'mixed-media', 'energy']
    },
    slug: 'urban-symphony'
  },
  {
    id: '3',
    title: 'Solitude',
    description: 'An introspective study of human emotion and isolation in the modern world.',
    year: 2024,
    medium: 'acrylic-painting',
    category: 'portrait',
    dimensions: {
      width: 40,
      height: 60,
      unit: 'cm'
    },
    images: [
      {
        id: 'img-3',
        url: '/3.jpg',
        alt: 'Solitude - Acrylic portrait exploring human emotion',
        width: 800,
        height: 1200,
        isMain: true
      }
    ],
    status: 'sold',
    artistNotes: 'Part of my emotional landscapes series.',
    metadata: {
      createdAt: '2024-03-10T00:00:00Z',
      updatedAt: '2024-03-10T00:00:00Z',
      featured: false,
      tags: ['portrait', 'emotion', 'solitude', 'introspective']
    },
    slug: 'solitude'
  },
  {
    id: '4',
    title: 'Nature\'s Geometry',
    description: 'Finding mathematical beauty in organic forms and natural patterns.',
    year: 2023,
    medium: 'watercolor',
    category: 'nature',
    dimensions: {
      width: 35,
      height: 50,
      unit: 'cm'
    },
    images: [
      {
        id: 'img-4',
        url: '/4.jpg',
        alt: 'Nature\'s Geometry - Watercolor study of natural patterns',
        width: 800,
        height: 800,
        isMain: true
      }
    ],
    price: {
      amount: 1200,
      currency: 'USD'
    },
    status: 'available',
    artistNotes: 'Inspired by fractal patterns found in nature.',
    metadata: {
      createdAt: '2023-06-05T00:00:00Z',
      updatedAt: '2023-06-05T00:00:00Z',
      featured: false,
      tags: ['nature', 'geometry', 'patterns', 'watercolor']
    },
    slug: 'natures-geometry'
  },
  {
    id: '5',
    title: 'Digital Dreams',
    description: 'Exploring the intersection of technology and artistic expression in the digital age.',
    year: 2024,
    medium: 'digital-art',
    category: 'experimental',
    dimensions: {
      width: 70,
      height: 100,
      unit: 'cm'
    },
    images: [
      {
        id: 'img-5',
        url: '/5.jpg',
        alt: 'Digital Dreams - Contemporary digital artwork',
        width: 800,
        height: 1000,
        isMain: true
      }
    ],
    price: {
      amount: 3200,
      currency: 'USD'
    },
    status: 'reserved',
    artistNotes: 'Created using AI-assisted techniques and traditional composition.',
    metadata: {
      createdAt: '2024-02-28T00:00:00Z',
      updatedAt: '2024-02-28T00:00:00Z',
      featured: true,
      tags: ['digital', 'technology', 'experimental', 'contemporary']
    },
    slug: 'digital-dreams'
  },
  {
    id: '6',
    title: 'Coastal Memories',
    description: 'Capturing the eternal dance between sea and shore through color and movement.',
    year: 2023,
    medium: 'oil-painting',
    category: 'landscape',
    dimensions: {
      width: 80,
      height: 120,
      unit: 'cm'
    },
    images: [
      {
        id: 'img-6',
        url: '/6.jpg',
        alt: 'Coastal Memories - Oil painting of seascape',
        width: 800,
        height: 600,
        isMain: true
      }
    ],
    price: {
      amount: 4500,
      currency: 'USD'
    },
    status: 'available',
    artistNotes: 'Painted en plein air during my summer residency.',
    metadata: {
      createdAt: '2023-07-15T00:00:00Z',
      updatedAt: '2023-07-15T00:00:00Z',
      featured: true,
      tags: ['landscape', 'seascape', 'coastal', 'oil-painting']
    },
    slug: 'coastal-memories'
  }
];

// Featured artworks for hero section
export const featuredArtworks = sampleArtworks.filter(artwork => artwork.metadata.featured);

// Available artworks for shop
export const availableArtworks = sampleArtworks.filter(artwork => artwork.status === 'available');
