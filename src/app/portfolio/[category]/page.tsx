import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import GalleryGrid from '@/components/gallery/gallery-grid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, Filter } from 'lucide-react';
import { sampleArtworks } from '@/lib/sample-data';
import { Artwork } from '@/types';

// Transform Artwork data to GalleryGrid format
function transformArtworkForGallery(artwork: Artwork) {
  return {
    id: artwork.id,
    title: artwork.title,
    year: artwork.year,
    medium: artwork.medium,
    dimensions: `${artwork.dimensions.width} × ${artwork.dimensions.height} ${artwork.dimensions.unit}`,
    price: artwork.price?.amount,
    currency: artwork.price?.currency,
    image: artwork.images?.[0]?.url || '/placeholder-artwork.svg',
    category: artwork.category,
    status: artwork.status as 'available' | 'sold' | 'reserved',
    description: artwork.description
  };
}

// Define valid categories
const validCategories = {
  'paintings': {
    title: 'Paintings',
    description: 'Oil and acrylic works exploring color, form, and emotion',
    longDescription: 'This collection showcases a diverse range of paintings created with traditional and contemporary techniques. Each piece explores the relationship between color, form, and emotional expression, drawing inspiration from both classical traditions and modern artistic movements.'
  },
  'mixed-media': {
    title: 'Mixed Media',
    description: 'Experimental pieces combining traditional and contemporary techniques',
    longDescription: 'These innovative works push the boundaries of traditional art-making by combining various materials and techniques. From collage elements to found objects, each piece tells a unique story through the marriage of different artistic mediums.'
  },
  'metalwork': {
    title: 'Metalwork',
    description: 'Sculptural pieces and mixed media incorporating metal elements',
    longDescription: 'Exploring the industrial beauty of metal, these works incorporate various metallic elements to create both sculptural pieces and mixed media artworks. The collection demonstrates the versatility of metal as an artistic medium.'
  },
  'fiberwork': {
    title: 'Fiberwork',
    description: 'Textile art and fiber-based contemporary works',
    longDescription: 'This collection celebrates the rich tradition of fiber arts while pushing into contemporary territory. Using various textile techniques and materials, these works explore texture, pattern, and the tactile nature of art.'
  }
};

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryInfo = validCategories[category as keyof typeof validCategories];
  
  if (!categoryInfo) {
    return {
      title: 'Category Not Found | Jennifer Watkins Portfolio'
    };
  }

  return {
    title: `${categoryInfo.title} | Jennifer Watkins Portfolio`,
    description: categoryInfo.description,
    keywords: ['Jennifer Watkins', 'art portfolio', categoryInfo.title.toLowerCase(), 'contemporary art'],
    openGraph: {
      title: `${categoryInfo.title} Collection | Jennifer Watkins`,
      description: categoryInfo.description,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(validCategories).map((category) => ({
    category,
  }));
}

const CategoryPage = async ({ params }: PageProps) => {
  const { category } = await params;
  const categoryInfo = validCategories[category as keyof typeof validCategories];
  
  if (!categoryInfo) {
    notFound();
  }

  // Filter artworks by category (for now using sample data)
  // In a real app, this would filter based on the category from your CMS
  const categoryArtworks = sampleArtworks.filter(artwork => {
    // Map sample artwork categories to our new categories
    const categoryMapping: { [key: string]: string[] } = {
      'paintings': ['painting', 'oil-painting', 'acrylic'],
      'mixed-media': ['mixed-media', 'collage'],
      'metalwork': ['sculpture', 'installation', 'metal'],
      'fiberwork': ['textile', 'fiber', 'fabric']
    };

    const mappedCategories = categoryMapping[category] || [category];
    return mappedCategories.some(cat =>
      artwork.category?.toLowerCase().includes(cat) ||
      artwork.medium?.toLowerCase().includes(cat)
    );
  });

  // If no specific artworks found, show a subset of sample artworks
  const filteredArtworks = categoryArtworks.length > 0 ? categoryArtworks : sampleArtworks.slice(0, 8);

  // Transform artworks to the format expected by GalleryGrid
  const artworksToShow = filteredArtworks.map(transformArtworkForGallery);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-20 gallery-wall">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
                <Link href="/portfolio" className="hover:text-foreground transition-colors">
                  Portfolio
                </Link>
                <span>/</span>
                <span className="text-foreground">{categoryInfo.title}</span>
              </div>

              {/* Back Button */}
              <Button variant="ghost" size="sm" className="mb-6" asChild>
                <Link href="/portfolio">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Portfolio
                </Link>
              </Button>

              {/* Category Header */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Badge variant="outline" className="text-sm">
                    {artworksToShow.length} pieces
                  </Badge>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4 md:mb-6 tracking-tight">
                  {categoryInfo.title}
                </h1>
                
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6 max-w-3xl mx-auto">
                  {categoryInfo.description}
                </p>

                <div className="max-w-2xl mx-auto">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {categoryInfo.longDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Artworks Grid */}
        <section className="py-16">
          <div className="container px-4">
            {artworksToShow.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                    Collection
                  </h2>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
                
                <GalleryGrid 
                  title=""
                  subtitle=""
                  artworks={artworksToShow}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-6">
                  No artworks found in this category yet.
                </p>
                <Button asChild>
                  <Link href="/portfolio">
                    Browse All Artworks
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gallery-gold/10 dark:bg-gallery-gold/5">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Interested in These Works?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Many pieces from this collection are available for purchase. 
                Contact us to inquire about pricing and availability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black" asChild>
                  <Link href="/shop">Shop Artworks</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Artist</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
