import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Terms of Service | Jennifer Watkins - Contemporary Art Portfolio',
  description: 'Terms of service for Jennifer Watkins art portfolio and artwork sales. Learn about our policies for purchases, commissions, and intellectual property.',
  keywords: ['terms of service', 'art sales', 'commissions', 'Jennifer Watkins', 'artwork purchase'],
  openGraph: {
    title: 'Terms of Service | Jennifer Watkins Contemporary Art',
    description: 'Terms and conditions for artwork purchases and commissions.',
    type: 'website',
  },
};

const TermsPage = () => {
  const lastUpdated = "December 2024";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12 md:py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-muted-foreground">
                Please read these terms carefully before purchasing artwork or using our services.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Last updated: {lastUpdated}
              </p>
            </div>

            <Card>
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  
                  {/* Introduction */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      1. Agreement to Terms
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      These Terms of Service (&quot;Terms&quot;) govern your use of Jennifer Watkins&apos; art portfolio website
                      and the purchase of artwork. By accessing our website or purchasing artwork, you agree to be 
                      bound by these Terms.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      If you do not agree to these Terms, please do not use our website or purchase our artwork. 
                      We reserve the right to modify these Terms at any time, and such modifications will be effective 
                      immediately upon posting.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Artwork Sales */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      2. Artwork Sales and Purchases
                    </h2>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Original Artworks
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>All original artworks are one-of-a-kind pieces created by Jennifer Watkins</li>
                      <li>Prices are listed in USD and are subject to change without notice</li>
                      <li>Original artworks are sold on a first-come, first-served basis</li>
                      <li>Once sold, original pieces cannot be reproduced or recreated</li>
                      <li>Each original artwork comes with a certificate of authenticity</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Limited Edition Prints
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>Limited edition prints are produced in specified quantities</li>
                      <li>Each print is numbered and signed by the artist</li>
                      <li>Print editions are limited and will not be reprinted once sold out</li>
                      <li>High-quality archival materials are used for all prints</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Order Process
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>Orders are confirmed upon receipt of full payment</li>
                      <li>We reserve the right to cancel orders due to pricing errors or availability</li>
                      <li>Order confirmation will be sent via email within 24 hours</li>
                      <li>Custom framing options may be available for additional cost</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  {/* Commissions */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      3. Commission Agreements
                    </h2>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Commission Process
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>All commissions require a detailed written agreement before work begins</li>
                      <li>A 50% deposit is required to begin work on commissioned pieces</li>
                      <li>Timeline for completion will be specified in the commission agreement</li>
                      <li>Progress updates and photos will be provided during the creation process</li>
                      <li>Final approval is required before completion and final payment</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Commission Terms
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>Commissioned works are created based on client specifications and artist interpretation</li>
                      <li>Minor revisions may be accommodated during the creation process</li>
                      <li>Major changes may require additional fees and extended timeline</li>
                      <li>The artist retains the right to photograph and display commissioned works for portfolio purposes</li>
                      <li>Commissioned pieces cannot be returned once completed and approved</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  {/* Payment Terms */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      4. Payment Terms
                    </h2>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>Payment is required in full at the time of purchase for original artworks and prints</li>
                      <li>We accept major credit cards, PayPal, and bank transfers</li>
                      <li>All payments are processed securely through certified payment providers</li>
                      <li>Prices do not include applicable taxes, which will be calculated at checkout</li>
                      <li>For international orders, customers are responsible for any customs duties or import taxes</li>
                      <li>Payment plans may be available for high-value purchases (contact us for details)</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  {/* Shipping and Delivery */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      5. Shipping and Delivery
                    </h2>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>All artworks are carefully packaged using professional art shipping materials</li>
                      <li>Shipping costs are calculated based on size, weight, and destination</li>
                      <li>Delivery timeframes vary by location and shipping method selected</li>
                      <li>Insurance and tracking are included with all shipments</li>
                      <li>International shipping is available to most countries</li>
                      <li>Local delivery may be available in certain areas for an additional fee</li>
                      <li>Risk of loss transfers to the buyer upon delivery</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  {/* Returns and Exchanges */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      6. Returns and Exchanges
                    </h2>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Return Policy
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>Original artworks may be returned within 7 days of delivery if not as described</li>
                      <li>Prints may be returned within 14 days of delivery in original condition</li>
                      <li>All returns must be pre-approved and include original packaging</li>
                      <li>Return shipping costs are the responsibility of the buyer unless item was damaged or misrepresented</li>
                      <li>Refunds will be processed within 5-7 business days of receiving returned items</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Damage Claims
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>Any damage must be reported within 48 hours of delivery</li>
                      <li>Photos of damage and packaging must be provided for insurance claims</li>
                      <li>We will work with shipping carriers to resolve damage claims</li>
                      <li>Replacement or refund will be provided for verified damage claims</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  {/* Intellectual Property */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      7. Intellectual Property Rights
                    </h2>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Copyright and Ownership
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>Jennifer Watkins retains all copyright and intellectual property rights to her artworks</li>
                      <li>Purchase of artwork grants ownership of the physical piece only, not reproduction rights</li>
                      <li>Buyers may not reproduce, copy, or create derivative works without written permission</li>
                      <li>Commercial use of artwork images requires separate licensing agreement</li>
                      <li>The artist reserves the right to use images of sold works for promotional purposes</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Website Content
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>All website content, including text, images, and design, is protected by copyright</li>
                      <li>Users may not copy, reproduce, or distribute website content without permission</li>
                      <li>Unauthorized use of website content may result in legal action</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  {/* User Conduct */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      8. User Conduct and Prohibited Uses
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You agree not to use our website for any unlawful purpose or in any way that could damage, 
                      disable, or impair our services. Prohibited uses include:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>Attempting to gain unauthorized access to our systems</li>
                      <li>Using automated systems to access or collect information from our website</li>
                      <li>Posting or transmitting harmful, offensive, or illegal content</li>
                      <li>Interfering with other users&apos; enjoyment of our website</li>
                      <li>Violating any applicable laws or regulations</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  {/* Limitation of Liability */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      9. Limitation of Liability
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      To the fullest extent permitted by law, Jennifer Watkins shall not be liable for any indirect, 
                      incidental, special, consequential, or punitive damages arising from your use of our website 
                      or purchase of artwork.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Our total liability for any claim related to our services shall not exceed the amount paid 
                      for the specific artwork or service in question.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Governing Law */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      10. Governing Law and Dispute Resolution
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      These Terms shall be governed by and construed in accordance with the laws of [Your State/Country], 
                      without regard to its conflict of law provisions.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Any disputes arising from these Terms or your use of our services shall be resolved through 
                      binding arbitration in accordance with the rules of the American Arbitration Association.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Contact Information */}
                  <section>
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      11. Contact Information
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="bg-muted/30 p-6 rounded-lg">
                      <p className="text-foreground font-medium mb-2">Jennifer Watkins</p>
                      <p className="text-muted-foreground mb-1">Email: info@jenniferwatkins.art</p>
                      <p className="text-muted-foreground mb-1">Website: www.jenniferwatkins.art</p>
                      <p className="text-muted-foreground">
                        For legal inquiries, please include &quot;Terms of Service&quot; in your subject line.
                      </p>
                    </div>
                  </section>

                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
