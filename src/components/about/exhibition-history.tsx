'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, Award, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Exhibition {
  id: string;
  title: string;
  type: 'solo' | 'group' | 'art-fair' | 'museum';
  venue: string;
  location: string;
  startDate: string;
  endDate: string;
  year: number;
  description: string;
  curator?: string;
  artworks?: string[];
  press?: string[];
  awards?: string[];
  website?: string;
  isUpcoming?: boolean;
}

interface ExhibitionHistoryProps {
  settings?: any;
}

const ExhibitionHistory = () => {
  const [expandedExhibition, setExpandedExhibition] = useState<string | null>(null);

  const exhibitions: Exhibition[] = [
    {
      id: '1',
      title: 'Liminal Spaces: New Works',
      type: 'solo',
      venue: 'Gallery Modern',
      location: 'New York, NY',
      startDate: '2024-03-15',
      endDate: '2024-04-20',
      year: 2024,
      description: 'A comprehensive survey of recent mixed media works exploring themes of transition and transformation.',
      curator: 'Maria Rodriguez',
      artworks: ['Threshold I', 'Threshold II', 'Between Worlds', 'Metamorphosis Series (1-8)'],
      press: ['Artforum Review', 'New York Times Feature'],
      website: 'https://gallerychen.com/exhibitions/liminal-spaces'
    },
    {
      id: '2',
      title: 'Emerging Voices',
      type: 'group',
      venue: 'Whitney Museum of American Art',
      location: 'New York, NY',
      startDate: '2023-09-10',
      endDate: '2024-01-15',
      year: 2023,
      description: 'Group exhibition featuring 12 emerging contemporary artists working across various media.',
      curator: 'David Kim',
      artworks: ['Urban Meditation #3', 'Color Study in Blue'],
      awards: ['Whitney Biennial Consideration'],
      website: 'https://whitney.org/exhibitions/emerging-voices'
    },
    {
      id: '3',
      title: 'Art Basel Miami Beach',
      type: 'art-fair',
      venue: 'Miami Beach Convention Center',
      location: 'Miami Beach, FL',
      startDate: '2023-12-06',
      endDate: '2023-12-10',
      year: 2023,
      description: 'Represented by Gallery Modern at one of the world\'s premier art fairs.',
      artworks: ['Convergence', 'Tidal Patterns'],
      press: ['ARTnews Coverage', 'Hyperallergic Review']
    },
    {
      id: '4',
      title: 'First Light',
      type: 'solo',
      venue: 'Meridian Gallery',
      location: 'San Francisco, CA',
      startDate: '2022-05-12',
      endDate: '2022-06-25',
      year: 2022,
      description: 'Debut solo exhibition featuring early works from the artist\'s graduate studies.',
      curator: 'Jennifer Walsh',
      artworks: ['Dawn Series (1-6)', 'Reflection Pool', 'Morning Glory'],
      website: 'https://meridiangallery.com/exhibitions/first-light'
    },
    {
      id: '5',
      title: 'Future Visions',
      type: 'group',
      venue: 'Museum of Contemporary Art',
      location: 'Los Angeles, CA',
      startDate: '2025-06-01',
      endDate: '2025-09-15',
      year: 2025,
      description: 'Upcoming group exhibition exploring contemporary art\'s response to technological advancement.',
      curator: 'Sarah Thompson',
      isUpcoming: true,
      website: 'https://moca.org/exhibitions/future-visions'
    }
  ];

  const upcomingExhibitions = exhibitions.filter(ex => ex.isUpcoming);
  const pastExhibitions = exhibitions.filter(ex => !ex.isUpcoming).sort((a, b) => b.year - a.year);






  return (
    <section className="py-20 bg-muted/30">
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
              Exhibition History
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A chronological journey through solo exhibitions, group shows, and art fair presentations 
              that have shaped my artistic career.
            </p>
          </motion.div>

          {/* Tabs for Upcoming vs Past */}
          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="all">All Exhibitions</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <ExhibitionList exhibitions={exhibitions} expandedExhibition={expandedExhibition} setExpandedExhibition={setExpandedExhibition} />
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-8">
              <ExhibitionList exhibitions={upcomingExhibitions} expandedExhibition={expandedExhibition} setExpandedExhibition={setExpandedExhibition} />
            </TabsContent>

            <TabsContent value="past" className="space-y-8">
              <ExhibitionList exhibitions={pastExhibitions} expandedExhibition={expandedExhibition} setExpandedExhibition={setExpandedExhibition} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

interface ExhibitionListProps {
  exhibitions: Exhibition[];
  expandedExhibition: string | null;
  setExpandedExhibition: (id: string | null) => void;
}

const ExhibitionList = ({ exhibitions, expandedExhibition, setExpandedExhibition }: ExhibitionListProps) => {
  const getTypeColor = (type: Exhibition['type']) => {
    switch (type) {
      case 'solo': return 'bg-gallery-gold text-off-black';
      case 'group': return 'bg-sage-green text-white';
      case 'art-fair': return 'bg-dusty-rose text-white';
      case 'museum': return 'bg-slate-blue text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: Exhibition['type']) => {
    switch (type) {
      case 'solo': return 'Solo Exhibition';
      case 'group': return 'Group Exhibition';
      case 'art-fair': return 'Art Fair';
      case 'museum': return 'Museum Exhibition';
      default: return type;
    }
  };

  const formatDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
      return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.getDate()}, ${end.getFullYear()}`;
    }
    
    return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="space-y-6">
      {exhibitions.map((exhibition, index) => (
        <motion.div
          key={exhibition.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
            exhibition.isUpcoming ? 'border-gallery-gold/50 bg-gallery-gold/5' : ''
          }`}>
            <CardContent className="p-0">
              {/* Main Exhibition Info */}
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setExpandedExhibition(
                  expandedExhibition === exhibition.id ? null : exhibition.id
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge className={getTypeColor(exhibition.type)}>
                        {getTypeLabel(exhibition.type)}
                      </Badge>
                      {exhibition.isUpcoming && (
                        <Badge variant="outline" className="border-gallery-gold text-gallery-gold">
                          Upcoming
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">
                        {exhibition.year}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
                      {exhibition.title}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{exhibition.venue}, {exhibition.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(exhibition.startDate, exhibition.endDate)}</span>
                      </div>
                      {exhibition.curator && (
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>Curated by {exhibition.curator}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                      {exhibition.description}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-4 flex-shrink-0"
                  >
                    {expandedExhibition === exhibition.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedExhibition === exhibition.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border"
                  >
                    <div className="p-6 space-y-6">
                      {/* Artworks */}
                      {exhibition.artworks && exhibition.artworks.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Featured Artworks</h4>
                          <div className="flex flex-wrap gap-2">
                            {exhibition.artworks.map((artwork, idx) => (
                              <Badge key={idx} variant="outline">
                                {artwork}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Press Coverage */}
                      {exhibition.press && exhibition.press.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Press Coverage</h4>
                          <div className="space-y-2">
                            {exhibition.press.map((press, idx) => (
                              <div key={idx} className="text-sm text-muted-foreground">
                                • {press}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Awards */}
                      {exhibition.awards && exhibition.awards.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center">
                            <Award className="h-4 w-4 mr-2" />
                            Awards & Recognition
                          </h4>
                          <div className="space-y-2">
                            {exhibition.awards.map((award, idx) => (
                              <div key={idx} className="text-sm text-muted-foreground">
                                • {award}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Website Link */}
                      {exhibition.website && (
                        <div className="pt-4 border-t border-border">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="text-primary hover:text-primary/80"
                          >
                            <a 
                              href={exhibition.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              <span>View Exhibition Details</span>
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ExhibitionHistory;
