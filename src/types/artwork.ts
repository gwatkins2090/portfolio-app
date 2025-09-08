// Core artwork types for the art portfolio

export interface ArtworkImage {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  isMain?: boolean;
  caption?: string;
}

export interface ArtworkDimensions {
  width: number;
  height: number;
  depth?: number;
  unit: 'cm' | 'in' | 'mm';
}

export interface ArtworkPrice {
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP';
  isNegotiable?: boolean;
  originalPrice?: number; // For sale items
}

export type ArtworkStatus = 'available' | 'sold' | 'reserved' | 'not-for-sale' | 'on-loan';
export type ArtworkMedium = 
  | 'oil-painting'
  | 'acrylic-painting'
  | 'watercolor'
  | 'digital-art'
  | 'mixed-media'
  | 'sculpture'
  | 'photography'
  | 'drawing'
  | 'printmaking'
  | 'collage'
  | 'installation'
  | 'other';

export type ArtworkCategory = 
  | 'abstract'
  | 'landscape'
  | 'portrait'
  | 'still-life'
  | 'figurative'
  | 'conceptual'
  | 'contemporary'
  | 'experimental'
  | 'nature'
  | 'urban'
  | 'other';

export interface ArtworkMetadata {
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  views?: number;
  likes?: number;
  shares?: number;
  featured?: boolean;
  tags: string[];
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  year: number;
  medium: ArtworkMedium;
  category: ArtworkCategory;
  dimensions: ArtworkDimensions;
  images: ArtworkImage[];
  price?: ArtworkPrice;
  status: ArtworkStatus;
  artistNotes?: string;
  technicalDetails?: string;
  inspiration?: string;
  series?: string;
  edition?: {
    current: number;
    total: number;
  };
  metadata: ArtworkMetadata;
  slug: string;
}

export interface ArtworkCollection {
  id: string;
  title: string;
  description: string;
  slug: string;
  artworks: string[]; // Array of artwork IDs
  coverImage?: ArtworkImage;
  year?: number;
  isPublished: boolean;
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface Exhibition {
  id: string;
  title: string;
  description: string;
  slug: string;
  startDate: string;
  endDate?: string;
  location?: {
    name: string;
    address: string;
    city: string;
    country: string;
  };
  artworks: string[]; // Array of artwork IDs
  coverImage?: ArtworkImage;
  isVirtual: boolean;
  isPublished: boolean;
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
}

// Filter and search types
export interface ArtworkFilters {
  category?: ArtworkCategory[];
  medium?: ArtworkMedium[];
  status?: ArtworkStatus[];
  priceRange?: {
    min: number;
    max: number;
  };
  yearRange?: {
    min: number;
    max: number;
  };
  tags?: string[];
  series?: string[];
}

export interface ArtworkSearchParams {
  query?: string;
  filters?: ArtworkFilters;
  sortBy?: 'title' | 'year' | 'price' | 'created' | 'updated' | 'views';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ArtworkSearchResult {
  artworks: Artwork[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Gallery display types
export type GalleryLayout = 'masonry' | 'grid' | 'list' | 'carousel' | 'featured';

export interface GallerySection {
  id: string;
  title: string;
  description?: string;
  layout: GalleryLayout;
  artworks: string[]; // Array of artwork IDs
  backgroundColor?: string;
  textColor?: string;
}

export interface GalleryRoom {
  id: string;
  name: string;
  description?: string;
  sections: GallerySection[];
  theme?: {
    backgroundColor: string;
    accentColor: string;
    lighting: 'warm' | 'cool' | 'neutral';
  };
}
