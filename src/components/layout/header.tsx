'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Image, ShoppingBag, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ThemeToggle from '@/components/layout/theme-toggle';
import { Palette } from 'lucide-react';
import CartIcon from '@/components/cart/cart-icon';
import { useCartStore } from '@/lib/cart-store';
import { useMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const isMobile = useMobile(768); // Use 768px as the breakpoint

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const cartItemCount = mounted ? getTotalItems() : 0;

  // Navigation items configuration - ordered as per user preference
  const navigationItems = [
    {
      href: '/',
      label: 'Home',
      icon: null, // No icon for Home as per user preference
      description: 'Gallery homepage'
    },
    {
      href: '/portfolio',
      label: 'Portfolio',
      icon: Image,
      description: 'Browse artworks'
    },
    {
      href: '/exhibitions',
      label: 'Exhibitions',
      icon: Calendar,
      description: 'Current & upcoming shows'
    },
    {
      href: '/shop',
      label: 'Shop',
      icon: ShoppingBag,
      description: 'Purchase art',
      badge: cartItemCount > 0 ? cartItemCount : undefined
    },
    {
      href: '/about',
      label: 'About',
      icon: User,
      description: 'Artist information'
    },
    {
      href: '/contact',
      label: 'Contact',
      icon: null, // No icon for Contact as per user preference
      description: 'Get in touch'
    }
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Handle escape key to close menu
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%'
    },
    open: {
      opacity: 1,
      x: 0
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: 30,
      scale: 0.95
    },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1
    })
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Logo */}
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

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors relative"
              >
                {item.label}
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
                  >
                    {item.badge > 9 ? '9+' : item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className="flex items-center space-x-4">
            {/* Desktop Cart Icon */}
            <div className="hidden md:block">
              <CartIcon />
            </div>

            {/* Theme Toggle - Always visible */}
            <ThemeToggle />

            {/* Mobile Menu Button - Only visible on mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="md:hidden relative z-50 mobile-touch-target"
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cart Badge on Mobile Menu Button */}
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop - Only render on mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9998]"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel - Only render on mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-background border-l border-border shadow-2xl z-[99999]"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-background">
                <div>
                  <h2 className="text-xl font-serif font-semibold text-foreground">
                    Artist Portfolio
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Contemporary Gallery
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMobileMenu}
                  className="h-10 w-10 rounded-full hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Navigation Items */}
              <nav className="flex-1 overflow-y-auto bg-background">
                <div className="p-6 space-y-3">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      custom={index}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      transition={{
                        delay: index * 0.1,
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                      className="w-full"
                    >
                      <Link
                        href={item.href}
                        onClick={toggleMobileMenu}
                        className="flex items-center p-4 rounded-lg transition-all duration-200 group hover:bg-muted/50 active:bg-muted min-h-[60px] w-full touch-manipulation"
                      >
                        {/* Icon container - only show if item has an icon */}
                        {item.icon && (
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors mr-4">
                            <item.icon className="h-5 w-5" />
                          </div>
                        )}

                        {/* Content */}
                        <div className={`flex-1 min-w-0 ${!item.icon ? 'ml-0' : ''}`}>
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-foreground text-base">
                              {item.label}
                            </h3>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs ml-2">
                                {item.badge > 9 ? '9+' : item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="p-6 border-t border-border bg-muted/20">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">
                    Contemporary Art Portfolio
                  </p>
                  <p className="text-xs text-muted-foreground">
                    © 2024 Artist Portfolio
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;