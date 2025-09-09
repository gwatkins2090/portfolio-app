import Link from 'next/link';
import { Palette, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

 const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-6 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gallery-gold to-terracotta shadow-lg">
                <Palette className="h-6 w-6 text-warm-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-semibold text-foreground tracking-wide">
                  Artist Portfolio
                </span>
                <span className="text-xs text-muted-foreground tracking-widest uppercase">
                  Contemporary Gallery
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Discover a curated collection of contemporary artwork that explores the intersection of
              traditional techniques and modern expression. Each piece tells a unique story through
              color, form, and emotion.
            </p>

            <div className="flex space-x-4">
              <Link
                href="https://instagram.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="mailto:artist@portfolio.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-serif font-semibold text-foreground">Gallery</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Artist</Link></li>
              <li><Link href="/exhibitions" className="text-muted-foreground hover:text-primary transition-colors">Exhibitions</Link></li>
              <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Shop</Link></li>
              <li><Link href="/cart" className="text-muted-foreground hover:text-primary transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-serif font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  123 Gallery Street<br />
                  Art District, NY 10001
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Link href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                  +1 (234) 567-8900
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <Link href="mailto:hello@artistportfolio.com" className="text-muted-foreground hover:text-primary transition-colors">
                  hello@artistportfolio.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; 2025 Artist Portfolio. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                Shipping & Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;