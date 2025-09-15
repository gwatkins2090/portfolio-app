/* eslint-disable react/function-component-definition */
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import ThemeProvider from '@/components/poviders/theme-provider';
import { Toaster } from 'react-hot-toast';
import { draftMode } from 'next/headers';
import { SanityLive } from '@/lib/sanity/lib/live';
import DraftModeBanner from '@/components/sanity/DraftModeBanner';
import SanityVisualEditing from '@/components/sanity/visual-editing';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Art Portfolio Gallery | Contemporary Art Collection',
  description:
    'Explore a sophisticated collection of contemporary artwork in an immersive gallery experience. Browse, discover, and purchase original pieces from a talented artist.',
  keywords: [
    'art portfolio',
    'contemporary art',
    'gallery',
    'original artwork',
    'art collection',
    'buy art online',
  ],
  authors: [{ name: 'Artist Portfolio' }],
  openGraph: {
    title: 'Art Portfolio Gallery | Contemporary Art Collection',
    description:
      'Explore a sophisticated collection of contemporary artwork in an immersive gallery experience.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Art Portfolio Gallery | Contemporary Art Collection',
    description:
      'Explore a sophisticated collection of contemporary artwork in an immersive gallery experience.',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <DraftModeBanner isEnabled={isDraftMode} />
          <div className={isDraftMode ? 'pt-12' : ''}>{children}</div>
          <Toaster
            position='top-right'
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
              success: {
                iconTheme: {
                  primary: 'hsl(var(--primary))',
                  secondary: 'hsl(var(--primary-foreground))',
                },
              },
              error: {
                iconTheme: {
                  primary: 'hsl(var(--destructive))',
                  secondary: 'hsl(var(--destructive-foreground))',
                },
              },
            }}
          />
        </ThemeProvider>

        {/* Sanity Live Content and Visual Editing */}
        <SanityVisualEditing />
        <SanityLive />

        {/* Performance Monitoring */}
        <Script
          id='web-vitals'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              if ('PerformanceObserver' in window) {
                // Monitor Core Web Vitals
                function sendToAnalytics(metric) {
                  console.log('Web Vital:', metric);
                  // Send to your analytics service
                  if (typeof gtag !== 'undefined') {
                    gtag('event', metric.name, {
                      value: Math.round(metric.value),
                      metric_rating: metric.rating
                    });
                  }
                }

                // First Contentful Paint
                new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (entry.name === 'first-contentful-paint') {
                      sendToAnalytics({
                        name: 'FCP',
                        value: entry.startTime,
                        rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor'
                      });
                    }
                  }
                }).observe({ entryTypes: ['paint'] });

                // Largest Contentful Paint
                new PerformanceObserver((list) => {
                  const entries = list.getEntries();
                  const lastEntry = entries[entries.length - 1];
                  sendToAnalytics({
                    name: 'LCP',
                    value: lastEntry.startTime,
                    rating: lastEntry.startTime < 2500 ? 'good' : lastEntry.startTime < 4000 ? 'needs-improvement' : 'poor'
                  });
                }).observe({ entryTypes: ['largest-contentful-paint'] });

                // Cumulative Layout Shift
                let clsValue = 0;
                new PerformanceObserver((list) => {
                  for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                      clsValue += entry.value;
                    }
                  }
                  sendToAnalytics({
                    name: 'CLS',
                    value: clsValue,
                    rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
                  });
                }).observe({ entryTypes: ['layout-shift'] });
              }
            `,
          }}
        />

        {/* Preload critical resources */}
        <Script
          id='preload-resources'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              // Preload critical fonts
              const criticalFonts = [
                '/fonts/playfair-display-variable.woff2',
                '/fonts/inter-variable.woff2'
              ];

              criticalFonts.forEach(font => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'font';
                link.type = 'font/woff2';
                link.crossOrigin = 'anonymous';
                link.href = font;
                document.head.appendChild(link);
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
