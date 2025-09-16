'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Share2, ShoppingBag, Eye, Maximize2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Artwork } from '@/types';
import LightboxGallery from './lightbox-gallery';

interface ArtworkDetailProps {
  artwork: Artwork;
  showPurchaseOptions?: boolean;
  showFullDetails?: boolean;
  className?: string;
}

const ArtworkDetail = ({ 
  artwork, 
  showPurchaseOptions = true, 
  showFullDetails = true,
  className = ''
}: ArtworkDetailProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const mainImage = artwork.images[selectedImageIndex] || artwork.images[0];
  const hasMultipleImages = artwork.images.length > 1;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: artwork.title,
          text: `Check out "${artwork.title}" by the artist`,
          url: window.location.href
        });
      } catch {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  return (
    <div className={`grid lg:grid-cols-2 gap-12 ${className}`}>
      {/* Image Section */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative group">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-lg artwork-frame bg-white dark:bg-gray-900"
            whileHover={{ scale: isZoomed ? 1 : 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={mainImage.url}
              alt={mainImage.alt}
              fill
              className={`object-cover transition-transform duration-500 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              priority
              quality={95}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            
            {/* Status Badge */}
            {artwork.status !== 'available' && (
              <Badge 
                variant={artwork.status === 'sold' ? 'destructive' : 'secondary'}
                className="absolute top-4 left-4 z-10"
              >
                {artwork.status === 'sold' ? 'Sold' : 'Reserved'}
              </Badge>
            )}

            {/* Hover Controls */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex space-x-3">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-black"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLightboxOpen(true);
                  }}
                >
                  <Maximize2 className="h-4 w-4 mr-2" />
                  Full View
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Image Navigation */}
          {hasMultipleImages && (
            <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
              {artwork.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                    index === selectedImageIndex 
                      ? 'ring-2 ring-primary scale-105' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-8">
        {/* Basic Info */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                {artwork.title}
              </h1>
              <div className="artwork-details text-lg">
                {artwork.year} • {artwork.medium}
              </div>
            </div>
            
            {artwork.price && artwork.status === 'available' && (
              <div className="text-right">
                <div className="text-3xl font-bold text-gallery-gold">
                  {formatPrice(artwork.price.amount, artwork.price.currency)}
                </div>
                {artwork.price.isNegotiable && (
                  <div className="text-sm text-muted-foreground">
                    Price negotiable
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <Badge variant="outline" className="gallery-label">
              {artwork.category}
            </Badge>
            <div className="artwork-details">
              {artwork.dimensions.width} × {artwork.dimensions.height}
              {artwork.dimensions.depth && ` × ${artwork.dimensions.depth}`} {artwork.dimensions.unit}
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {artwork.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={`${isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
          >
            <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            {isLiked ? 'Liked' : 'Like'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="text-muted-foreground hover:text-foreground"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          {showPurchaseOptions && artwork.status === 'available' && artwork.price && (
            <Button
              size="lg"
              className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black font-medium ml-auto"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          )}
        </div>

        {/* Additional Details */}
        {showFullDetails && (
          <div className="space-y-6">
            {/* Technical Details */}
            {artwork.technicalDetails && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Technical Details
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {artwork.technicalDetails}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Artist Notes */}
            {artwork.artistNotes && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Artist&apos;s Notes
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {artwork.artistNotes}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Inspiration */}
            {artwork.inspiration && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Inspiration
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {artwork.inspiration}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Series Info */}
            {artwork.series && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Series
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Part of the &quot;{artwork.series}&quot; series
                    {artwork.edition && (
                      <span className="block mt-1">
                        Edition {artwork.edition.current} of {artwork.edition.total}
                      </span>
                    )}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Metadata */}
            <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t border-border/50">
              <div>Artwork ID: {artwork.id}</div>
              {artwork.metadata.views && (
                <div className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {artwork.metadata.views.toLocaleString()} views
                </div>
              )}
              <div>
                Created: {new Date(artwork.metadata.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Gallery */}
      <LightboxGallery
        images={artwork.images}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        initialIndex={selectedImageIndex}
        artworkTitle={artwork.title}
        artworkYear={artwork.year}
        artworkMedium={artwork.medium}
      />
    </div>
  );
};

export default ArtworkDetail;
