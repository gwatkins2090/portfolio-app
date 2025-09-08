import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Palette, Home, Mail, Search } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className='flex min-h-[80vh] flex-col items-center justify-center gallery-wall'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center gap-8 text-center max-w-4xl mx-auto'>
            {/* Art-themed 404 */}
            <div className="relative">
              <div className="flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-gallery-gold to-terracotta shadow-2xl mb-6">
                <Palette className="h-16 w-16 text-warm-white" />
              </div>
              <h1 className='font-serif text-6xl md:text-8xl font-bold tracking-tighter text-foreground mb-4'>404</h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
                Artwork Not Found
              </h2>
              <p className='max-w-[700px] text-muted-foreground md:text-xl leading-relaxed'>
                It seems this piece has been moved to a different gallery or is no longer on display.
              </p>
              <p className='max-w-[600px] text-muted-foreground'>
                Don&apos;t worry - there&apos;s plenty more art to discover in our collection.
              </p>
            </div>

            {/* Navigation Cards */}
            <div className="grid md:grid-cols-3 gap-6 w-full max-w-3xl mt-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Home className="h-8 w-8 mx-auto mb-4 text-gallery-gold" />
                  <h3 className="font-semibold mb-2">Gallery Home</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Return to the main gallery and explore featured artworks
                  </p>
                  <Button asChild size="sm" className="w-full">
                    <Link href='/'>Visit Gallery</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Search className="h-8 w-8 mx-auto mb-4 text-sage-green" />
                  <h3 className="font-semibold mb-2">Browse Portfolio</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Discover the complete collection of contemporary artworks
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href='/portfolio'>View Portfolio</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 mx-auto mb-4 text-dusty-rose" />
                  <h3 className="font-semibold mb-2">Get in Touch</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Have questions or looking for something specific?
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href='/contact'>Contact Artist</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Links */}
            <div className="mt-8 text-sm text-muted-foreground">
              <p>Popular sections:</p>
              <div className="flex flex-wrap justify-center gap-4 mt-2">
                <Link href="/about" className="hover:text-primary transition-colors">About the Artist</Link>
                <span>•</span>
                <Link href="/exhibitions" className="hover:text-primary transition-colors">Exhibitions</Link>
                <span>•</span>
                <Link href="/shop" className="hover:text-primary transition-colors">Shop Artworks</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
