import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Privacy Policy | Jennifer Watkins - Contemporary Art Portfolio',
  description: 'Privacy policy for Jennifer Watkins art portfolio website. Learn how we collect, use, and protect your personal information.',
  keywords: ['privacy policy', 'data protection', 'GDPR', 'Jennifer Watkins', 'art portfolio'],
  openGraph: {
    title: 'Privacy Policy | Jennifer Watkins Contemporary Art',
    description: 'Our commitment to protecting your privacy and personal information.',
    type: 'website',
  },
};

const PrivacyPage = () => {
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
                Privacy Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
                      1. Introduction
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Jennifer Watkins ("we," "our," or "us") operates this art portfolio website. This Privacy Policy 
                      explains how we collect, use, disclose, and safeguard your information when you visit our website, 
                      purchase artwork, or engage with our services.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      By using our website, you consent to the data practices described in this policy. If you do not 
                      agree with the terms of this Privacy Policy, please do not access or use our website.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Information We Collect */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      2. Information We Collect
                    </h2>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Personal Information
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We may collect personal information that you voluntarily provide to us when you:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>Purchase artwork or commission pieces</li>
                      <li>Create an account on our website</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Contact us through our contact forms</li>
                      <li>Participate in surveys or promotions</li>
                      <li>Leave comments or reviews</li>
                    </ul>

                    <p className="text-muted-foreground leading-relaxed mb-4">
                      This information may include:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>Name and contact information (email, phone, address)</li>
                      <li>Payment information (processed securely through third-party providers)</li>
                      <li>Shipping and billing addresses</li>
                      <li>Communication preferences</li>
                      <li>Artwork preferences and purchase history</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Automatically Collected Information
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      When you visit our website, we may automatically collect certain information about your device and usage:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>IP address and location data</li>
                      <li>Browser type and version</li>
                      <li>Device information and screen resolution</li>
                      <li>Pages visited and time spent on our site</li>
                      <li>Referring website information</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  {/* How We Use Information */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      3. How We Use Your Information
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use the information we collect for various purposes, including:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>Processing and fulfilling artwork orders and commissions</li>
                      <li>Communicating with you about your purchases and inquiries</li>
                      <li>Sending newsletters and promotional materials (with your consent)</li>
                      <li>Improving our website and user experience</li>
                      <li>Analyzing website usage and performance</li>
                      <li>Preventing fraud and ensuring website security</li>
                      <li>Complying with legal obligations</li>
                      <li>Personalizing your experience and artwork recommendations</li>
                    </ul>
                  </section>

                  <Separator className="my-8" />

                  {/* Information Sharing */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      4. Information Sharing and Disclosure
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We do not sell, trade, or rent your personal information to third parties. We may share your 
                      information in the following circumstances:
                    </p>
                    
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Service Providers
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We may share information with trusted third-party service providers who assist us in:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>Payment processing (Stripe, PayPal, etc.)</li>
                      <li>Shipping and delivery services</li>
                      <li>Email marketing platforms</li>
                      <li>Website hosting and analytics</li>
                      <li>Customer support services</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Legal Requirements
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      We may disclose your information if required by law, court order, or government regulation, 
                      or to protect our rights, property, or safety, or that of others.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Cookies and Tracking */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      5. Cookies and Tracking Technologies
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use cookies and similar technologies to enhance your browsing experience:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li><strong>Essential Cookies:</strong> Required for website functionality and security</li>
                      <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                      <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                      <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed">
                      You can control cookie settings through your browser preferences. However, disabling certain 
                      cookies may affect website functionality.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Data Security */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      6. Data Security
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We implement appropriate technical and organizational security measures to protect your personal 
                      information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li>SSL encryption for data transmission</li>
                      <li>Secure payment processing through certified providers</li>
                      <li>Regular security audits and updates</li>
                      <li>Limited access to personal information on a need-to-know basis</li>
                      <li>Secure data storage and backup procedures</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed">
                      While we strive to protect your information, no method of transmission over the internet or 
                      electronic storage is 100% secure. We cannot guarantee absolute security.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Your Rights */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      7. Your Rights and Choices
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Depending on your location, you may have certain rights regarding your personal information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                      <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                      <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                      <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                      <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                      <li><strong>Objection:</strong> Object to certain processing of your information</li>
                      <li><strong>Restriction:</strong> Request limitation of processing in certain circumstances</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed">
                      To exercise these rights, please contact us using the information provided below. We will respond 
                      to your request within the timeframe required by applicable law.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* International Transfers */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      8. International Data Transfers
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Your information may be transferred to and processed in countries other than your own. We ensure 
                      that such transfers comply with applicable data protection laws and implement appropriate safeguards 
                      to protect your information.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Children's Privacy */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      9. Children's Privacy
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Our website is not intended for children under 13 years of age. We do not knowingly collect 
                      personal information from children under 13. If we become aware that we have collected personal 
                      information from a child under 13, we will take steps to delete such information.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Changes to Policy */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      10. Changes to This Privacy Policy
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We may update this Privacy Policy from time to time. We will notify you of any material changes 
                      by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage 
                      you to review this Privacy Policy periodically for any changes.
                    </p>
                  </section>

                  <Separator className="my-8" />

                  {/* Contact Information */}
                  <section>
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      11. Contact Us
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="bg-muted/30 p-6 rounded-lg">
                      <p className="text-foreground font-medium mb-2">Jennifer Watkins</p>
                      <p className="text-muted-foreground mb-1">Email: privacy@jenniferwatkins.art</p>
                      <p className="text-muted-foreground mb-1">Website: www.jenniferwatkins.art</p>
                      <p className="text-muted-foreground">
                        For data protection inquiries, please include "Privacy Policy" in your subject line.
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

export default PrivacyPage;
