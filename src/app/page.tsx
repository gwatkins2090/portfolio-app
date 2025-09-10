'use client'

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/gallery/hero-section';
import GalleryGrid from '@/components/gallery/gallery-grid';
import ArtistStatement from '@/components/gallery/artist-statement';
import GalleryTransition from '@/components/gallery/gallery-transition';
import MobileGallery from '@/components/mobile/mobile-gallery';
import { sampleArtworks } from '@/lib/sample-data';
import { EditableContent, EditableText } from '@/components/sanity/editable-content';
import { usePortfolioSettings, useFeaturedArtworks } from '@/hooks/use-sanity-content';

const HomePage = () => {
  const { content: settings } = usePortfolioSettings()
  const { content: featuredArtworks } = useFeaturedArtworks()

  // Use Sanity content if available, otherwise fall back to static content
  const artworksToShow = featuredArtworks && featuredArtworks.length > 0
    ? featuredArtworks
    : sampleArtworks

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section with Featured Artwork Slideshow */}
        <EditableContent
          documentId={settings?._id}
          documentType="portfolioSettings"
          fieldPath="heroSection"
        >
          <HeroSection />
        </EditableContent>

        {/* Mobile Gallery - Visible on small screens */}
        <section className="md:hidden py-8 px-4 bg-background">
          <div className="container max-w-sm mx-auto">
            <EditableContent
              documentId={settings?._id}
              documentType="portfolioSettings"
              fieldPath="mobileGallery"
              className="text-center mb-6"
            >
              <div className="text-center mb-6">
                <EditableText
                  text="Featured Collection"
                  documentId={settings?._id}
                  documentType="portfolioSettings"
                  fieldPath="mobileGallery.title"
                  as="h2"
                  className="text-2xl font-serif font-bold text-foreground mb-3"
                />
                <EditableText
                  text="Swipe to explore our latest artworks"
                  documentId={settings?._id}
                  documentType="portfolioSettings"
                  fieldPath="mobileGallery.subtitle"
                  as="p"
                  className="text-base text-muted-foreground"
                />
              </div>
            </EditableContent>
            <MobileGallery
              artworks={artworksToShow.slice(0, 4)}
              className="mobile-optimized"
            />
          </div>
        </section>

        {/* Desktop Gallery Transition - Hidden on mobile */}
        <div className="hidden md:block">
          <EditableContent
            documentId={settings?._id}
            documentType="portfolioSettings"
            fieldPath="galleryTransition1"
          >
            <GalleryTransition
              title="Enter the Gallery"
              subtitle="Discover a curated collection of contemporary artworks that explore the boundaries between traditional and modern artistic expression."
            >
              <div />
            </GalleryTransition>
          </EditableContent>
        </div>

        {/* Desktop Featured Artworks Grid - Hidden on mobile */}
        <div className="hidden md:block">
          <EditableContent
            documentId={settings?._id}
            documentType="portfolioSettings"
            fieldPath="featuredCollection"
          >
            <GalleryGrid
              title="Featured Collection"
              subtitle="A selection of recent works showcasing diverse mediums and artistic approaches."
            />
          </EditableContent>
        </div>

        {/* Artist Statement Section */}
        <EditableContent
          documentId={settings?._id}
          documentType="portfolioSettings"
          fieldPath="artistStatement"
        >
          <ArtistStatement />
        </EditableContent>

        {/* Final Gallery Transition */}
        <EditableContent
          documentId={settings?._id}
          documentType="portfolioSettings"
          fieldPath="galleryTransition2"
        >
          <GalleryTransition
            title="Continue Exploring"
            subtitle="Visit our complete portfolio to discover more artworks, learn about upcoming exhibitions, and explore commission opportunities."
            backgroundColor="bg-dusty-rose/10 dark:bg-dusty-rose/5"
          >
            <div />
          </GalleryTransition>
        </EditableContent>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;