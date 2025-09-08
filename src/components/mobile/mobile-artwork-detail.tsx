'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Heart, Share2, ShoppingBag, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Artwork } from '@/types';

interface MobileArtworkDetailProps {
  artwork: Artwork;
  onLike?: (artworkId: string) => void;
  onAddToCart?: (artworkId: string) => void;
  onShare?: (artworkId: string) => void;
  className?: string;
}

const MobileArtworkDetail = ({
  artwork,
  onLike,
  onAddToCart,
  onShare,
  className = ''
}: MobileArtworkDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const hasMultipleImages = artwork.images.length > 1;
  const currentImage = artwork.images[currentImageIndex];

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    
    if (Math.abs(velocity) >= 500 || Math.abs(offset) > 50) {
      if ((velocity > 0 || offset > 0) && currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      } else if ((velocity < 0 || offset < 0) && currentImageIndex < artwork.images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.(artwork.id);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: artwork.title,
          text: `Check out "${artwork.title}" by the artist`,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    }
    onShare?.(artwork.id);
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Image Gallery */}
      <div className="relative">
        <div 
          ref={constraintsRef}
          className="relative aspect-[4/5] overflow-hidden rounded-lg artwork-frame bg-white dark:bg-gray-900"
        >
          <motion.div
            className="flex h-full"
            style={{ x }}
            drag={hasMultipleImages ? "x" : false}
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            animate={{ x: -currentImageIndex * 100 + '%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {artwork.images.map((image, index) => (
              <div
                key={image.id}
                className="relative w-full h-full flex-shrink-0"
                style={{ width: '100%' }}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className={`object-cover transition-transform duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  sizes="100vw"
                  priority={index === 0}
                  quality={95}
                />
              </div>
            ))}
          </motion.div>

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

          {/* Image Navigation */}
          {hasMultipleImages && (
            <>
              {currentImageIndex > 0 && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-black mobile-touch-target"
                  onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}

              {currentImageIndex < artwork.images.length - 1 && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-black mobile-touch-target"
                  onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </>
          )}

          {/* Zoom Toggle */}
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 z-10 bg-white/90 hover:bg-white text-black mobile-touch-target"
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>

          {/* Image Counter */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-4 z-10">
              <Badge variant="secondary" className="bg-black/50 text-white">
                {currentImageIndex + 1} / {artwork.images.length}
              </Badge>
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {hasMultipleImages && (
          <div className="mt-4 overflow-x-auto mobile-scroll-snap">
            <div className="flex space-x-2 pb-2">
              {artwork.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all mobile-touch-target ${
                    index === currentImageIndex 
                      ? 'ring-2 ring-primary scale-105' 
                      : 'opacity-60'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Artwork Information */}
      <div className="space-y-6">
        {/* Title and Basic Info */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                {artwork.title}
              </h1>
              <div className="artwork-details text-base mb-2">
                {artwork.year} • {artwork.medium}
              </div>
              <div className="artwork-details text-sm">
                {artwork.dimensions.width} × {artwork.dimensions.height}
                {artwork.dimensions.depth && ` × ${artwork.dimensions.depth}`} {artwork.dimensions.unit}
              </div>
            </div>
            
            {artwork.price && artwork.status === 'available' && (
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-gallery-gold">
                  {formatPrice(artwork.price.amount, artwork.price.currency)}
                </div>
                {artwork.price.isNegotiable && (
                  <div className="text-xs text-muted-foreground">
                    Negotiable
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Badge variant="outline" className="gallery-label">
              {artwork.category}
            </Badge>
            {artwork.series && (
              <Badge variant="outline" className="gallery-label">
                {artwork.series}
              </Badge>
            )}
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            {artwork.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={handleLike}
            className={`mobile-touch-target ${
              isLiked ? 'text-red-500 border-red-500' : ''
            }`}
          >
            <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            {isLiked ? 'Liked' : 'Like'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleShare}
            className="mobile-touch-target"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          {artwork.status === 'available' && artwork.price && (
            <Button
              className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black mobile-touch-target"
              onClick={() => onAddToCart?.(artwork.id)}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          )}
        </div>

        {/* Additional Details */}
        <div className="space-y-4">
          {artwork.technicalDetails && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-2">
                  Technical Details
                </h3>
                <p className="text-sm text-muted-foreground">
                  {artwork.technicalDetails}
                </p>
              </CardContent>
            </Card>
          )}

          {artwork.artistNotes && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-2">
                  Artist's Notes
                </h3>
                <p className="text-sm text-muted-foreground">
                  {artwork.artistNotes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileArtworkDetail;
