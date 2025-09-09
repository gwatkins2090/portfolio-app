import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/gallery/hero-section';
import GalleryGrid from '@/components/gallery/gallery-grid';
import ArtistStatement from '@/components/gallery/artist-statement';
import GalleryTransition from '@/components/gallery/gallery-transition';
import MobileGallery from '@/components/mobile/mobile-gallery';
import { sampleArtworks } from '@/lib/sample-data';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section with Featured Artwork Slideshow */}
        <HeroSection />

        {/* Mobile Gallery - Visible on small screens */}
        <section className="md:hidden py-8 px-4 bg-background">
          <div className="container max-w-sm mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Featured Collection
              </h2>
              <p className="text-base text-muted-foreground">
                Swipe to explore our latest artworks
              </p>
            </div>
            <MobileGallery
              artworks={sampleArtworks.slice(0, 4)}
              className="mobile-optimized"
            />
          </div>
        </section>

        {/* Desktop Gallery Transition - Hidden on mobile */}
        <div className="hidden md:block">
          <GalleryTransition
            title="Enter the Gallery"
            subtitle="Discover a curated collection of contemporary artworks that explore the boundaries between traditional and modern artistic expression."
          >
            <div />
          </GalleryTransition>
        </div>

        {/* Desktop Featured Artworks Grid - Hidden on mobile */}
        <div className="hidden md:block">
          <GalleryGrid
            title="Featured Collection"
            subtitle="A selection of recent works showcasing diverse mediums and artistic approaches."
          />
        </div>

        {/* Artist Statement Section */}
        <ArtistStatement />

        {/* Final Gallery Transition */}
        <GalleryTransition
          title="Continue Exploring"
          subtitle="Visit our complete portfolio to discover more artworks, learn about upcoming exhibitions, and explore commission opportunities."
          backgroundColor="bg-dusty-rose/10 dark:bg-dusty-rose/5"
        >
          <div />
        </GalleryTransition>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;