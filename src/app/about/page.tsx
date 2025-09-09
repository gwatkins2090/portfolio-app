import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ArtistBiography from '@/components/about/artist-biography';
import ExhibitionHistory from '@/components/about/exhibition-history';
import AwardsAndRecognition from '@/components/about/awards-recognition';
import ArtisticPhilosophy from '@/components/about/artistic-philosophy';

export const metadata: Metadata = {
  title: 'About the Artist | Jennifer Watkins - Contemporary Art Portfolio',
  description: 'Learn about Jennifer Watkins, a contemporary artist exploring the intersection of traditional techniques and modern expression through painting, mixed media, and digital art.',
  keywords: ['artist biography', 'contemporary artist', 'Jennifer Watkins', 'art education', 'exhibitions', 'awards'],
  openGraph: {
    title: 'About Jennifer Watkins | Contemporary Artist',
    description: 'Discover the journey, philosophy, and achievements of contemporary artist Jennifer Watkins.',
    type: 'profile',
  },
};

const AboutPage = () => {
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
                Exploring the boundaries between traditional artistry and contemporary expression,
                creating works that invite contemplation and emotional connection.
              </p>
            </div>
          </div>
        </section>

        {/* Artist Biography */}
        <ArtistBiography />

        {/* Artistic Philosophy */}
        <ArtisticPhilosophy />

        {/* Exhibition History */}
        <ExhibitionHistory />

        {/* Awards and Recognition */}
        <AwardsAndRecognition />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
