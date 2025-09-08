'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Eye, Info, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Artwork } from '@/types';

interface ProductCardProps {
  artwork: Artwork;
  onAddToCart?: (artworkId: string, options?: any) => void;
  onAddToWishlist?: (artworkId: string) => void;
  isInWishlist?: boolean;
  isInCart?: boolean;
  showQuickView?: boolean;
  className?: string;
}

const ProductCard = ({
  artwork,
  onAddToCart,
  onAddToWishlist,
  isInWishlist = false,
  isInCart = false,
  showQuickView = true,
  className = ''
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(isInWishlist);
  const [isAdding, setIsAdding] = useState(false);
  const [showFramingOptions, setShowFramingOptions] = useState(false);

  const mainImage = artwork.images.find(img => img.isMain) || artwork.images[0];
  const isAvailable = artwork.status === 'available';
  const hasPrice = artwork.price && artwork.price.amount > 0;

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const handleAddToCart = async () => {
    if (!isAvailable || !hasPrice || isAdding) return;
    
    setIsAdding(true);
    try {
      await onAddToCart?.(artwork.id);
      // Show success feedback
      setTimeout(() => setIsAdding(false), 1000);
    } catch (error) {
      setIsAdding(false);
    }
  };

  const handleToggleWishlist = () => {
    setIsLiked(!isLiked);
    onAddToWishlist?.(artwork.id);
  };

  const getStatusBadge = () => {
    switch (artwork.status) {
      case 'sold':
        return <Badge variant="destructive">Sold</Badge>;
      case 'reserved':
        return <Badge variant="secondary">Reserved</Badge>;
      case 'not-for-sale':
        return <Badge variant="outline">Not for Sale</Badge>;
      case 'on-loan':
        return <Badge variant="outline">On Loan</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`group overflow-hidden artwork-frame transition-all duration-300 hover:shadow-lg ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Link href={`/artwork/${artwork.slug}`}>
          <Image
            src={mainImage.url}
            alt={mainImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10">
          {getStatusBadge()}
        </div>

        {/* Price Badge */}
        {hasPrice && isAvailable && (
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-gallery-gold text-off-black font-semibold">
              {formatPrice(artwork.price!.amount, artwork.price!.currency)}
            </Badge>
          </div>
        )}

        {/* Quick Actions Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <div className="flex space-x-3">
            {showQuickView && (
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white text-black"
                asChild
              >
                <Link href={`/artwork/${artwork.slug}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Link>
              </Button>
            )}

            <Button
              size="sm"
              variant="secondary"
              className={`bg-white/90 hover:bg-white ${
                isLiked ? 'text-red-500' : 'text-black'
              }`}
              onClick={handleToggleWishlist}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>

            {isAvailable && hasPrice && (
              <Button
                size="sm"
                className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black"
                onClick={handleAddToCart}
                disabled={isAdding || isInCart}
              >
                {isAdding ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="h-4 w-4"
                  >
                    ⟳
                  </motion.div>
                ) : isInCart ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <ShoppingBag className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Edition Info */}
        {artwork.edition && (
          <div className="absolute bottom-3 left-3 z-10">
            <Badge variant="outline" className="bg-black/50 text-white border-white/30">
              {artwork.edition.current}/{artwork.edition.total}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title and Basic Info */}
          <div>
            <Link href={`/artwork/${artwork.slug}`}>
              <h3 className="artwork-title text-lg font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                {artwork.title}
              </h3>
            </Link>
            <div className="artwork-details mt-1">
              {artwork.year} • {artwork.medium}
            </div>
            <div className="artwork-details text-sm">
              {artwork.dimensions.width} × {artwork.dimensions.height} {artwork.dimensions.unit}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {artwork.description}
          </p>

          {/* Category and Series */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="gallery-label">
              {artwork.category}
            </Badge>
            {artwork.series && (
              <Badge variant="outline" className="gallery-label">
                {artwork.series}
              </Badge>
            )}
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div>
              {hasPrice && isAvailable ? (
                <div>
                  <div className="text-xl font-bold text-gallery-gold">
                    {formatPrice(artwork.price!.amount, artwork.price!.currency)}
                  </div>
                  {artwork.price!.isNegotiable && (
                    <div className="text-xs text-muted-foreground">
                      Price negotiable
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  {artwork.status === 'sold' ? 'Sold' : 
                   artwork.status === 'not-for-sale' ? 'Not for sale' : 
                   'Contact for price'}
                </div>
              )}
            </div>

            {isAvailable && hasPrice && (
              <Button
                size="sm"
                className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black"
                onClick={handleAddToCart}
                disabled={isAdding || isInCart}
              >
                {isAdding ? (
                  'Adding...'
                ) : isInCart ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    In Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
            <div className="flex items-center space-x-3">
              {artwork.metadata.views && (
                <div className="flex items-center">
                  <Eye className="h-3 w-3 mr-1" />
                  {artwork.metadata.views}
                </div>
              )}
              {artwork.metadata.likes && (
                <div className="flex items-center">
                  <Heart className="h-3 w-3 mr-1" />
                  {artwork.metadata.likes}
                </div>
              )}
            </div>
            
            <Link 
              href={`/artwork/${artwork.slug}`}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
