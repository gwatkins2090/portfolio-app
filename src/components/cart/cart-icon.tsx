'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';

const CartIcon = () => {
  const [mounted, setMounted] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" asChild>
        <Link href="/cart">
          <ShoppingBag className="h-5 w-5" />
        </Link>
      </Button>
    );
  }

  const totalItems = getTotalItems();

  return (
    <Button variant="ghost" size="sm" className="relative" asChild>
      <Link href="/cart">
        <ShoppingBag className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-gallery-gold text-off-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default CartIcon;
