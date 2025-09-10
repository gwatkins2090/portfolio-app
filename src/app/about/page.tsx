'use client'

import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ArtistBiography from '@/components/about/artist-biography';
import ExhibitionHistory from '@/components/about/exhibition-history';
import AwardsAndRecognition from '@/components/about/awards-recognition';
import ArtisticPhilosophy from '@/components/about/artistic-philosophy';
import { EditableContent, EditableText } from '@/components/sanity/editable-content';
import { useArtistProfile } from '@/hooks/use-sanity-content';

// Note: Metadata export removed for client component
// TODO: Move to layout.tsx or create separate metadata API route

const AboutPage = () => {
  const { content: artist, loading, error } = useArtistProfile()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-12 md:py-20 gallery-wall">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <EditableText
                text="About the Artist"
                documentId={artist?._id}
                documentType="artist"
                fieldPath="pageTitle"
                as="h1"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-foreground mb-4 md:mb-6 tracking-tight"
              />
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
