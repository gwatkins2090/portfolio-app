'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Eye, Heart, ShoppingBag, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Artwork } from '@/types';

interface ArtworkHoverProps {
  artwork: Artwork;
  onLike?: (artworkId: string) => void;
  onAddToCart?: (artworkId: string) => void;
  className?: string;
}

const ArtworkHover = ({ 
  artwork, 
  onLike, 
  onAddToCart,
  className = ''
}: ArtworkHoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Mouse tracking for lighting effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    onLike?.(artwork.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(artwork.id);
  };

  const mainImage = artwork.images.find(img => img.isMain) || artwork.images[0];

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  return (
    <Link href={`/artwork/${artwork.slug}`} className={`block group ${className}`}>
      <motion.div
        ref={ref}
        className="relative overflow-hidden rounded-lg artwork-frame bg-white dark:bg-gray-900"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Main Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={mainImage.url}
            alt={mainImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Gallery Lighting Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${x.get() * 50 + 50}% ${y.get() * 50 + 50}%, 
                          rgba(212, 165, 116, 0.15) 0%, 
                          transparent 50%)`
            }}
            animate={{
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
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

          {/* Price Badge */}
          {artwork.price && artwork.status === 'available' && (
            <Badge 
              className="absolute top-3 right-3 z-10 bg-gallery-gold text-off-black"
            >
              {formatPrice(artwork.price.amount, artwork.price.currency)}
            </Badge>
          )}

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6"
          >
            {/* Quick Actions */}
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h3 className="text-white font-semibold text-lg leading-tight">
                  {artwork.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {artwork.year} • {artwork.medium}
                </p>
                <Badge variant="outline" className="text-white border-white/50">
                  {artwork.category}
                </Badge>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/90 hover:bg-white text-black"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="secondary"
                  className={`bg-white/90 hover:bg-white ${
                    isLiked ? 'text-red-500' : 'text-black'
                  }`}
                  onClick={handleLike}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>

                {artwork.status === 'available' && artwork.price && (
                  <Button
                    size="sm"
                    className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Subtle Info Overlay (Always Visible) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4"
          >
            <h3 className="text-white font-medium text-lg mb-1">
              {artwork.title}
            </h3>
            <p className="text-gray-300 text-sm">
              {artwork.year}
            </p>
          </motion.div>
        </div>

        {/* Bottom Info Panel */}
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="artwork-title text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                {artwork.title}
              </h3>
              <div className="artwork-details">
                {artwork.year} • {artwork.medium}
              </div>
            </div>
            
            {artwork.price && artwork.status === 'available' && (
              <div className="text-right">
                <div className="text-lg font-semibold text-gallery-gold">
                  {formatPrice(artwork.price.amount, artwork.price.currency)}
                </div>
              </div>
            )}
          </div>
          
          <div className="artwork-details">
            {artwork.dimensions.width} × {artwork.dimensions.height} {artwork.dimensions.unit}
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {artwork.description}
          </p>
          
          <div className="flex justify-between items-center pt-2">
            <Badge variant="outline" className="gallery-label">
              {artwork.category}
            </Badge>
            
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
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
          </div>
        </div>

        {/* 3D Depth Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              ${x.get() * 45 + 45}deg,
              rgba(212, 165, 116, 0.1) 0%,
              transparent 50%,
              rgba(139, 154, 122, 0.1) 100%
            )`
          }}
          animate={{
            opacity: isHovered ? 0.5 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );
};

export default ArtworkHover;
