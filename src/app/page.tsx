'use client'

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/gallery/hero-section';
import GalleryGrid from '@/components/gallery/gallery-grid';
import ArtistStatement from '@/components/gallery/artist-statement';
import GalleryTransition from '@/components/gallery/gallery-transition';
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

        {/* Gallery Transition - Hidden on mobile */}
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

        {/* Featured Artworks Grid - Responsive for all screen sizes */}
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