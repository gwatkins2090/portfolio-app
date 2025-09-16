'use client';

import { motion } from 'framer-motion';
import { Award, Trophy, Star, Medal, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AwardItem {
  id: string;
  title: string;
  organization: string;
  year: number;
  category: 'award' | 'grant' | 'residency' | 'publication' | 'collection';
  description: string;
  amount?: string;
  website?: string;
  significance: 'major' | 'notable' | 'emerging';
}

interface AwardsAndRecognitionProps {
  settings?: any;
}

const AwardsAndRecognition = ({ settings }: AwardsAndRecognitionProps) => {
  // Get awards data from Sanity or use fallback
  const awardsSection = settings?.awardsSection;
  const sectionTitle = awardsSection?.title || 'Awards & Recognition';
  const sanityAwards = awardsSection?.entries || [];

  // Fallback awards data
  const fallbackAwards: AwardItem[] = [
    {
      id: '1',
      title: 'Whitney Biennial Artist Selection',
      organization: 'Whitney Museum of American Art',
      year: 2024,
      category: 'award',
      description: 'Selected as one of 63 artists for the prestigious Whitney Biennial, showcasing the most compelling new directions in contemporary American art.',
      significance: 'major',
      website: 'https://whitney.org/exhibitions/2024-biennial'
    },
    {
      id: '2',
      title: 'Emerging Artist Grant',
      organization: 'National Endowment for the Arts',
      year: 2023,
      category: 'grant',
      description: 'Awarded funding to support the development of new mixed media works exploring themes of cultural identity and transformation.',
      amount: '$25,000',
      significance: 'major'
    },
    {
      id: '3',
      title: 'Artist in Residence',
      organization: 'Yaddo',
      year: 2023,
      category: 'residency',
      description: 'Two-month residency at the historic artists\' colony in Saratoga Springs, NY, resulting in the creation of the "Liminal Spaces" series.',
      significance: 'notable',
      website: 'https://yaddo.org'
    }
  ];

  // Transform Sanity data to match component interface
  interface SanityAward {
    title?: string;
    organization?: string;
    year?: string | number;
    type?: string;
    description?: string;
    significance?: string;
    website?: string;
  }

  const transformedSanityAwards: AwardItem[] = sanityAwards.map((award: SanityAward, index: number) => ({
    id: `sanity-${index}`,
    title: award.title || 'Untitled Award',
    organization: award.organization || 'Unknown Organization',
    year: parseInt(award.year) || new Date().getFullYear(),
    category: 'award' as const, // Default category since Sanity schema doesn't have this
    description: award.description || '',
    significance: 'notable' as const, // Default significance
  }));

  // Use Sanity data if available, otherwise fallback
  const awards = transformedSanityAwards.length > 0 ? transformedSanityAwards : fallbackAwards;

  const getIcon = (category: AwardItem['category']) => {
    switch (category) {
      case 'award': return Award;
      case 'grant': return Trophy;
      case 'residency': return Star;
      case 'publication': return Medal;
      case 'collection': return Medal;
      default: return Award;
    }
  };

  const getCategoryColor = (category: AwardItem['category']) => {
    switch (category) {
      case 'award': return 'bg-gallery-gold text-off-black';
      case 'grant': return 'bg-sage-green text-white';
      case 'residency': return 'bg-dusty-rose text-white';
      case 'publication': return 'bg-slate-blue text-white';
      case 'collection': return 'bg-terracotta text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSignificanceColor = (significance: AwardItem['significance']) => {
    switch (significance) {
      case 'major': return 'border-gallery-gold bg-gallery-gold/5';
      case 'notable': return 'border-sage-green bg-sage-green/5';
      case 'emerging': return 'border-dusty-rose bg-dusty-rose/5';
      default: return 'border-border';
    }
  };

  const getCategoryLabel = (category: AwardItem['category']) => {
    switch (category) {
      case 'award': return 'Award';
      case 'grant': return 'Grant';
      case 'residency': return 'Residency';
      case 'publication': return 'Publication';
      case 'collection': return 'Collection';
      default: return category;
    }
  };

  // Group awards by significance
  const majorAwards = awards.filter(award => award.significance === 'major');
  const notableAwards = awards.filter(award => award.significance === 'notable');
  const emergingAwards = awards.filter(award => award.significance === 'emerging');

  const sortedAwards = [...majorAwards, ...notableAwards, ...emergingAwards].sort((a, b) => b.year - a.year);

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
              {sectionTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Recognition from prestigious institutions and organizations that have supported 
              and celebrated my artistic journey and contributions to contemporary art.
            </p>
          </motion.div>

          {/* Awards Grid */}
          <div className="space-y-8">
            {sortedAwards.map((award, index) => {
              const IconComponent = getIcon(award.category);
              
              return (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`transition-all duration-300 hover:shadow-lg ${getSignificanceColor(award.significance)}`}>
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-6">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${getCategoryColor(award.category)}`}>
                          <IconComponent className="h-8 w-8" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge className={getCategoryColor(award.category)}>
                                  {getCategoryLabel(award.category)}
                                </Badge>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  <span>{award.year}</span>
                                </div>
                                {award.significance === 'major' && (
                                  <Badge variant="outline" className="border-gallery-gold text-gallery-gold">
                                    Major Recognition
                                  </Badge>
                                )}
                              </div>
                              
                              <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                                {award.title}
                              </h3>
                              
                              <p className="text-lg font-medium text-muted-foreground mb-3">
                                {award.organization}
                              </p>
                              
                              {award.amount && (
                                <div className="text-lg font-semibold text-gallery-gold mb-3">
                                  {award.amount}
                                </div>
                              )}
                            </div>
                          </div>

                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {award.description}
                          </p>

                          {award.website && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="text-primary hover:text-primary/80"
                            >
                              <a 
                                href={award.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2"
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span>Learn More</span>
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Summary Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <Card className="bg-muted/30">
              <CardContent className="p-12">
                <h3 className="text-2xl font-serif font-semibold text-foreground text-center mb-8">
                  Recognition Summary
                </h3>
                
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-gallery-gold mb-2">
                      {majorAwards.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Major Awards
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-3xl font-bold text-sage-green mb-2">
                      {awards.filter(a => a.category === 'grant').length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Grants Received
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-3xl font-bold text-dusty-rose mb-2">
                      {awards.filter(a => a.category === 'residency').length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Artist Residencies
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-3xl font-bold text-slate-blue mb-2">
                      {awards.filter(a => a.category === 'collection').length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Museum Collections
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AwardsAndRecognition;
