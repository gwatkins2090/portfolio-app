'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Artwork } from '@/types';

interface MobileGalleryProps {
  artworks: Artwork[];
  onLike?: (artworkId: string) => void;
  onAddToCart?: (artworkId: string) => void;
  className?: string;
}

const MobileGallery = ({ 
  artworks, 
  onLike, 
  onAddToCart,
  className = ''
}: MobileGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  const progress = useTransform(x, 
    [-100 * (artworks.length - 1), 0], 
    [0, 1]
  );

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    if (Math.abs(velocity) >= 500) {
      // Fast swipe
      if (velocity > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (velocity < 0 && currentIndex < artworks.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } else if (Math.abs(offset) > 50) {
      // Slow drag
      if (offset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (offset < 0 && currentIndex < artworks.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handleLike = (artworkId: string) => {
    setIsLiked(prev => ({ ...prev, [artworkId]: !prev[artworkId] }));
    onLike?.(artworkId);
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  useEffect(() => {
    x.set(-currentIndex * 100);
  }, [currentIndex, x]);

  if (artworks.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No artworks to display</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Gallery Carousel */}
      <div 
        ref={constraintsRef}
        className="relative overflow-hidden rounded-lg"
        style={{ height: '70vh' }}
      >
        <motion.div
          className="flex h-full"
          style={{ x }}
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={{ x: -currentIndex * 100 + '%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {artworks.map((artwork, index) => {
            const mainImage = artwork.images.find(img => img.isMain) || artwork.images[0];
            
            return (
              <div
                key={artwork.id}
                className="relative w-full h-full flex-shrink-0"
                style={{ width: '100%' }}
              >
                {/* Artwork Image */}
                <Image
                  src={mainImage.url}
                  alt={mainImage.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index === 0}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Status Badge */}
                {artwork.status !== 'available' && (
                  <div className="absolute top-4 left-4 z-10">
                    <Badge 
                      variant={artwork.status === 'sold' ? 'destructive' : 'secondary'}
                    >
                      {artwork.status === 'sold' ? 'Sold' : 'Reserved'}
                    </Badge>
                  </div>
                )}

                {/* Price Badge */}
                {artwork.price && artwork.status === 'available' && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gallery-gold text-off-black">
                      {formatPrice(artwork.price.amount, artwork.price.currency)}
                    </Badge>
                  </div>
                )}

                {/* Artwork Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold mb-2">
                        {artwork.title}
                      </h3>
                      <p className="text-lg opacity-90 mb-2">
                        {artwork.year} • {artwork.medium}
                      </p>
                      <p className="text-sm opacity-75 line-clamp-2">
                        {artwork.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/90 hover:bg-white text-black mobile-touch-target"
                          asChild
                        >
                          <Link href={`/artwork/${artwork.slug}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </Button>

                        <Button
                          size="sm"
                          variant="secondary"
                          className={`bg-white/90 hover:bg-white mobile-touch-target ${
                            isLiked[artwork.id] ? 'text-red-500' : 'text-black'
                          }`}
                          onClick={() => handleLike(artwork.id)}
                        >
                          <Heart className={`h-4 w-4 ${isLiked[artwork.id] ? 'fill-current' : ''}`} />
                        </Button>

                        {artwork.status === 'available' && artwork.price && (
                          <Button
                            size="sm"
                            className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black mobile-touch-target"
                            onClick={() => onAddToCart?.(artwork.id)}
                          >
                            <ShoppingBag className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <Badge variant="outline" className="text-white border-white/50">
                        {artwork.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-black mobile-touch-target"
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {currentIndex < artworks.length - 1 && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-black mobile-touch-target"
            onClick={() => setCurrentIndex(currentIndex + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-4 px-4">
        <div className="flex space-x-2 overflow-x-auto mobile-scroll-snap pb-2">
          {artworks.map((artwork, index) => {
            const mainImage = artwork.images.find(img => img.isMain) || artwork.images[0];
            
            return (
              <button
                key={artwork.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all mobile-touch-target ${
                  index === currentIndex 
                    ? 'ring-2 ring-primary scale-105' 
                    : 'opacity-60'
                }`}
              >
                <Image
                  src={mainImage.url}
                  alt={mainImage.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-4 px-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{currentIndex + 1} of {artworks.length}</span>
          <span>Swipe to browse</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1">
          <motion.div
            className="bg-primary h-1 rounded-full"
            style={{ 
              width: `${((currentIndex + 1) / artworks.length) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileGallery;
