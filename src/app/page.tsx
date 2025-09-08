import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/gallery/hero-section';
import GalleryGrid from '@/components/gallery/gallery-grid';
import ArtistStatement from '@/components/gallery/artist-statement';
import GalleryTransition from '@/components/gallery/gallery-transition';
import MobileGallery from '@/components/mobile/mobile-gallery';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section with Featured Artwork Slideshow */}
        <HeroSection />

        {/* Mobile Gallery - Visible on small screens */}
        <section className="md:hidden py-12 bg-background">
          <div className="container px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                Featured Collection
              </h2>
              <p className="text-lg text-muted-foreground">
                Swipe to explore our latest artworks
              </p>
            </div>
            <MobileGallery
              artworks={[]} // This would be populated with actual artwork data
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