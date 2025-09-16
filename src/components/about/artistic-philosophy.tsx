'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote, Lightbulb, Heart, Eye, Brush } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ArtisticPhilosophyProps {
  settings?: any;
}

const ArtisticPhilosophy = () => {
  const philosophyPillars = [
    {
      icon: Eye,
      title: 'Observation',
      description: 'Finding extraordinary moments in ordinary experiences, capturing the subtle beauty that surrounds us daily.',
      color: 'text-sage-green'
    },
    {
      icon: Heart,
      title: 'Emotion',
      description: 'Creating visceral connections between viewer and artwork, translating feeling into visual language.',
      color: 'text-dusty-rose'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Pushing boundaries between traditional and contemporary techniques, exploring new forms of expression.',
      color: 'text-gallery-gold'
    },
    {
      icon: Brush,
      title: 'Craftsmanship',
      description: 'Honoring the technical mastery of art-making while embracing spontaneity and creative risk-taking.',
      color: 'text-slate-blue'
    }
  ];

  const quotes = [
    {
      text: "Art is not what you see, but what you make others see.",
      author: "Edgar Degas",
      context: "This quote deeply influences my approach to creating work that invites viewers into new ways of seeing."
    },
    {
      text: "The purpose of art is washing the dust of daily life off our souls.",
      author: "Pablo Picasso",
      context: "I believe art should provide moments of transcendence and emotional cleansing."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Artistic Philosophy
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              My work is guided by the belief that art serves as a bridge between 
              the internal landscape of human experience and the external world we inhabit.
            </p>
          </motion.div>

          {/* Main Philosophy Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 mb-20"
          >
            <div className="space-y-6">
              <div className="relative">
                <Quote className="h-12 w-12 text-gallery-gold/30 absolute -top-2 -left-2" />
                <blockquote className="text-2xl font-serif text-foreground leading-relaxed pl-8">
                  &quot;I create to explore the spaces between what we know and what we feel,
                  seeking to make visible the invisible threads that connect us all.&quot;
                </blockquote>
              </div>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  My artistic practice is rooted in the exploration of liminal spaces—
                  those threshold moments where transformation occurs. Whether it&apos;s the
                  shift from day to night, the transition between seasons, or the
                  evolution of human emotion, I&apos;m drawn to capturing these fleeting
                  instances of change.
                </p>
                
                <p>
                  Each piece begins with a question rather than an answer. I approach 
                  the canvas as a space for discovery, allowing the materials and 
                  process to guide me toward unexpected revelations. This methodology 
                  reflects my belief that the most profound art emerges from a 
                  dialogue between intention and spontaneity.
                </p>
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="aspect-[4/5] overflow-hidden rounded-lg artwork-frame"
              >
                <Image
                  src="/artistpic.png"
                  alt="Jennifer Watkins - Contemporary Artist"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              
              {/* Floating Quote */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 bg-background border border-border rounded-lg p-4 shadow-lg max-w-xs"
              >
                <p className="text-sm text-muted-foreground italic">
                  &quot;The studio is my laboratory for exploring the alchemy of color,
                  texture, and emotion.&quot;
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Philosophy Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="text-3xl font-serif font-semibold text-foreground text-center mb-12">
              Core Principles
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {philosophyPillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <pillar.icon className={`h-12 w-12 mx-auto mb-4 ${pillar.color}`} />
                      <h4 className="text-xl font-semibold text-foreground mb-3">
                        {pillar.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Inspirational Quotes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-serif font-semibold text-foreground text-center mb-12">
              Influences & Inspiration
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {quotes.map((quote, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-muted/30">
                    <CardContent className="p-8">
                      <Quote className="h-8 w-8 text-gallery-gold/50 mb-4" />
                      <blockquote className="text-lg font-serif text-foreground mb-4 leading-relaxed">
                        &quot;{quote.text}&quot;
                      </blockquote>
                      <cite className="text-sm font-medium text-muted-foreground">
                        — {quote.author}
                      </cite>
                      <p className="text-sm text-muted-foreground mt-3 italic">
                        {quote.context}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Process Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <Card className="bg-sage-green/5 border-sage-green/20">
              <CardContent className="p-12">
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-6">
                  My Creative Process
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                  Each artwork begins with a period of observation and contemplation. 
                  I spend time in meditation, walking in nature, or simply sitting with 
                  an idea until it begins to take shape. The physical act of creation 
                  then becomes a dance between planning and improvisation, where the 
                  materials themselves become collaborators in the final outcome. 
                  This process reflects my belief that the most authentic art emerges 
                  when we remain open to surprise and discovery.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArtisticPhilosophy;
