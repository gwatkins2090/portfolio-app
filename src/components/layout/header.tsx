'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/layout/theme-toggle';
import { Palette } from 'lucide-react';
import MobileNavigation from '@/components/mobile/mobile-navigation';
import CartIcon from '@/components/cart/cart-icon';
import { useCartStore } from '@/lib/cart-store';

 const Header = () => {
  const [mounted, setMounted] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemCount = mounted ? getTotalItems() : 0;

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
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/portfolio" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Portfolio
          </Link>
          <Link href="/exhibitions" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Exhibitions
          </Link>
          <Link href="/shop" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <CartIcon />
          </div>

          <ThemeToggle />

          <MobileNavigation cartItemCount={cartItemCount} />
        </div>

      </div>
    </header>
  );
};

export default Header;