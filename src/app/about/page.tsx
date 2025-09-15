import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ArtistBiography from '@/components/about/artist-biography';
import ExhibitionHistory from '@/components/about/exhibition-history';
import AwardsAndRecognition from '@/components/about/awards-recognition';
import ArtisticPhilosophy from '@/components/about/artistic-philosophy';
import { getAboutPageData } from '@/lib/sanity/fetch';
import { VisualEditingWrapper } from '@/components/sanity/visual-editing-wrapper';

// Generate metadata from Sanity data
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getAboutPageData();
    const artist = data.artist;

    return {
      title: `About ${artist?.name || 'Jennifer Watkins'} | Contemporary Artist`,
      description: artist?.shortBio || 'Learn about Jennifer Watkins, a contemporary artist exploring the boundaries between traditional artistry and contemporary expression.',
      keywords: ['about artist', 'Jennifer Watkins', 'contemporary art', 'artist biography'],
      openGraph: {
        title: `About ${artist?.name || 'Jennifer Watkins'} | Contemporary Artist`,
        description: artist?.shortBio || 'Learn about Jennifer Watkins, a contemporary artist.',
        type: 'profile',
        images: artist?.profileImage?.asset?.url ? [artist.profileImage.asset.url] : [],
      },
    };
  } catch (error) {
    console.error('Error generating about page metadata:', error);
    return {
      title: 'About Jennifer Watkins | Contemporary Artist',
      description: 'Learn about Jennifer Watkins, a contemporary artist exploring the boundaries between traditional artistry and contemporary expression.',
    };
  }
}

const AboutPage = async () => {
  // Fetch data from Sanity
  let data;
  try {
    data = await getAboutPageData();
  } catch (error) {
    console.error('Error fetching about page data:', error);
    data = { artist: null, settings: null };
  }

  const { artist, settings } = data;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-20 gallery-wall">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-foreground mb-4 md:mb-6 tracking-tight">
                About the Artist
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {artist?.aboutPageIntro || 'Exploring the boundaries between traditional artistry and contemporary expression, creating works that invite contemplation and emotional connection.'}
              </p>
            </div>
          </div>
        </section>

        {/* Artist Biography */}
        <VisualEditingWrapper
          documentId={artist?._id}
          documentType="artist"
          fieldPath="bio"
        >
          <ArtistBiography artist={artist} settings={settings} />
        </VisualEditingWrapper>

        {/* Artistic Philosophy */}
        <VisualEditingWrapper
          documentId={artist?._id}
          documentType="artist"
          fieldPath="statement"
        >
          <ArtisticPhilosophy artist={artist} />
        </VisualEditingWrapper>

        {/* Exhibition History */}
        <VisualEditingWrapper
          documentId={artist?._id}
          documentType="artist"
          fieldPath="exhibitions"
        >
          <ExhibitionHistory artist={artist} />
        </VisualEditingWrapper>

        {/* Awards and Recognition */}
        <AwardsAndRecognition artist={artist} />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
