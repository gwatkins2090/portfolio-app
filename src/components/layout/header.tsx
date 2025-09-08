'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/layout/theme-toggle';
import { Palette, ShoppingBag, Home, Mail } from 'lucide-react';
import MobileNavigation from '@/components/mobile/mobile-navigation';

 const Header = () => {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gallery-gold to-terracotta shadow-lg group-hover:shadow-xl transition-all duration-300">
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

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors group">
            <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>Home</span>
          </Link>
          <Link href="/portfolio" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Portfolio
          </Link>
          <Link href="/shop" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors group">
            <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>Contact</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex items-center space-x-2 text-foreground hover:text-primary"
            asChild
          >
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>

          <ThemeToggle />

          <MobileNavigation cartItemCount={0} />
        </div>

      </div>
    </header>
  );
};

export default Header;