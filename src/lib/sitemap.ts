/**
 * Sitemap generation utilities for SEO
 */

export interface SitemapUrl {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    url: string;
    caption?: string;
    title?: string;
    license?: string;
  }>;
}

/**
 * Generate XML sitemap
 */
export function generateSitemap(urls: SitemapUrl[]): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jenniferwatkins.art';
  
  const urlElements = urls.map(urlData => {
    const { url, lastModified, changeFrequency, priority, images } = urlData;
    const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
    
    let urlElement = `
    <url>
      <loc>${escapeXml(fullUrl)}</loc>`;
    
    if (lastModified) {
      urlElement += `
      <lastmod>${lastModified.toISOString()}</lastmod>`;
    }
    
    if (changeFrequency) {
      urlElement += `
      <changefreq>${changeFrequency}</changefreq>`;
    }
    
    if (priority !== undefined) {
      urlElement += `
      <priority>${priority}</priority>`;
    }
    
    if (images && images.length > 0) {
      images.forEach(image => {
        urlElement += `
      <image:image>
        <image:loc>${escapeXml(image.url)}</image:loc>`;
        
        if (image.caption) {
          urlElement += `
        <image:caption>${escapeXml(image.caption)}</image:caption>`;
        }
        
        if (image.title) {
          urlElement += `
        <image:title>${escapeXml(image.title)}</image:title>`;
        }
        
        if (image.license) {
          urlElement += `
        <image:license>${escapeXml(image.license)}</image:license>`;
        }
        
        urlElement += `
      </image:image>`;
      });
    }
    
    urlElement += `
    </url>`;
    
    return urlElement;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${urlElements}
</urlset>`;
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jenniferwatkins.art';
  
  return `User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow important assets
Allow: /api/og/*
Allow: /_next/static/
Allow: /_next/image/

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`;
}

/**
 * Generate static page URLs for sitemap
 */
export function getStaticPageUrls(): SitemapUrl[] {
  return [
    {
      url: '/',
      changeFrequency: 'weekly',
      priority: 1.0,
      lastModified: new Date()
    },
    {
      url: '/about',
      changeFrequency: 'monthly',
      priority: 0.8,
      lastModified: new Date()
    },
    {
      url: '/portfolio',
      changeFrequency: 'weekly',
      priority: 0.9,
      lastModified: new Date()
    },
    {
      url: '/shop',
      changeFrequency: 'daily',
      priority: 0.8,
      lastModified: new Date()
    },
    {
      url: '/contact',
      changeFrequency: 'monthly',
      priority: 0.6,
      lastModified: new Date()
    },
    {
      url: '/exhibitions',
      changeFrequency: 'monthly',
      priority: 0.7,
      lastModified: new Date()
    }
  ];
}

/**
 * Generate artwork page URLs for sitemap
 */
export function getArtworkPageUrls(artworks: any[]): SitemapUrl[] {
  return artworks.map(artwork => ({
    url: `/artwork/${artwork.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: new Date(artwork.updatedAt || artwork.createdAt),
    images: artwork.images?.map((image: any) => ({
      url: image.url,
      caption: image.alt,
      title: artwork.title,
      license: `© ${new Date().getFullYear()} Jennifer Watkins. All rights reserved.`
    }))
  }));
}

/**
 * Generate category page URLs for sitemap
 */
export function getCategoryPageUrls(categories: string[]): SitemapUrl[] {
  return categories.map(category => ({
    url: `/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
    lastModified: new Date()
  }));
}

/**
 * Generate exhibition page URLs for sitemap
 */
export function getExhibitionPageUrls(exhibitions: any[]): SitemapUrl[] {
  return exhibitions.map(exhibition => ({
    url: `/exhibitions/${exhibition.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    lastModified: new Date(exhibition.updatedAt || exhibition.createdAt)
  }));
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

/**
 * Generate sitemap index for large sites
 */
export function generateSitemapIndex(sitemaps: Array<{ url: string; lastModified?: Date }>): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jenniferwatkins.art';
  
  const sitemapElements = sitemaps.map(sitemap => {
    const fullUrl = sitemap.url.startsWith('http') ? sitemap.url : `${siteUrl}${sitemap.url}`;
    
    let element = `
    <sitemap>
      <loc>${escapeXml(fullUrl)}</loc>`;
    
    if (sitemap.lastModified) {
      element += `
      <lastmod>${sitemap.lastModified.toISOString()}</lastmod>`;
    }
    
    element += `
    </sitemap>`;
    
    return element;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapElements}
</sitemapindex>`;
}

/**
 * Validate sitemap URL
 */
export function validateSitemapUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get sitemap priority based on page type
 */
export function getSitemapPriority(pageType: string): number {
  const priorities: Record<string, number> = {
    'homepage': 1.0,
    'portfolio': 0.9,
    'artwork': 0.7,
    'about': 0.8,
    'shop': 0.8,
    'category': 0.6,
    'exhibition': 0.6,
    'contact': 0.6,
    'blog': 0.5,
    'other': 0.4
  };
  
  return priorities[pageType] || 0.4;
}

/**
 * Get change frequency based on page type
 */
export function getChangeFrequency(pageType: string): SitemapUrl['changeFrequency'] {
  const frequencies: Record<string, SitemapUrl['changeFrequency']> = {
    'homepage': 'weekly',
    'portfolio': 'weekly',
    'artwork': 'monthly',
    'shop': 'daily',
    'category': 'weekly',
    'exhibition': 'monthly',
    'about': 'monthly',
    'contact': 'monthly',
    'blog': 'weekly',
    'other': 'monthly'
  };
  
  return frequencies[pageType] || 'monthly';
}
