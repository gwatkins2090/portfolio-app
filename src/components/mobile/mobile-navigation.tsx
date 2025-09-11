'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Image, ShoppingBag, User, Calendar } from 'lucide-react';
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
      icon: null,
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
      icon: null,
      description: 'Get in touch'
    }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle escape key to close menu
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      toggleMenu();
    }
  };

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

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
            onClick={toggleMenu}
            aria-hidden="true"
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-background border-l border-border shadow-2xl z-[99999] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border bg-background">
                <div>
                  <h2 className="text-xl font-serif font-semibold text-foreground">
                    Jennifer Watkins
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Contemporary Art Portfolio
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMenu}
                  className="h-10 w-10 rounded-full hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation Items */}
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
                        delay: index * 0.08,
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                      className="w-full"
                    >
                      <Link
                        href={item.href}
                        onClick={toggleMenu}
                        className="flex items-center p-4 rounded-lg transition-all duration-200 group hover:bg-muted/50 active:bg-muted min-h-[60px] w-full touch-manipulation"
                      >
                        {item.icon && (
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors mr-4">
                            <item.icon className="h-5 w-5" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-foreground text-base font-semibold">
                              {item.label}
                            </h3>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs ml-2">
                                {item.badge}
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

              {/* Footer */}
              <div className="p-6 border-t border-border bg-muted/20">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">
                    Contemporary Art Portfolio
                  </p>
                  <p className="text-xs text-muted-foreground">
                    © 2024 Jennifer Watkins
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
