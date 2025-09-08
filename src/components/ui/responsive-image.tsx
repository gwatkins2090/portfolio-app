'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMobile, useTouch } from '@/hooks/use-mobile';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  aspectRatio?: string;
  enableZoom?: boolean;
  enablePinchZoom?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 85,
  sizes,
  fill = false,
  aspectRatio,
  enableZoom = false,
  enablePinchZoom = false,
  onLoad,
  onError,
  ...props
}: ResponsiveImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  
  const isMobile = useMobile();
  const isTouch = useTouch();

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || (
    isMobile 
      ? '100vw'
      : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  );

  // Optimize quality for mobile
  const optimizedQuality = isMobile ? Math.min(quality, 75) : quality;

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  const handlePinchZoom = (event: any) => {
    if (!enablePinchZoom || !isTouch) return;
    
    event.preventDefault();
    
    if (event.touches && event.touches.length === 2) {
      // Handle pinch zoom logic here
      // This is a simplified version - you might want to use a library like react-pinch-zoom-pan
      const touch1 = event.touches[0];
      const touch2 = event.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      // Store initial distance and implement zoom logic
      // This would need more sophisticated implementation
    }
  };

  const handleDoubleClick = () => {
    if (!enableZoom) return;
    
    if (scale === 1) {
      setScale(2);
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const containerStyle = aspectRatio ? { aspectRatio } : {};

  if (isError) {
    return (
      <div 
        className={`flex items-center justify-center bg-muted text-muted-foreground ${className}`}
        style={containerStyle}
      >
        <div className="text-center p-4">
          <div className="text-sm">Failed to load image</div>
          <div className="text-xs mt-1">{alt}</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={imageRef}
      className={`relative overflow-hidden ${className}`}
      style={containerStyle}
      onTouchStart={handlePinchZoom}
      onDoubleClick={handleDoubleClick}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Loading...</div>
        </div>
      )}

      {/* Main image */}
      <motion.div
        style={{
          scale,
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        className="w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={`object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes={responsiveSizes}
          quality={optimizedQuality}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
          // Optimize for mobile
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          {...props}
        />
      </motion.div>

      {/* Zoom controls for mobile */}
      {enableZoom && isMobile && isLoaded && (
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button
            onClick={() => setScale(Math.max(0.5, scale - 0.5))}
            className="bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center mobile-touch-target"
            disabled={scale <= 0.5}
          >
            −
          </button>
          <button
            onClick={() => setScale(Math.min(3, scale + 0.5))}
            className="bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center mobile-touch-target"
            disabled={scale >= 3}
          >
            +
          </button>
        </div>
      )}

      {/* Double tap hint for mobile */}
      {enableZoom && isMobile && isLoaded && scale === 1 && (
        <div className="absolute top-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
          Double tap to zoom
        </div>
      )}
    </div>
  );
};

export default ResponsiveImage;
