import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import GalleryGrid from '@/components/gallery/gallery-grid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Calendar, Palette, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Portfolio | Jennifer Watkins - Contemporary Art Collection',
  description: 'Explore the complete portfolio of Jennifer Watkins featuring contemporary paintings, mixed media works, and digital art pieces.',
  keywords: ['art portfolio', 'contemporary art', 'Jennifer Watkins', 'paintings', 'mixed media', 'digital art'],
  openGraph: {
    title: 'Art Portfolio | Jennifer Watkins',
    description: 'Discover the complete collection of contemporary artworks by Jennifer Watkins.',
    type: 'website',
  },
};

// Sample portfolio data - in a real app, this would come from your data source
const portfolioStats = [
  { label: 'Total Artworks', value: '50+', icon: Palette },
  { label: 'Years Active', value: '6+', icon: Calendar },
  { label: 'Gallery Views', value: '10K+', icon: Eye },
];

const portfolioCategories = [
  {
    id: 'paintings',
    title: 'Paintings',
    description: 'Oil and acrylic works exploring color, form, and emotion',
    count: 25,
    featured: true
  },
  {
    id: 'mixed-media',
    title: 'Mixed Media',
    description: 'Experimental pieces combining traditional and contemporary techniques',
    count: 18,
    featured: true
  },
  {
    id: 'metalwork',
    title: 'Metalwork',
    description: 'Sculptural pieces and mixed media incorporating metal elements',
    count: 12,
    featured: true
  },
  {
    id: 'fiberwork',
    title: 'Fiberwork',
    description: 'Textile art and fiber-based contemporary works',
    count: 15,
    featured: true
  }
];

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-20 gallery-wall">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-foreground mb-4 md:mb-6 tracking-tight">
                Complete Portfolio
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6 md:mb-8 max-w-3xl mx-auto">
                A comprehensive collection of contemporary artworks spanning multiple mediums and artistic explorations.
              </p>

              {/* Portfolio Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto">
                {portfolioStats.map((stat, index) => (
                  <Card key={index}>
                    <CardContent className="p-3 sm:p-4 text-center">
                      <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 mx-auto mb-2 text-primary" />
                      <div className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Categories */}
        <section className="py-16 bg-sage-green/5 dark:bg-sage-green/10">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Explore by Category
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse the collection organized by medium and artistic approach
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {portfolioCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-foreground text-sm sm:text-base">{category.title}</h3>
                      {category.featured && (
                        <Badge variant="outline" className="text-xs">Featured</Badge>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm font-medium text-primary">
                        {category.count} pieces
                      </span>
                      <Button size="sm" variant="outline" className="text-xs sm:text-sm" asChild>
                        <Link href={`/portfolio/${category.id}`}>
                          View Collection
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Artworks Grid */}
        <section className="py-16">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Featured Artworks
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A curated selection of standout pieces from the complete portfolio
              </p>
            </div>
            
            <GalleryGrid />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gallery-gold/10 dark:bg-gallery-gold/5">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Interested in a Piece?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Many artworks are available for purchase or commission. Get in touch to discuss 
                pricing, availability, or to commission a custom piece.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black" asChild>
                  <Link href="/shop">Shop Artworks</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Commission a Piece</Link>
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

export default PortfolioPage;
