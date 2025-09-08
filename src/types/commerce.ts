// E-commerce types for the art portfolio

import { ArtworkPrice } from './artwork';

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled';

export type PaymentMethod = 
  | 'credit-card'
  | 'paypal'
  | 'stripe'
  | 'bank-transfer'
  | 'crypto';

export type ShippingMethod = 
  | 'standard'
  | 'express'
  | 'overnight'
  | 'international'
  | 'pickup'
  | 'white-glove';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface BillingAddress extends ShippingAddress {
  isBusinessAddress?: boolean;
  taxId?: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  method: ShippingMethod;
  price: ArtworkPrice;
  estimatedDays: {
    min: number;
    max: number;
  };
  isInsured: boolean;
  trackingIncluded: boolean;
  restrictions?: string[];
}

export interface CartItem {
  id: string;
  artworkId: string;
  artworkTitle: string;
  artworkImage: string;
  price: ArtworkPrice;
  quantity: number; // Usually 1 for original artworks
  isFramed?: boolean;
  frameOptions?: {
    type: string;
    color: string;
    additionalCost: number;
  };
  notes?: string;
  addedAt: string; // ISO date string
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: ArtworkPrice;
  tax?: ArtworkPrice;
  shipping?: ArtworkPrice;
  total: ArtworkPrice;
  currency: string;
  updatedAt: string;
}

export interface PaymentDetails {
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  amount: ArtworkPrice;
  processedAt?: string;
  failureReason?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: ArtworkPrice;
  tax?: ArtworkPrice;
  shipping: ArtworkPrice;
  total: ArtworkPrice;
  status: OrderStatus;
  paymentDetails: PaymentDetails;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  shippingMethod: ShippingOption;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  defaultShippingAddress?: ShippingAddress;
  defaultBillingAddress?: BillingAddress;
  orders: string[]; // Array of order IDs
  wishlist: string[]; // Array of artwork IDs
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    currency: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Commission {
  id: string;
  customerId?: string;
  customerEmail: string;
  customerName: string;
  title: string;
  description: string;
  medium: string;
  dimensions?: {
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  deadline?: string;
  referenceImages?: string[];
  status: 'inquiry' | 'discussing' | 'quoted' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  quote?: ArtworkPrice;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  artworkId?: string;
  customerEmail: string;
  customerName: string;
  subject: string;
  message: string;
  type: 'general' | 'artwork' | 'commission' | 'exhibition' | 'press';
  status: 'new' | 'read' | 'replied' | 'closed';
  createdAt: string;
  updatedAt: string;
}

// Analytics types
export interface SalesAnalytics {
  period: 'day' | 'week' | 'month' | 'year';
  totalSales: ArtworkPrice;
  totalOrders: number;
  averageOrderValue: ArtworkPrice;
  topSellingArtworks: {
    artworkId: string;
    title: string;
    sales: number;
    revenue: ArtworkPrice;
  }[];
  salesByCategory: {
    category: string;
    sales: number;
    revenue: ArtworkPrice;
  }[];
  salesByMedium: {
    medium: string;
    sales: number;
    revenue: ArtworkPrice;
  }[];
}

export interface InventoryItem {
  artworkId: string;
  status: 'available' | 'sold' | 'reserved' | 'damaged' | 'on-loan';
  location?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  insuranceValue?: ArtworkPrice;
  lastInspection?: string;
  notes?: string;
}
