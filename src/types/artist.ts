// Artist and portfolio management types

import { ArtworkImage } from './artwork';

export interface Artist {
  id: string;
  name: string;
  bio: string;
  statement: string;
  profileImage?: ArtworkImage;
  coverImage?: ArtworkImage;
  birthYear?: number;
  nationality?: string;
  location?: {
    city: string;
    country: string;
  };
  education: Education[];
  exhibitions: ExhibitionHistory[];
  awards: Award[];
  publications: Publication[];
  collections: string[]; // Museums/collections that own the work
  socialMedia: SocialMediaLinks;
  contact: ContactInfo;
  website?: string;
  isActive: boolean;
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  location: {
    city: string;
    country: string;
  };
  description?: string;
}

export interface ExhibitionHistory {
  id: string;
  title: string;
  type: 'solo' | 'group' | 'online' | 'art-fair';
  venue: string;
  location: {
    city: string;
    country: string;
  };
  startDate: string;
  endDate?: string;
  description?: string;
  curator?: string;
  artworks?: string[]; // Array of artwork IDs
  isUpcoming: boolean;
  isFeatured: boolean;
  images?: ArtworkImage[];
  press?: string[]; // URLs to press coverage
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  description?: string;
  category?: string;
  amount?: {
    value: number;
    currency: string;
  };
  location?: {
    city: string;
    country: string;
  };
}

export interface Publication {
  id: string;
  title: string;
  type: 'book' | 'magazine' | 'catalog' | 'newspaper' | 'online' | 'academic';
  publisher: string;
  year: number;
  authors?: string[];
  description?: string;
  url?: string;
  isbn?: string;
  pages?: string;
  coverImage?: ArtworkImage;
}

export interface SocialMediaLinks {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  pinterest?: string;
  behance?: string;
  dribbble?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
  };
  studio?: {
    name: string;
    address: {
      street: string;
      city: string;
      state?: string;
      postalCode?: string;
      country: string;
    };
    phone?: string;
    visitingHours?: string;
    appointmentOnly: boolean;
  };
  gallery?: {
    name: string;
    contact: string;
    website?: string;
  };
}

// Portfolio configuration types
export interface PortfolioSettings {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  theme: PortfolioTheme;
  layout: PortfolioLayout;
  features: PortfolioFeatures;
  seo: SEOSettings;
  analytics: AnalyticsSettings;
  isPublished: boolean;
  customDomain?: string;
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface PortfolioTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: {
    heading: string;
    body: string;
  };
  borderRadius: number;
  spacing: 'compact' | 'normal' | 'spacious';
  darkMode: boolean;
}

export interface PortfolioLayout {
  headerStyle: 'minimal' | 'standard' | 'bold';
  navigationStyle: 'horizontal' | 'vertical' | 'hamburger';
  galleryLayout: 'masonry' | 'grid' | 'carousel' | 'fullscreen';
  showPrices: boolean;
  showDimensions: boolean;
  showMedium: boolean;
  showYear: boolean;
  enableZoom: boolean;
  enableLightbox: boolean;
  enableSlideshow: boolean;
}

export interface PortfolioFeatures {
  ecommerce: boolean;
  commissions: boolean;
  blog: boolean;
  newsletter: boolean;
  contactForm: boolean;
  socialMedia: boolean;
  exhibitions: boolean;
  cv: boolean;
  testimonials: boolean;
  guestbook: boolean;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: ArtworkImage;
  twitterCard: 'summary' | 'summary_large_image';
  structuredData: boolean;
  sitemap: boolean;
  robotsTxt: string;
}

export interface AnalyticsSettings {
  googleAnalytics?: string;
  googleTagManager?: string;
  facebookPixel?: string;
  hotjar?: string;
  customCode?: string;
  trackingEnabled: boolean;
  cookieConsent: boolean;
}

// Content management types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: ArtworkImage;
  tags: string[];
  category: string;
  isPublished: boolean;
  publishedAt?: string;
  metadata: {
    createdAt: string;
    updatedAt: string;
    views: number;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  image?: ArtworkImage;
  isPublished: boolean;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  interests: string[];
  isActive: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
}
