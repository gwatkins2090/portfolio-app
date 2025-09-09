import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Artwork } from '@/types';

export interface CartItem {
  artwork: Artwork;
  quantity: number;
  addedAt: string;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (artwork: Artwork, quantity?: number) => void;
  removeItem: (artworkId: string) => void;
  updateQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Computed values
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getShipping: () => number;
}

// Tax rate (8.5% for example)
const TAX_RATE = 0.085;

// Shipping calculation
const calculateShipping = (subtotal: number): number => {
  if (subtotal === 0) return 0;
  if (subtotal >= 500) return 0; // Free shipping over $500
  if (subtotal >= 200) return 25; // Reduced shipping for orders over $200
  return 50; // Standard shipping
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (artwork: Artwork, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.artwork.id === artwork.id);
          
          if (existingItem) {
            // Update quantity if item already exists
            return {
              items: state.items.map(item =>
                item.artwork.id === artwork.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          } else {
            // Add new item
            return {
              items: [
                ...state.items,
                {
                  artwork,
                  quantity,
                  addedAt: new Date().toISOString()
                }
              ]
            };
          }
        });
      },

      removeItem: (artworkId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.artwork.id !== artworkId)
        }));
      },

      updateQuantity: (artworkId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(artworkId);
          return;
        }

        set((state) => ({
          items: state.items.map(item =>
            item.artwork.id === artworkId
              ? { ...item, quantity }
              : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.artwork.price?.amount || 0;
          return total + (price * item.quantity);
        }, 0);
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        return subtotal * TAX_RATE;
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        return calculateShipping(subtotal);
      },

      getTotalPrice: () => {
        const subtotal = get().getSubtotal();
        const tax = get().getTax();
        const shipping = get().getShipping();
        return subtotal + tax + shipping;
      },
    }),
    {
      name: 'art-portfolio-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
