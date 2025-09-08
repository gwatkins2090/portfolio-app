import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Eye, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shop Artworks | Jennifer Watkins - Buy Contemporary Art',
  description: 'Purchase original contemporary artworks by Jennifer Watkins. Browse paintings, mixed media pieces, and limited edition prints.',
  keywords: ['buy art', 'contemporary art for sale', 'Jennifer Watkins', 'original paintings', 'art shop'],
  openGraph: {
    title: 'Shop Artworks | Jennifer Watkins Contemporary Art',
    description: 'Purchase original contemporary artworks and limited edition prints by Jennifer Watkins.',
    type: 'website',
  },
};

// Sample shop data - in a real app, this would come from your data source
const featuredArtworks = [
  {
    id: 1,
    title: 'Urban Reflections III',
    medium: 'Oil on Canvas',
    dimensions: '24" x 36"',
    year: 2024,
    price: 2800,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=800&fit=crop',
    featured: true
  },
  {
    id: 2,
    title: 'Ethereal Landscapes II',
    medium: 'Mixed Media',
    dimensions: '18" x 24"',
    year: 2024,
    price: 1900,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop',
    featured: true
  },
  {
    id: 3,
    title: 'Abstract Emotions V',
    medium: 'Acrylic on Canvas',
    dimensions: '30" x 40"',
    year: 2023,
    price: 3200,
    status: 'sold',
    image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&h=800&fit=crop',
    featured: false
  },
  {
    id: 4,
    title: 'Color Study #7',
    medium: 'Oil on Panel',
    dimensions: '12" x 16"',
    year: 2024,
    price: 850,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=800&fit=crop',
    featured: false
  },
  {
    id: 5,
    title: 'Liminal Space I',
    medium: 'Mixed Media',
    dimensions: '20" x 30"',
    year: 2024,
    price: 2200,
    status: 'reserved',
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=800&fit=crop',
    featured: true
  },
  {
    id: 6,
    title: 'Digital Dreams',
    medium: 'Digital Print (Limited Edition)',
    dimensions: '16" x 20"',
    year: 2024,
    price: 450,
    status: 'available',
    image: 'https://images.unsplash.com/photo-1551913902-c92207136625?w=600&h=800&fit=crop',
    featured: false
  }
];

const categories = [
  { name: 'All Artworks', count: featuredArtworks.length },
  { name: 'Paintings', count: 4 },
  { name: 'Mixed Media', count: 3 },
  { name: 'Prints', count: 2 },
  { name: 'Available', count: featuredArtworks.filter(a => a.status === 'available').length }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(price);
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'available':
      return <Badge className="bg-sage-green text-white">Available</Badge>;
    case 'sold':
      return <Badge variant="destructive">Sold</Badge>;
    case 'reserved':
      return <Badge className="bg-gallery-gold text-off-black">Reserved</Badge>;
    default:
      return null;
  }
};

const ArtworkCard = ({ artwork }: { artwork: any }) => (
  <Card className="group hover:shadow-lg transition-all duration-300">
    <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
      <Image
        src={artwork.image}
        alt={artwork.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      
      {/* Overlay Actions */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Status Badge */}
      <div className="absolute top-4 left-4">
        {getStatusBadge(artwork.status)}
      </div>
    </div>
    
    <CardContent className="p-6">
      <div className="space-y-3">
        <div>
          <h3 className="font-serif text-lg font-semibold text-foreground">
            {artwork.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {artwork.medium} • {artwork.year}
          </p>
          <p className="text-xs text-muted-foreground">
            {artwork.dimensions}
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-foreground">
            {formatPrice(artwork.price)}
          </span>
          {artwork.status === 'available' && (
            <Button size="sm" className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 gallery-wall">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 tracking-tight">
                Shop Artworks
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Discover and purchase original contemporary artworks, from intimate studies 
                to large-scale pieces that will transform your space.
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Categories */}
        <section className="py-8 border-b border-border">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                    className={index === 0 ? "bg-gallery-gold hover:bg-gallery-gold/90 text-off-black" : ""}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>
              
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter & Sort
              </Button>
            </div>
          </div>
        </section>

        {/* Artworks Grid */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} />
              ))}
            </div>
          </div>
        </section>

        {/* Commission CTA */}
        <section className="py-16 bg-sage-green/5 dark:bg-sage-green/10">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Don&apos;t See What You&apos;re Looking For?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                I accept commissions for custom artworks. Whether you have a specific vision 
                or want to collaborate on something unique, let&apos;s create something special together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black" asChild>
                  <Link href="/contact">Commission Artwork</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/portfolio">View Full Portfolio</Link>
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

export default ShopPage;
