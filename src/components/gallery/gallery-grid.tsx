'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Eye, Heart, ShoppingBag, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ArtworkItem {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  price?: number;
  currency?: string;
  image: string;
  category: string;
  status: 'available' | 'sold' | 'reserved';
  description: string;
}

// Sample artwork data - in a real app, this would come from your data source
const sampleArtworks: ArtworkItem[] = [
  {
    id: '1',
    title: 'Whispers of Dawn',
    year: 2024,
    medium: 'Oil on Canvas',
    dimensions: '60 × 80 cm',
    price: 2500,
    currency: 'USD',
    image: '/1.jpg',
    category: 'Abstract',
    status: 'available',
    description: 'A contemplative piece exploring the transition between night and day.'
  },
  {
    id: '2',
    title: 'Urban Symphony',
    year: 2023,
    medium: 'Mixed Media',
    dimensions: '50 × 70 cm',
    price: 1800,
    currency: 'USD',
    image: '/2.jpg',
    category: 'Contemporary',
    status: 'available',
    description: 'The rhythm and energy of city life captured in vibrant colors.'
  },
  {
    id: '3',
    title: 'Solitude',
    year: 2024,
    medium: 'Acrylic on Canvas',
    dimensions: '40 × 60 cm',
    image: '/3.jpg',
    category: 'Portrait',
    status: 'sold',
    description: 'An introspective study of human emotion and isolation.'
  },
  {
    id: '4',
    title: 'Nature\'s Geometry',
    year: 2023,
    medium: 'Watercolor',
    dimensions: '35 × 50 cm',
    price: 1200,
    currency: 'USD',
    image: '/4.jpg',
    category: 'Nature',
    status: 'available',
    description: 'Finding mathematical beauty in organic forms.'
  },
  {
    id: '5',
    title: 'Digital Dreams',
    year: 2024,
    medium: 'Digital Art',
    dimensions: '70 × 100 cm',
    price: 3200,
    currency: 'USD',
    image: '/5.jpg',
    category: 'Digital',
    status: 'reserved',
    description: 'Exploring the intersection of technology and artistic expression.'
  },
  {
    id: '6',
    title: 'Coastal Memories',
    year: 2023,
    medium: 'Oil on Canvas',
    dimensions: '80 × 120 cm',
    price: 4500,
    currency: 'USD',
    image: '/6.jpg',
    category: 'Landscape',
    status: 'available',
    description: 'Capturing the eternal dance between sea and shore.'
  }
];

interface ArtworkCardProps {
  artwork: ArtworkItem;
  index: number;
}

const ArtworkCard = ({ artwork, index }: ArtworkCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="artwork-frame overflow-hidden bg-white dark:bg-gray-900">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={artwork.image || '/placeholder-artwork.svg'}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Status Badge */}
          {artwork.status !== 'available' && (
            <Badge 
              variant={artwork.status === 'sold' ? 'destructive' : 'secondary'}
              className="absolute top-3 left-3 z-10"
            >
              {artwork.status === 'sold' ? 'Sold' : 'Reserved'}
            </Badge>
          )}

          {/* Hover Overlay */}
          <motion.div
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            variants={overlayVariants}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 flex items-center justify-center"
          >
            <div className="flex space-x-3">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-black"
                asChild
              >
                <Link href={`/artwork/${artwork.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Link>
              </Button>
              
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-black"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>

              {artwork.status === 'available' && artwork.price && (
                <Button
                  size="sm"
                  className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black"
                >
                  <ShoppingBag className="h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Artwork Info */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="artwork-title text-lg font-medium text-foreground group-hover:text-primary transition-colors">
              {artwork.title}
            </h3>
            {artwork.price && artwork.status === 'available' && (
              <span className="text-lg font-semibold text-gallery-gold">
                ${artwork.price.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="artwork-details mb-3">
            {artwork.year} • {artwork.medium}
          </div>
          
          <div className="artwork-details mb-3">
            {artwork.dimensions}
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {artwork.description}
          </p>
          
          <div className="mt-4 flex justify-between items-center">
            <Badge variant="outline" className="gallery-label">
              {artwork.category}
            </Badge>
            
            <Link 
              href={`/artwork/${artwork.id}`}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface GalleryGridProps {
  title?: string;
  subtitle?: string;
  artworks?: ArtworkItem[];
}

const GalleryGrid = ({ title = "Featured Artworks", subtitle, artworks }: GalleryGridProps) => {
  // Use provided artworks or fall back to sample data
  const displayArtworks = artworks || sampleArtworks;
  return (
    <section id="gallery" className="py-20 gallery-wall">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayArtworks.map((artwork, index) => (
            <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3"
            asChild
          >
            <Link href="/portfolio">
              View Complete Portfolio
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryGrid;
