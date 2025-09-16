import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Package, Shield, Clock, Globe, Truck, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping Information | Jennifer Watkins - Art Delivery & Packaging',
  description: 'Learn about our careful artwork packaging and shipping process. We ensure your art arrives safely with professional packaging and insured delivery.',
  keywords: ['art shipping', 'artwork packaging', 'delivery', 'Jennifer Watkins', 'art protection'],
  openGraph: {
    title: 'Shipping Information | Jennifer Watkins Contemporary Art',
    description: 'Professional artwork packaging and secure delivery worldwide.',
    type: 'website',
  },
};

const ShippingPage = () => {
  const shippingMethods = [
    {
      name: 'Standard Shipping',
      timeframe: '5-7 business days',
      description: 'Reliable delivery with tracking and insurance',
      icon: Package,
      price: 'From $25'
    },
    {
      name: 'Express Shipping',
      timeframe: '2-3 business days',
      description: 'Expedited delivery for urgent orders',
      icon: Clock,
      price: 'From $50'
    },
    {
      name: 'International Shipping',
      timeframe: '7-14 business days',
      description: 'Worldwide delivery with customs handling',
      icon: Globe,
      price: 'From $75'
    },
    {
      name: 'White Glove Delivery',
      timeframe: 'Scheduled',
      description: 'Premium service with installation assistance',
      icon: Heart,
      price: 'Quote on request'
    }
  ];

  const packagingSteps = [
    {
      step: 1,
      title: 'Protective Wrapping',
      description: 'Each artwork is wrapped in acid-free tissue paper and protective film'
    },
    {
      step: 2,
      title: 'Corner Protection',
      description: 'Custom corner guards are applied to protect vulnerable edges and corners'
    },
    {
      step: 3,
      title: 'Cushioned Backing',
      description: 'Rigid backing board provides structural support during transit'
    },
    {
      step: 4,
      title: 'Moisture Barrier',
      description: 'Waterproof wrapping protects against humidity and moisture'
    },
    {
      step: 5,
      title: 'Custom Crating',
      description: 'Large pieces receive custom wooden crates for maximum protection'
    },
    {
      step: 6,
      title: 'Final Inspection',
      description: 'Each package is inspected and photographed before shipping'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 md:py-20">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Shipping & Delivery
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Every artwork is treated with the utmost care and attention. Our professional packaging 
                ensures your piece arrives in perfect condition, ready to grace your space.
              </p>
            </div>

            {/* Hero Section */}
            <div className="mb-16">
              <Card className="bg-gradient-to-r from-gallery-gold/10 to-sage-green/10 border-gallery-gold/20">
                <CardContent className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Shield className="h-8 w-8 text-gallery-gold" />
                        <h2 className="text-2xl font-serif font-semibold text-foreground">
                          Museum-Quality Protection
                        </h2>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        We use the same professional packaging standards employed by museums and galleries 
                        worldwide. Your artwork is not just shipped&mdash;it&apos;s carefully transported with the
                        respect and protection it deserves.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-gallery-gold/10 text-gallery-gold border-gallery-gold/30">
                          Fully Insured
                        </Badge>
                        <Badge variant="outline" className="bg-sage-green/10 text-sage-green border-sage-green/30">
                          Tracking Included
                        </Badge>
                        <Badge variant="outline" className="bg-dusty-rose/10 text-dusty-rose border-dusty-rose/30">
                          Professional Materials
                        </Badge>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-gallery-gold to-terracotta shadow-2xl mb-4">
                        <Package className="h-16 w-16 text-warm-white" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Every package is a work of art in itself
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Shipping Methods */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                  Shipping Options
                </h2>
                <p className="text-lg text-muted-foreground">
                  Choose the delivery method that best suits your needs
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {shippingMethods.map((method, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gallery-gold/10 flex items-center justify-center">
                          <method.icon className="h-6 w-6 text-gallery-gold" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{method.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                      <div className="space-y-2">
                        <div className="text-lg font-bold text-gallery-gold">{method.price}</div>
                        <div className="text-sm text-muted-foreground">{method.timeframe}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Packaging Process */}
            <section className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                  Our Packaging Process
                </h2>
                <p className="text-lg text-muted-foreground">
                  A meticulous six-step process ensures your artwork&apos;s safety
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packagingSteps.map((step, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gallery-gold text-off-black font-bold flex items-center justify-center text-sm">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Shipping Costs */}
            <section className="mb-16">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
                    Shipping Costs & Policies
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">Domestic Shipping (US)</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-gallery-gold">•</span>
                          <span>Small prints (up to 16&quot;): $25</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gallery-gold">•</span>
                          <span>Medium artworks (16&quot;-30&quot;): $45</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gallery-gold">•</span>
                          <span>Large artworks (30&quot;+): $75</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gallery-gold">•</span>
                          <span>Free shipping on orders over $500</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">International Shipping</h3>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-gallery-gold">•</span>
                          <span>Canada & Mexico: Starting at $75</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gallery-gold">•</span>
                          <span>Europe & UK: Starting at $125</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gallery-gold">•</span>
                          <span>Asia & Australia: Starting at $150</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gallery-gold">•</span>
                          <span>Customs duties are buyer&apos;s responsibility</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Shield className="h-8 w-8 text-gallery-gold mx-auto mb-3" />
                      <h4 className="font-semibold text-foreground mb-2">Fully Insured</h4>
                      <p className="text-sm text-muted-foreground">
                        All shipments are fully insured for their purchase value
                      </p>
                    </div>
                    <div className="text-center">
                      <Truck className="h-8 w-8 text-gallery-gold mx-auto mb-3" />
                      <h4 className="font-semibold text-foreground mb-2">Real-Time Tracking</h4>
                      <p className="text-sm text-muted-foreground">
                        Track your artwork from studio to doorstep
                      </p>
                    </div>
                    <div className="text-center">
                      <Heart className="h-8 w-8 text-gallery-gold mx-auto mb-3" />
                      <h4 className="font-semibold text-foreground mb-2">Personal Care</h4>
                      <p className="text-sm text-muted-foreground">
                        Each package is personally prepared by the artist
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Special Considerations */}
            <section className="mb-16">
              <Card className="bg-sage-green/5 border-sage-green/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-6">
                    Special Artwork Considerations
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Original Paintings</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Allow 2-3 weeks for oil paintings to fully cure before shipping</li>
                        <li>• Varnished surfaces receive extra protection during transport</li>
                        <li>• Temperature-controlled shipping for climate-sensitive works</li>
                        <li>• Custom crating for all paintings over 24 inches</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Prints & Paper Works</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Flat-packed between rigid boards to prevent bending</li>
                        <li>• Moisture-resistant packaging for all paper works</li>
                        <li>• Archival materials used throughout packaging process</li>
                        <li>• Ready to ship within 1-2 business days</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Contact for Questions */}
            <section>
              <Card className="bg-gradient-to-r from-dusty-rose/10 to-gallery-gold/10 border-dusty-rose/20">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                    Questions About Shipping?
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    We&apos;re here to help ensure your artwork arrives safely. Contact us for custom shipping
                    quotes, special delivery requirements, or any questions about our packaging process.
                  </p>
                  <div className="bg-background/50 p-6 rounded-lg inline-block">
                    <p className="text-foreground font-medium mb-2">Shipping Inquiries</p>
                    <p className="text-muted-foreground mb-1">Email: shipping@jenniferwatkins.art</p>
                    <p className="text-muted-foreground">Response time: Within 24 hours</p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPage;
