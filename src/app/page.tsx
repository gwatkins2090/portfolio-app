import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/gallery/hero-section';
import GalleryGrid from '@/components/gallery/gallery-grid';
import ArtistStatement from '@/components/gallery/artist-statement';
import GalleryTransition from '@/components/gallery/gallery-transition';
import { getHomepageData } from '@/lib/sanity/fetch';
import { sampleArtworks } from '@/lib/sample-data';
import { VisualEditingWrapper } from '@/components/sanity/visual-editing-wrapper';

// Generate metadata from Sanity data
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getHomepageData();
    const settings = data.settings;

    return {
      title: settings?.seo?.metaTitle || settings?.title || 'Jennifer Watkins - Contemporary Artist',
      description: settings?.seo?.metaDescription || settings?.description || 'Contemporary art portfolio showcasing original paintings and artwork by Jennifer Watkins.',
      keywords: settings?.seo?.keywords || ['contemporary art', 'paintings', 'Jennifer Watkins', 'artist'],
      openGraph: {
        title: settings?.seo?.metaTitle || settings?.title || 'Jennifer Watkins - Contemporary Artist',
        description: settings?.seo?.metaDescription || settings?.description,
        type: 'website',
        images: settings?.seo?.ogImage ? [settings.seo.ogImage.asset.url] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Jennifer Watkins - Contemporary Artist',
      description: 'Contemporary art portfolio showcasing original paintings and artwork by Jennifer Watkins.',
    };
  }
}

const HomePage = async () => {
  // Fetch data from Sanity
  let data;
  try {
    data = await getHomepageData();
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    data = { settings: null, artist: null, featuredArtworks: [] };
  }

  const { settings, artist, featuredArtworks } = data;

  // Use Sanity content if available, otherwise fall back to static content
  const artworksToShow = featuredArtworks && featuredArtworks.length > 0
    ? featuredArtworks
    : sampleArtworks;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section with Featured Artwork Slideshow */}
        <VisualEditingWrapper
          documentId={settings?._id}
          documentType="portfolioSettings"
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
            documentType="portfolioSettings"
            fieldPath="galleryTransition"
          >
            <GalleryTransition
              title={settings?.galleryTransition?.title || "Enter the Gallery"}
              subtitle={settings?.galleryTransition?.subtitle || "Discover a curated collection of contemporary artworks that explore the boundaries between traditional and modern artistic expression."}
            >
              <div />
            </GalleryTransition>
          </VisualEditingWrapper>
        </div>

        {/* Featured Artworks Grid - Responsive for all screen sizes */}
        <GalleryGrid
          title="Featured Collection"
          subtitle="A selection of recent works showcasing diverse mediums and artistic approaches."
          artworks={artworksToShow}
        />

        {/* Artist Statement Section */}
        <VisualEditingWrapper
          documentId={settings?._id}
          documentType="portfolioSettings"
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
          documentType="portfolioSettings"
          fieldPath="galleryTransition2"
        >
          <GalleryTransition
            title={settings?.galleryTransition2?.title || "Continue Exploring"}
            subtitle={settings?.galleryTransition2?.subtitle || "Visit our complete portfolio to discover more artworks, learn about upcoming exhibitions, and explore commission opportunities."}
            backgroundColor="bg-dusty-rose/10 dark:bg-dusty-rose/5"
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