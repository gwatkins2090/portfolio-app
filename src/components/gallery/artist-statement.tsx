'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Quote } from 'lucide-react';

const ArtistStatement = () => {
  return (
    <section className="py-20 bg-sage-green/10 dark:bg-sage-green/5">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Artist Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg artwork-frame">
              <Image
                src="/artistpic.png"
                alt="Jennifer Watkins - Contemporary Artist"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Floating Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -right-8 bg-gallery-gold text-off-black p-6 rounded-lg shadow-lg max-w-xs"
            >
              <Quote className="h-6 w-6 mb-2 opacity-60" />
              <p className="text-sm font-medium italic">
                "Art is not what you see, but what you make others see."
              </p>
            </motion.div>
          </motion.div>

          {/* Artist Statement Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6"
              >
                Artist Statement
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="space-y-6 text-lg text-muted-foreground leading-relaxed"
              >
                <p>
                  My work explores the delicate balance between chaos and order, 
                  finding beauty in the unexpected intersections of color, form, 
                  and emotion. Each piece begins as a conversation between my 
                  conscious intentions and the spontaneous discoveries that emerge 
                  through the creative process.
                </p>
                
                <p>
                  Drawing inspiration from both the natural world and urban landscapes, 
                  I seek to capture moments of transformation—those fleeting instances 
                  where light shifts, seasons change, or human experience crystallizes 
                  into something profound and universal.
                </p>
                
                <p>
                  Through a combination of traditional techniques and contemporary 
                  approaches, I invite viewers to pause, reflect, and discover their 
                  own narratives within the visual language I create.
                </p>
              </motion.div>
            </div>

            {/* Artist Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="border-l-4 border-gallery-gold pl-6 space-y-2"
            >
              <h3 className="text-2xl font-serif font-semibold text-foreground">
                Jennifer Watkins
              </h3>
              <p className="text-muted-foreground">
                Contemporary Artist & Visual Storyteller
              </p>
              <p className="text-sm text-muted-foreground">
                Based in New York • Active since 2018
              </p>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-6 py-6 border-t border-border/50"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gallery-gold mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Artworks Created</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gallery-gold mb-1">12</div>
                <div className="text-sm text-muted-foreground">Exhibitions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gallery-gold mb-1">3</div>
                <div className="text-sm text-muted-foreground">Awards</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black font-medium"
                asChild
              >
                <Link href="/about">
                  Read Full Biography
                </Link>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArtistStatement;
