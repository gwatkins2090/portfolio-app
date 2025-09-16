'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Artwork } from '@/types';
import ArtworkHover from './artwork-hover';

interface MasonryGalleryProps {
  artworks: Artwork[];
  columns?: number;
  gap?: number;
  onLike?: (artworkId: string) => void;
  onAddToCart?: (artworkId: string) => void;
  className?: string;
}

const MasonryGallery = ({ 
  artworks, 
  columns = 3, 
  gap = 24,
  onLike,
  onAddToCart,
  className = ''
}: MasonryGalleryProps) => {

  const [itemPositions, setItemPositions] = useState<{ x: number; y: number; width: number }[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Calculate responsive columns
  const getResponsiveColumns = () => {
    if (typeof window === 'undefined') {
      return columns;
    }

    const width = window.innerWidth;
    if (width < 640) {
      return 1;
    }
    if (width < 1024) {
      return Math.min(2, columns);
    }
    return columns;
  };

  const [responsiveColumns, setResponsiveColumns] = useState(getResponsiveColumns());

  useEffect(() => {
    const handleResize = () => {
      setResponsiveColumns(getResponsiveColumns());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columns]);

  // Calculate masonry layout
  useEffect(() => {
    if (!containerRef.current || artworks.length === 0) {
      return;
    }

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const columnWidth = (containerWidth - gap * (responsiveColumns - 1)) / responsiveColumns;
    
    // Initialize column heights
    const heights = new Array(responsiveColumns).fill(0);
    const positions: { x: number; y: number; width: number }[] = [];

    artworks.forEach((artwork) => {
      // Find the shortest column
      const shortestColumnIndex = heights.indexOf(Math.min(...heights));
      
      // Calculate position
      const x = shortestColumnIndex * (columnWidth + gap);
      const y = heights[shortestColumnIndex];
      
      // Calculate height based on artwork aspect ratio
      const mainImage = artwork.images.find(img => img.isMain) || artwork.images[0];
      const aspectRatio = mainImage ? mainImage.height / mainImage.width : 1.25;
      const imageHeight = columnWidth * aspectRatio;
      const cardPadding = 120; // Approximate padding for text content
      const totalHeight = imageHeight + cardPadding;
      
      positions.push({ x, y, width: columnWidth });
      
      // Update column height
      heights[shortestColumnIndex] += totalHeight + gap;
    });

    setColumnHeights(heights);
    setItemPositions(positions);
    setContainerHeight(Math.max(...heights));
  }, [artworks, responsiveColumns, gap]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
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

  if (artworks.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No artworks to display</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: containerHeight }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {artworks.map((artwork, index) => {
        const position = itemPositions[index];
        if (!position) {
          return null;
        }

        return (
          <motion.div
            key={artwork.id}
            className="absolute"
            style={{
              left: position.x,
              top: position.y,
              width: position.width
            }}
            variants={itemVariants}
            layout
            layoutId={artwork.id}
          >
            <ArtworkHover
              artwork={artwork}
              onLike={onLike}
              onAddToCart={onAddToCart}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default MasonryGallery;
