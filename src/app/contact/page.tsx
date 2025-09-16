import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, Instagram, Twitter, Facebook } from 'lucide-react';
import { getContactPageData } from '@/lib/sanity/fetch';

// Generate metadata - simplified for build stability
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact Jennifer Watkins | Contemporary Artist',
    description: 'Get in touch with Jennifer Watkins for commissions, exhibitions, or general inquiries about contemporary art.',
    keywords: ['contact artist', 'art commissions', 'Jennifer Watkins', 'contemporary art inquiries'],
    openGraph: {
      title: 'Contact Jennifer Watkins | Contemporary Artist',
      description: 'Get in touch with Jennifer Watkins for art commissions, exhibitions, and inquiries.',
      type: 'website',
    },
  };
}

const inquiryTypes = [
  { label: 'Commission Inquiry', description: 'Custom artwork commissions' },
  { label: 'Purchase Inquiry', description: 'Buying existing artworks' },
  { label: 'Exhibition Opportunity', description: 'Gallery and exhibition proposals' },
  { label: 'Press & Media', description: 'Interviews and media requests' },
  { label: 'General Question', description: 'Other inquiries' }
];

const ContactPage = async () => {
  // Temporarily disable data fetching for build stability
  // let data;
  // try {
  //   data = await getContactPageData();
  // } catch (error) {
  //   console.error('Error fetching contact page data:', error);
  //   data = { settings: null, artist: null };
  // }

  // Use static fallback data
  const data = {
    artist: {
      name: 'Jennifer Watkins',
      email: 'jennifer@example.com'
    },
    settings: null
  };

  const { settings, artist } = data;

  // Get contact info from Sanity or use defaults
  const contactEmail = settings?.contact?.email || artist?.contact?.email || 'hello@jenniferwatkins.art';
  const contactPhone = settings?.contact?.phone || artist?.contact?.phone || '+1 (555) 123-4567';
  const studioLocation = settings?.contact?.address?.city || artist?.location?.city || 'Brooklyn';
  const studioState = settings?.contact?.address?.state || artist?.location?.country || 'NY';

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: contactEmail,
      href: `mailto:${contactEmail}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactPhone,
      href: `tel:${contactPhone.replace(/\D/g, '')}`
    },
    {
      icon: MapPin,
      label: 'Studio Location',
      value: `${studioLocation}, ${studioState}`,
      href: null
    },
    {
      icon: Clock,
      label: 'Response Time',
      value: 'Within 24-48 hours',
      href: null
    }
  ];

  // Get social media links from Sanity or use defaults
  const socialMedia = settings?.socialMedia || artist?.socialMedia || {};
  const socialLinks = [
    {
      icon: Instagram,
      label: 'Instagram',
      href: socialMedia.instagram || '#',
      handle: '@jenniferwatkinsart'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: socialMedia.twitter || '#',
      handle: '@jwatkins_art'
    },
    {
      icon: Facebook,
      label: 'Facebook',
      href: socialMedia.facebook || '#',
      handle: 'Jennifer Watkins Art'
    }
  ];
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 gallery-wall">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 tracking-tight">
                Get in Touch
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                I&apos;d love to hear from you. Whether you&apos;re interested in commissioning a piece, 
                discussing an exhibition, or simply want to connect about art.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif">Send a Message</CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and I&apos;ll get back to you as soon as possible.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Your last name" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="What is this regarding?" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Inquiry Type</Label>
                      <div className="flex flex-wrap gap-2">
                        {inquiryTypes.map((type, index) => (
                          <Badge key={index} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                            {type.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <textarea
                        id="message"
                        className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tell me about your project or inquiry..."
                      />
                    </div>
                    
                    <Button className="w-full bg-gallery-gold hover:bg-gallery-gold/90 text-off-black">
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Contact Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{info.label}</div>
                          {info.href ? (
                            <a href={info.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                              {info.value}
                            </a>
                          ) : (
                            <div className="text-sm text-muted-foreground">{info.value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Follow My Work</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Stay updated with my latest artworks and exhibitions
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <social.icon className="h-5 w-5 text-primary" />
                        <div>
                          <div className="text-sm font-medium text-foreground">{social.label}</div>
                          <div className="text-xs text-muted-foreground">{social.handle}</div>
                        </div>
                      </a>
                    ))}
                  </CardContent>
                </Card>

                {/* Studio Information */}
                <Card className="bg-sage-green/10 border-sage-green/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">Studio Visits</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Studio visits are available by appointment. Please reach out to schedule 
                      a time to see works in person and discuss potential commissions.
                    </p>
                    <Button variant="outline" size="sm">
                      Schedule Visit
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
