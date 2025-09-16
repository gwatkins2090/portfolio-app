import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/gallery/hero-section';
import GalleryGrid from '@/components/gallery/gallery-grid';
import ArtistStatement from '@/components/gallery/artist-statement';
import GalleryTransition from '@/components/gallery/gallery-transition';
import { getHomepageData, getNewHomepageData } from '@/lib/sanity/fetch';
import { sampleArtworks } from '@/lib/sample-data';
import { VisualEditingWrapper } from '@/components/sanity/visual-editing-wrapper';

// Generate metadata - simplified for build stability
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Jennifer Watkins - Contemporary Artist',
    description: 'Contemporary art portfolio showcasing original paintings and artwork by Jennifer Watkins.',
    keywords: ['contemporary art', 'paintings', 'Jennifer Watkins', 'artist'],
    openGraph: {
      title: 'Jennifer Watkins - Contemporary Artist',
      description: 'Contemporary art portfolio showcasing original paintings and artwork by Jennifer Watkins.',
      type: 'website',
    },
  };
}

const HomePage = async () => {
  // Fetch data from Sanity - try new schema first, fallback to legacy
  let data;
  let isNewSchema = false;

  try {
    // Try new page-specific schema first
    data = await getNewHomepageData();
    isNewSchema = true;
  } catch {
    try {
      // Fallback to legacy schema
      const legacyData = await getHomepageData();
      data = {
        homepageSettings: legacyData.settings,
        globalSettings: null,
        artist: legacyData.artist,
        featuredArtworks: legacyData.featuredArtworks
      };
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      data = { homepageSettings: null, globalSettings: null, artist: null, featuredArtworks: [] };
    }
  }

  const { homepageSettings, artist } = data;

  // Get featured artworks from homepage settings or fallback
  const featuredArtworks = isNewSchema
    ? homepageSettings?.featuredArtworks
    : (data as { featuredArtworks?: any[] }).featuredArtworks;

  // Use Sanity content if available, otherwise fall back to static content
  const artworksToShow = featuredArtworks && featuredArtworks.length > 0
    ? featuredArtworks
    : sampleArtworks;

  // For backward compatibility, create a settings object that works with existing components
  const settings = homepageSettings;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section with Featured Artwork Slideshow */}
        <VisualEditingWrapper
          documentId={settings?._id}
          documentType={isNewSchema ? "homepageSettings" : "portfolioSettings"}
          fieldPath="heroSection"
        >
          <HeroSection
            settings={settings}
            featuredArtworks={artworksToShow}
          />
        </VisualEditingWrapper>

        {/* Gallery Transition - Hidden on mobile */}
        <div className="hidden md:block">
          <VisualEditingWrapper
            documentId={settings?._id}
            documentType={isNewSchema ? "homepageSettings" : "portfolioSettings"}
            fieldPath="galleryTransition"
          >
            <GalleryTransition
              title={settings?.galleryTransition?.title || "Enter the Gallery"}
              subtitle={settings?.galleryTransition?.subtitle || "Discover a curated collection of contemporary artworks that explore the boundaries between traditional and modern artistic expression."}
              settings={settings}
              titleFieldPath="galleryTransition.title"
              subtitleFieldPath="galleryTransition.subtitle"
            >
              <div />
            </GalleryTransition>
          </VisualEditingWrapper>
        </div>

        {/* Featured Artworks Grid - Responsive for all screen sizes */}
        <VisualEditingWrapper
          documentId={settings?._id}
          documentType={isNewSchema ? "homepageSettings" : "portfolioSettings"}
          fieldPath="featuredCollection"
        >
          <GalleryGrid
            title={settings?.featuredCollection?.title || "Featured Collection"}
            subtitle={settings?.featuredCollection?.subtitle || "A selection of recent works showcasing diverse mediums and artistic approaches."}
            artworks={artworksToShow}
            settings={settings}
          />
        </VisualEditingWrapper>

        {/* Artist Statement Section */}
        <VisualEditingWrapper
          documentId={settings?._id}
          documentType={isNewSchema ? "homepageSettings" : "portfolioSettings"}
          fieldPath="artistStatement"
        >
          <ArtistStatement
            settings={settings}
            artist={artist}
          />
        </VisualEditingWrapper>

        {/* Final Gallery Transition */}
        <VisualEditingWrapper
          documentId={settings?._id}
          documentType={isNewSchema ? "homepageSettings" : "portfolioSettings"}
          fieldPath={isNewSchema ? "continueExploring" : "galleryTransition2"}
        >
          <GalleryTransition
            title={settings?.continueExploring?.title || settings?.galleryTransition2?.title || "Continue Exploring"}
            subtitle={settings?.continueExploring?.subtitle || settings?.galleryTransition2?.subtitle || "Visit our complete portfolio to discover more artworks, learn about upcoming exhibitions, and explore commission opportunities."}
            backgroundColor="bg-dusty-rose/10 dark:bg-dusty-rose/5"
            settings={settings}
            titleFieldPath={isNewSchema ? "continueExploring.title" : "galleryTransition2.title"}
            subtitleFieldPath={isNewSchema ? "continueExploring.subtitle" : "galleryTransition2.subtitle"}
          >
            <div />
          </GalleryTransition>
        </VisualEditingWrapper>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
