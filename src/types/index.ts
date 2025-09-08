// Main types export file for the art portfolio

// Artwork types
export type {
  Artwork,
  ArtworkImage,
  ArtworkDimensions,
  ArtworkPrice,
  ArtworkStatus,
  ArtworkMedium,
  ArtworkCategory,
  ArtworkMetadata,
  ArtworkCollection,
  Exhibition,
  ArtworkFilters,
  ArtworkSearchParams,
  ArtworkSearchResult,
  GalleryLayout,
  GallerySection,
  GalleryRoom,
} from './artwork';

// Commerce types
export type {
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
  ShippingMethod,
  ShippingAddress,
  BillingAddress,
  ShippingOption,
  CartItem,
  Cart,
  PaymentDetails,
  Order,
  Customer,
  Commission,
  Inquiry,
  SalesAnalytics,
  InventoryItem,
} from './commerce';

// Artist types
export type {
  Artist,
  Education,
  ExhibitionHistory,
  Award,
  Publication,
  SocialMediaLinks,
  ContactInfo,
  PortfolioSettings,
  PortfolioTheme,
  PortfolioLayout,
  PortfolioFeatures,
  SEOSettings,
  AnalyticsSettings,
  BlogPost,
  Testimonial,
  NewsletterSubscriber,
} from './artist';

// Common utility types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  artworkId?: string;
  phone?: string;
  preferredContact: 'email' | 'phone';
}

export interface CommissionFormData {
  name: string;
  email: string;
  phone?: string;
  title: string;
  description: string;
  medium: string;
  dimensions?: {
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  budget?: {
    min: number;
    max: number;
  };
  deadline?: string;
  referenceImages?: File[];
  additionalNotes?: string;
}

export interface NewsletterFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  interests: string[];
}

// UI state types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface ModalState {
  isOpen: boolean;
  type?: 'artwork' | 'contact' | 'commission' | 'cart' | 'checkout';
  data?: any;
}

export interface FilterState {
  category: string[];
  medium: string[];
  priceRange: {
    min: number;
    max: number;
  };
  yearRange: {
    min: number;
    max: number;
  };
  status: string[];
  tags: string[];
}

export interface SortState {
  field: 'title' | 'year' | 'price' | 'created' | 'updated';
  direction: 'asc' | 'desc';
}

// Animation and interaction types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface ScrollTriggerConfig {
  threshold: number;
  rootMargin: string;
  triggerOnce: boolean;
}

export interface GalleryViewConfig {
  layout: string;
  itemsPerPage: number;
  showFilters: boolean;
  showSort: boolean;
  enableInfiniteScroll: boolean;
  enableLightbox: boolean;
  enableZoom: boolean;
}

// SEO and metadata types
export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

// Event types for analytics
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

// Theme and styling types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  error: string;
  warning: string;
  success: string;
}

export interface BreakpointConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}
