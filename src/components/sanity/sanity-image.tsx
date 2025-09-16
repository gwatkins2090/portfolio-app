'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface SanityImageProps {
  image: any
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export const SanityImage = ({
  image,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: SanityImageProps) => {
  if (!image?.asset) {
    return (
      <div 
        className={`bg-gallery-gold/10 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-deep-charcoal/50">No image available</span>
      </div>
    )
  }

  const imageUrl = urlFor(image)
    .width(width)
    .height(height)
    .fit('crop')
    .auto('format')
    .quality(85)
    .url()

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
};
