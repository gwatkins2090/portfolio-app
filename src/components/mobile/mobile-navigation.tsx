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
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
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

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-80 max-w-[90vw] border-l shadow-2xl z-[9999] md:hidden mobile-nav-panel"
            style={{
              backgroundColor: '#ffffff',
              borderLeft: '3px solid #ff0000',
              display: 'block',
              visibility: 'visible',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b" style={{ backgroundColor: '#f0f0f0', borderBottomColor: '#ccc' }}>
                <div>
                  <h2 className="text-xl font-serif font-semibold" style={{ color: '#000000' }}>
                    DEBUG: Jennifer Watkins
                  </h2>
                  <p className="text-sm" style={{ color: '#666666' }}>
                    Contemporary Art Portfolio
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
              <nav className="flex-1 overflow-y-auto" style={{ backgroundColor: '#f8f9fa', minHeight: '300px' }}>
                <div className="p-6 space-y-3" style={{ backgroundColor: '#ffffff' }}>
                  {/* Debug: Show item count */}
                  <div className="text-xs mb-4" style={{ color: '#000000', backgroundColor: '#ffff00', padding: '8px' }}>
                    DEBUG: {navigationItems.length} navigation items found
                  </div>
                  {navigationItems.map((item, index) => (
                    <div
                      key={item.href}
                      className="w-full"
                      style={{
                        opacity: 1,
                        transform: 'translateX(0)',
                        visibility: 'visible'
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={toggleMenu}
                        className="flex items-center p-4 rounded-lg transition-colors group mobile-touch-target min-h-[60px] w-full mobile-nav-item"
                        style={{
                          backgroundColor: '#ffffff',
                          color: '#000000',
                          border: '1px solid #e5e5e5',
                          display: 'flex',
                          visibility: 'visible',
                          opacity: 1
                        }}
                      >
                        {item.icon && (
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors mr-4">
                            <item.icon className="h-5 w-5" />
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-base font-semibold" style={{ color: '#000000', fontSize: '18px' }}>
                              DEBUG: {item.label} (Item {index + 1})
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
                    </div>
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
