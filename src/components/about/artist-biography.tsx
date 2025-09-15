'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, GraduationCap, Palette, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSanityImageUrl, getSafeText, getSafeArray, formatYearRange } from '@/lib/sanity/fetch';

interface ArtistBiographyProps {
  artist?: any;
  settings?: any;
}

const ArtistBiography = ({ artist, settings }: ArtistBiographyProps) => {
  // Get data from Sanity or use fallbacks
  const artistName = artist?.name || 'Jennifer Watkins';
  const bio = artist?.bio || 'Jennifer Watkins is a contemporary artist whose work explores the delicate balance between chaos and order, finding beauty in the unexpected intersections of color, form, and emotion.';
  const profileImageUrl = getSanityImageUrl(artist?.profileImage);
  const location = artist?.location;
  const activeSince = artist?.activeSince || 2018;
  const primaryMedium = artist?.primaryMedium || 'Mixed Media';
  const nationality = artist?.nationality || 'American';

  // Education data from Sanity or fallback
  const education = getSafeArray(artist?.education);
  const fallbackEducation = [
    {
      degree: 'Master of Fine Arts',
      field: 'Contemporary Art Practice',
      institution: 'Yale School of Art',
      location: { city: 'New Haven', country: 'United States' },
      startYear: 2016,
      endYear: 2018,
      description: 'Focused on mixed media and conceptual art practices'
    },
    {
      degree: 'Bachelor of Fine Arts',
      field: 'Painting and Drawing',
      institution: 'Rhode Island School of Design',
      location: { city: 'Providence', country: 'United States' },
      startYear: 2012,
      endYear: 2016,
      description: 'Magna Cum Laude, Dean\'s List'
    }
  ];

  // Career timeline from Sanity or fallback
  const timeline = getSafeArray(artist?.careerTimeline);
  const fallbackTimeline = [
    {
      year: '2024',
      title: 'Current Studio Practice',
      description: 'Working from a converted warehouse studio in Brooklyn, focusing on large-scale mixed media works.'
    },
    {
      year: '2022',
      title: 'International Recognition',
      description: 'Featured in Artforum\'s "Artists to Watch" and acquired by the Whitney Museum.'
    },
    {
      year: '2020',
      title: 'First Solo Exhibition',
      description: 'Debut solo show "Liminal Spaces" at Gallery Modern, New York.'
    },
    {
      year: '2018',
      title: 'Graduate Studies Completed',
      description: 'Graduated from Yale School of Art with MFA in Contemporary Art Practice.'
    }
  ];

  const displayEducation = education.length > 0 ? education : fallbackEducation;
  const displayTimeline = timeline.length > 0 ? timeline : fallbackTimeline;

  return (
    <section className="py-20 bg-sage-green/5 dark:bg-sage-green/10">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Artist Image and Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Main Portrait */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg artwork-frame">
              <Image
                src={profileImageUrl || "/artistpic.png"}
                alt={`${artistName} - Contemporary Artist`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">Based in</div>
                  <div className="text-xs text-muted-foreground">{location?.city || 'Brooklyn'}, {location?.country || 'NY'}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">Active Since</div>
                  <div className="text-xs text-muted-foreground">{activeSince}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Palette className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">Primary Medium</div>
                  <div className="text-xs text-muted-foreground">{primaryMedium}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <GraduationCap className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-sm font-medium">Education</div>
                  <div className="text-xs text-muted-foreground">
                    {displayEducation[0]?.degree ? `${displayEducation[0].degree.split(' ').map(word => word[0]).join('')}, ${displayEducation[0].institution.split(' ').pop()}` : 'MFA, Yale'}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact CTA */}
            <Card className="bg-gallery-gold/10 border-gallery-gold/20">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 mx-auto mb-4 text-gallery-gold" />
                <h3 className="font-semibold mb-2">Get in Touch</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Interested in commissioning a piece or learning more about my work?
                </p>
                <Button 
                  className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black"
                  asChild
                >
                  <Link href="/contact">Contact Me</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Biography Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Introduction */}
            <div>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                {artistName}
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline">Contemporary Artist</Badge>
                <Badge variant="outline">{primaryMedium}</Badge>
                <Badge variant="outline">{location?.city || 'Brooklyn'}-based</Badge>
              </div>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                {bio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-6">
                Education
              </h3>
              <div className="space-y-4">
                {displayEducation.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">
                              {edu.degree}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {edu.field}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {edu.startYear && edu.endYear ? `${edu.startYear}-${edu.endYear}` : (edu.years || 'N/A')}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-foreground mb-1">
                          {edu.institution}
                        </p>
                        <p className="text-xs text-muted-foreground mb-2">
                          {edu.location?.city && edu.location?.country
                            ? `${edu.location.city}, ${edu.location.country}`
                            : (edu.location || 'N/A')
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {edu.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Career Timeline */}
            <div>
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-6">
                Career Highlights
              </h3>
              <div className="space-y-4">
                {displayTimeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex space-x-4"
                  >
                    <div className="flex-shrink-0 w-16 text-right">
                      <Badge className="bg-gallery-gold text-off-black">
                        {item.year}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArtistBiography;
