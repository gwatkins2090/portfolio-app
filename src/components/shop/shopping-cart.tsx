'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CartItem, Cart } from '@/types';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onMoveToWishlist?: (itemId: string) => void;
  className?: string;
}

const ShoppingCart = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onMoveToWishlist,
  className = ''
}: ShoppingCartProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Redirect to checkout page or handle checkout logic
    window.location.href = '/checkout';
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20, height: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border shadow-2xl z-50 flex flex-col ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-serif font-semibold text-foreground">
                  Shopping Cart
                </h2>
                {cart.items.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {cart.items.length}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Discover beautiful artworks to add to your collection
                  </p>
                  <Button asChild onClick={onClose}>
                    <Link href="/portfolio">
                      Browse Gallery
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  <AnimatePresence>
                    {cart.items.map((item) => (
                      <motion.div
                        key={item.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="flex space-x-4 p-4 bg-muted/30 rounded-lg"
                      >
                        {/* Artwork Image */}
                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={item.artworkImage}
                            alt={item.artworkTitle}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate">
                            {item.artworkTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatPrice(item.price.amount, item.price.currency)}
                          </p>
                          
                          {item.isFramed && (
                            <Badge variant="outline" className="mt-2 text-xs">
                              Framed
                            </Badge>
                          )}

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Item Actions */}
                            <div className="flex items-center space-x-1">
                              {onMoveToWishlist && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onMoveToWishlist(item.id)}
                                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                                >
                                  <Heart className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onRemoveItem(item.id)}
                                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Cart Summary & Checkout */}
            {cart.items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      {formatPrice(cart.subtotal.amount, cart.subtotal.currency)}
                    </span>
                  </div>
                  
                  {cart.tax && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-foreground">
                        {formatPrice(cart.tax.amount, cart.tax.currency)}
                      </span>
                    </div>
                  )}
                  
                  {cart.shipping && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground">
                        {cart.shipping.amount === 0 
                          ? 'Free' 
                          : formatPrice(cart.shipping.amount, cart.shipping.currency)
                        }
                      </span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">
                      {formatPrice(cart.total.amount, cart.total.currency)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  size="lg"
                  className="w-full bg-gallery-gold hover:bg-gallery-gold/90 text-off-black font-medium"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </Button>

                {/* Continue Shopping */}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={onClose}
                  asChild
                >
                  <Link href="/portfolio">
                    Continue Shopping
                  </Link>
                </Button>

                {/* Security Notice */}
                <p className="text-xs text-muted-foreground text-center">
                  Secure checkout powered by Stripe. Your payment information is encrypted and secure.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;
