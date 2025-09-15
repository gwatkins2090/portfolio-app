'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VisualEditingWrapper } from '@/components/sanity/visual-editing-wrapper';

interface FeaturedArtwork {
  _id?: string;
  id?: string;
  title: string;
  year: number;
  medium: string;
  image?: string;
  images?: Array<{
    image: {
      asset: {
        url: string;
      };
    };
    alt?: string;
  }>;
  description: string;
}

interface HeroSectionProps {
  settings?: any;
  featuredArtworks?: FeaturedArtwork[];
}

// Fallback featured artworks
const fallbackArtworks: FeaturedArtwork[] = [
  {
    id: '1',
    title: 'Ethereal Landscapes',
    year: 2024,
    medium: 'Oil on Canvas',
    image: '/7.jpg',
    description: 'A contemplative exploration of light and shadow in natural forms.'
  },
  {
    id: '2',
    title: 'Urban Reflections',
    year: 2023,
    medium: 'Mixed Media',
    image: '/8.jpg',
    description: 'The intersection of human experience and architectural beauty.'
  },
  {
    id: '3',
    title: 'Abstract Emotions',
    year: 2024,
    medium: 'Acrylic on Canvas',
    image: '/9.jpg',
    description: 'Color and form expressing the depths of human feeling.'
  }
];

const HeroSection = ({ settings, featuredArtworks }: HeroSectionProps) => {
  // Use provided artworks or fallback
  const artworks = featuredArtworks && featuredArtworks.length > 0 ? featuredArtworks : fallbackArtworks;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) {return;}

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % artworks.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isPlaying, artworks.length]);

  const currentArtwork = artworks[currentIndex];

  // Get image URL from Sanity or fallback
  const getImageUrl = (artwork: FeaturedArtwork) => {
    if (artwork.images && artwork.images[0]?.image?.asset?.url) {
      return artwork.images[0].image.asset.url;
    }
    return artwork.image || '/placeholder-artwork.svg';
  };

  // Get hero content from settings or use defaults
  const heroTitle = settings?.heroSection?.title || 'Contemporary Art';
  const heroSubtitle = settings?.heroSection?.subtitle || 'Portfolio';
  const heroDescription = settings?.heroSection?.description || 'Discover a curated collection of contemporary artwork that explores the intersection of traditional techniques and modern expression.';
  const ctaText = settings?.heroSection?.ctaText || 'Explore Gallery';
  const ctaLink = settings?.heroSection?.ctaLink || '/portfolio';
  const secondaryCtaText = settings?.heroSection?.secondaryCtaText || 'About the Artist';
  const secondaryCtaLink = settings?.heroSection?.secondaryCtaLink || '/about';

  const scrollToGallery = () => {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden gallery-wall">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={getImageUrl(currentArtwork)}
            alt={currentArtwork.title}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <VisualEditingWrapper
              documentId={settings?._id}
              documentType="portfolioSettings"
              fieldPath="heroSection.title"
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight">
                {heroTitle}
                <VisualEditingWrapper
                  documentId={settings?._id}
                  documentType="portfolioSettings"
                  fieldPath="heroSection.subtitle"
                >
                  <span className="block text-gallery-gold">{heroSubtitle}</span>
                </VisualEditingWrapper>
              </h1>
            </VisualEditingWrapper>

            <VisualEditingWrapper
              documentId={settings?._id}
              documentType="portfolioSettings"
              fieldPath="heroSection.description"
            >
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
                {heroDescription}
              </p>
            </VisualEditingWrapper>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <VisualEditingWrapper
                documentId={settings?._id}
                documentType="portfolioSettings"
                fieldPath="heroSection.ctaText"
              >
                <Button
                  size="lg"
                  className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black font-medium px-8 py-3"
                  onClick={scrollToGallery}
                >
                  {ctaText}
                </Button>
              </VisualEditingWrapper>
              <VisualEditingWrapper
                documentId={settings?._id}
                documentType="portfolioSettings"
                fieldPath="heroSection.secondaryCtaText"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/80 bg-white/10 text-white hover:bg-white hover:text-off-black px-8 py-3 backdrop-blur-sm"
                  asChild
                >
                  <a href={secondaryCtaLink}>{secondaryCtaText}</a>
                </Button>
              </VisualEditingWrapper>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Artwork Info */}
      <motion.div
        key={`info-${currentIndex}`}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute bottom-20 left-8 z-20 text-white max-w-md"
      >
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h3 className="text-2xl font-serif font-semibold mb-2">
            {currentArtwork.title}
          </h3>
          <p className="text-sm text-gray-300 mb-2">
            {currentArtwork.year} • {currentArtwork.medium}
          </p>
          <p className="text-sm text-gray-200 leading-relaxed">
            {currentArtwork.description}
          </p>
        </div>
      </motion.div>

      {/* Slideshow Controls */}
      <div className="absolute bottom-20 right-8 z-20 flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-white hover:bg-white/20 border border-white/30"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <div className="flex space-x-2">
          {artworks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-gallery-gold scale-110'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <button
          onClick={scrollToGallery}
          className="flex flex-col items-center text-white hover:text-gallery-gold transition-colors"
        >
          <span className="text-sm mb-2 tracking-wide">Explore Gallery</span>
          <ChevronDown className="h-6 w-6" />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
