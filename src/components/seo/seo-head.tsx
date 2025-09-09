import Head from 'next/head';
import { Artwork } from '@/types';
import { generateArtworkStructuredData, generateBreadcrumbStructuredData } from '@/lib/structured-data';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  artwork?: Artwork;
  breadcrumbs?: Array<{ name: string; url: string }>;
  noIndex?: boolean;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  artwork,
  breadcrumbs,
  noIndex = false,
  keywords = [],
  author = 'Jennifer Watkins',
  publishedTime,
  modifiedTime
}: SEOHeadProps) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jenniferwatkins.art';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  // Generate structured data
  const structuredData = [];
  
  if (artwork) {
    structuredData.push(generateArtworkStructuredData(artwork));
  }
  
  if (breadcrumbs) {
    structuredData.push(generateBreadcrumbStructuredData(breadcrumbs));
  }

  // Default keywords
  const defaultKeywords = [
    'contemporary art',
    'original artwork',
    'art portfolio',
    'Jennifer Watkins',
    'mixed media',
    'painting',
    'art gallery'
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullCanonical} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Jennifer Watkins Art Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@alexandrachen" />
      <meta name="twitter:site" content="@alexandrachen" />

      {/* Article specific meta tags */}
      {publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content={author} />
        </>
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* Artwork specific meta tags */}
      {artwork && (
        <>
          <meta property="product:price:amount" content={artwork.price?.amount.toString()} />
          <meta property="product:price:currency" content={artwork.price?.currency} />
          <meta property="product:availability" content={
            artwork.status === 'available' ? 'in stock' : 'out of stock'
          } />
          <meta property="product:condition" content="new" />
          <meta property="product:category" content={artwork.category} />
        </>
      )}

      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#D4A574" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />

      {/* Structured Data */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      {/* Additional Performance Hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="format-detection" content="date=no" />
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="email=no" />

      {/* Viewport for mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

      {/* PWA Meta Tags */}
      <meta name="application-name" content="Jennifer Watkins Art" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Jennifer Watkins Art" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#D4A574" />
      <meta name="msapplication-tap-highlight" content="no" />

      {/* Security Headers */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
    </Head>
  );
};

export default SEOHead;
