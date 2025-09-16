'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { VisualEditingWrapper } from '@/components/sanity/visual-editing-wrapper';

interface GalleryTransitionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;

  titleFieldPath?: string;
  subtitleFieldPath?: string;
}

const GalleryTransition = ({
  children,
  title,
  subtitle,
  backgroundColor = 'bg-muted/30',
  textColor = 'text-foreground',
  className = '',
  settings,
  titleFieldPath,
  subtitleFieldPath
}: GalleryTransitionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true, margin: '-200px' }}
      className={`relative py-32 ${backgroundColor} ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gallery-gold/20 via-transparent to-sage-green/20" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(212, 165, 116, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(139, 154, 122, 0.1) 0%, transparent 50%)`
          }}
        />
      </div>

      <div className="container px-4 relative z-10">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {title && (
              <VisualEditingWrapper
                documentId={settings?._id}
                documentType="portfolioSettings"
                fieldPath={titleFieldPath}
              >
                <h2 className={`text-4xl md:text-6xl font-serif font-bold mb-6 ${textColor}`}>
                  {title}
                </h2>
              </VisualEditingWrapper>
            )}
            {subtitle && (
              <VisualEditingWrapper
                documentId={settings?._id}
                documentType="portfolioSettings"
                fieldPath={subtitleFieldPath}
              >
                <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${textColor.replace('foreground', 'muted-foreground')}`}>
                  {subtitle}
                </p>
              </VisualEditingWrapper>
            )}
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        viewport={{ once: true }}
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-br from-gallery-gold/20 to-transparent blur-xl"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        viewport={{ once: true }}
        className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-gradient-to-br from-sage-green/20 to-transparent blur-xl"
      />
    </motion.section>
  );
};

export default GalleryTransition;
