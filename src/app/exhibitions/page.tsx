import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Exhibitions | Jennifer Watkins - Contemporary Art Shows',
  description: 'View upcoming and past exhibitions featuring the contemporary artwork of Jennifer Watkins.',
  keywords: ['art exhibitions', 'gallery shows', 'Jennifer Watkins', 'contemporary art', 'art events'],
  openGraph: {
    title: 'Exhibitions | Jennifer Watkins Contemporary Art',
    description: 'Discover upcoming and past exhibitions featuring Jennifer Watkins\' contemporary artwork.',
    type: 'website',
  },
};

const upcomingExhibitions = [
  {
    id: 1,
    title: 'Liminal Spaces: New Works',
    venue: 'Gallery Modern',
    location: 'New York, NY',
    startDate: '2024-03-15',
    endDate: '2024-04-20',
    type: 'Solo Exhibition',
    status: 'upcoming',
    description: 'A collection of new mixed media works exploring the boundaries between physical and emotional spaces.',
    featured: true
  },
  {
    id: 2,
    title: 'Contemporary Voices',
    venue: 'Brooklyn Art Center',
    location: 'Brooklyn, NY',
    startDate: '2024-05-01',
    endDate: '2024-06-15',
    type: 'Group Exhibition',
    status: 'upcoming',
    description: 'Featuring emerging and established contemporary artists from the New York area.',
    featured: false
  }
];

const pastExhibitions = [
  {
    id: 3,
    title: 'Intersections',
    venue: 'Modern Art Gallery',
    location: 'Manhattan, NY',
    startDate: '2023-09-10',
    endDate: '2023-11-05',
    type: 'Solo Exhibition',
    status: 'past',
    description: 'An exploration of urban landscapes and human connections in contemporary society.',
    featured: true
  },
  {
    id: 4,
    title: 'Emerging Artists Showcase',
    venue: 'Whitney Museum',
    location: 'New York, NY',
    startDate: '2023-06-01',
    endDate: '2023-08-30',
    type: 'Group Exhibition',
    status: 'past',
    description: 'Annual showcase featuring the most promising emerging artists in contemporary art.',
    featured: true
  },
  {
    id: 5,
    title: 'Color and Form',
    venue: 'SoHo Gallery',
    location: 'New York, NY',
    startDate: '2023-02-15',
    endDate: '2023-04-10',
    type: 'Group Exhibition',
    status: 'past',
    description: 'A group exhibition focusing on abstract expressionism and contemporary color theory.',
    featured: false
  },
  {
    id: 6,
    title: 'First Light',
    venue: 'Gallery 42',
    location: 'Brooklyn, NY',
    startDate: '2022-11-01',
    endDate: '2023-01-15',
    type: 'Solo Exhibition',
    status: 'past',
    description: 'Debut solo exhibition featuring early works and artistic development.',
    featured: false
  }
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

interface Exhibition {
  id: number;
  title: string;
  venue: string;
  location: string;
  startDate: string;
  endDate: string;
  type: string;
  description: string;
  featured: boolean;
  status: string;
  artworks?: string[];
}

const ExhibitionCard = ({ exhibition }: { exhibition: Exhibition }) => (
  <Card className={`hover:shadow-lg transition-shadow ${exhibition.featured ? 'ring-2 ring-gallery-gold/20' : ''}`}>
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
            {exhibition.title}
          </h3>
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant={exhibition.type === 'Solo Exhibition' ? 'default' : 'outline'}>
              {exhibition.type}
            </Badge>
            {exhibition.featured && (
              <Badge className="bg-gallery-gold text-off-black">Featured</Badge>
            )}
          </div>
        </div>
        {exhibition.status === 'upcoming' && (
          <Badge className="bg-sage-green text-white">Upcoming</Badge>
        )}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="font-medium">{exhibition.venue}</span>
          <span className="mx-2">•</span>
          <span>{exhibition.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>
            {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {exhibition.description}
      </p>

      {exhibition.status === 'upcoming' && (
        <div className="flex gap-2">
          <Button size="sm" className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black">
            Get Details
          </Button>
          <Button size="sm" variant="outline">
            <ExternalLink className="h-4 w-4 mr-1" />
            Venue Info
          </Button>
        </div>
      )}
    </CardContent>
  </Card>
);

const ExhibitionsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 gallery-wall">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 tracking-tight">
                Exhibitions
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Discover where you can experience my artwork in person, from solo shows 
                to group exhibitions at galleries and museums.
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Exhibitions */}
        <section className="py-16">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Upcoming Exhibitions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Mark your calendar for these upcoming opportunities to see new works in person
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {upcomingExhibitions.map((exhibition) => (
                <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
              ))}
            </div>
          </div>
        </section>

        {/* Past Exhibitions */}
        <section className="py-16 bg-sage-green/5 dark:bg-sage-green/10">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Past Exhibitions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A history of exhibitions and shows featuring my artwork
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {pastExhibitions.map((exhibition) => (
                <ExhibitionCard key={exhibition.id} exhibition={exhibition} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gallery-gold/10 dark:bg-gallery-gold/5">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Exhibition Opportunities
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Interested in featuring my work in your gallery or exhibition? 
                I&apos;m always open to discussing new opportunities and collaborations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black" asChild>
                  <Link href="/contact">Propose Exhibition</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/portfolio">View Portfolio</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExhibitionsPage;
