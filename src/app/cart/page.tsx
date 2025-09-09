'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/cart-store';

const CartPage = () => {
  const [mounted, setMounted] = useState(false);
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart,
    getSubtotal,
    getTax,
    getShipping,
    getTotalPrice,
    getTotalItems
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const subtotal = getSubtotal();
  const tax = getTax();
  const shipping = getShipping();
  const total = getTotalPrice();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-12 md:py-20">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="mb-8">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                  Your Cart is Empty
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Discover beautiful artworks in our collection and add them to your cart.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button size="lg" className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black" asChild>
                  <Link href="/shop">Browse Artworks</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/portfolio">View Portfolio</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 md:py-12">
        <div className="container px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/shop">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <Card key={item.artwork.id} className="overflow-hidden">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Artwork Image */}
                      <div className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0">
                        <Image
                          src={item.artwork.images[0]?.url || '/placeholder-artwork.jpg'}
                          alt={item.artwork.images[0]?.alt || item.artwork.title}
                          fill
                          className="object-cover rounded-lg artwork-frame"
                        />
                      </div>

                      {/* Artwork Details */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">
                            {item.artwork.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.artwork.year} • {item.artwork.medium.replace('-', ' ')}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {item.artwork.dimensions.width} × {item.artwork.dimensions.height} {item.artwork.dimensions.unit}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.artwork.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.artwork.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Price and Remove */}
                          <div className="flex items-center justify-between sm:justify-end gap-4">
                            <div className="text-right">
                              <div className="font-semibold text-lg">
                                {formatPrice((item.artwork.price?.amount || 0) * item.quantity)}
                              </div>
                              {item.quantity > 1 && (
                                <div className="text-sm text-muted-foreground">
                                  {formatPrice(item.artwork.price?.amount || 0)} each
                                </div>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.artwork.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Clear Cart */}
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                >
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  {shipping === 0 && subtotal >= 500 && (
                    <div className="mt-4 p-3 bg-sage-green/10 rounded-lg">
                      <p className="text-sm text-sage-green font-medium">
                        🎉 You qualify for free shipping!
                      </p>
                    </div>
                  )}

                  <Button 
                    size="lg" 
                    className="w-full mt-6 bg-gallery-gold hover:bg-gallery-gold/90 text-off-black"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Button>

                  <div className="mt-4 text-xs text-muted-foreground text-center">
                    Secure checkout powered by industry-standard encryption
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
