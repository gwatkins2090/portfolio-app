'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Image, ShoppingBag, User, Mail, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MobileNavigationProps {
  cartItemCount?: number;
  className?: string;
}

const MobileNavigation = ({ 
  cartItemCount = 0,
  className = ''
}: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      description: 'Gallery homepage'
    },
    {
      href: '/portfolio',
      label: 'Portfolio',
      icon: Image,
      description: 'Browse artworks'
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
      icon: Mail,
      description: 'Get in touch'
    },
    {
      href: '/wishlist',
      label: 'Wishlist',
      icon: Heart,
      description: 'Saved artworks'
    }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

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
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0
    })
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className={`md:hidden relative z-50 mobile-touch-target ${className}`}
        aria-label="Toggle mobile menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Cart Badge */}
        {cartItemCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
          >
            {cartItemCount > 9 ? '9+' : cartItemCount}
          </Badge>
        )}
      </Button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border shadow-2xl z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-xl font-serif font-semibold text-foreground">
                    Navigation
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Explore the gallery
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMenu}
                  className="mobile-touch-target"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      custom={index}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={item.href}
                        onClick={toggleMenu}
                        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group mobile-touch-target"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <item.icon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-foreground">
                              {item.label}
                            </h3>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-border">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Contemporary Art Portfolio
                  </p>
                  <p className="text-xs text-muted-foreground">
                    © 2024 Alexandra Chen
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

export default MobileNavigation;
