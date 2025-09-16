'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Truck, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Cart, ShippingAddress, BillingAddress } from '@/types';

interface CheckoutFormProps {
  cart: Cart;
  onSubmit: (data: CheckoutFormData) => void;
  isProcessing?: boolean;
  className?: string;
}

interface CheckoutFormData {
  email: string;
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  paymentMethod: string;
  shippingMethod: string;
  specialInstructions?: string;
}

const CheckoutForm = ({
  cart,
  onSubmit,
  isProcessing = false,
  className = ''
}: CheckoutFormProps) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    shippingAddress: {
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US',
      phone: ''
    },
    billingAddress: {
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'US',
      phone: ''
    },
    paymentMethod: 'card',
    shippingMethod: 'standard'
  });

  const [useSameAddress, setUseSameAddress] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const handleInputChange = (section: keyof CheckoutFormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' 
        ? { ...prev[section], [field]: value }
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalData = {
      ...formData,
      billingAddress: useSameAddress ? formData.shippingAddress : formData.billingAddress
    };
    
    onSubmit(finalData);
  };

  const steps = [
    { id: 1, title: 'Contact & Shipping', icon: User },
    { id: 2, title: 'Payment', icon: CreditCard },
    { id: 3, title: 'Review', icon: Lock }
  ];

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'border-muted-foreground text-muted-foreground'
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Contact & Shipping */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="h-5 w-5 mr-2" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', '', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shipping-firstName">First Name</Label>
                        <Input
                          id="shipping-firstName"
                          value={formData.shippingAddress.firstName}
                          onChange={(e) => handleInputChange('shippingAddress', 'firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="shipping-lastName">Last Name</Label>
                        <Input
                          id="shipping-lastName"
                          value={formData.shippingAddress.lastName}
                          onChange={(e) => handleInputChange('shippingAddress', 'lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="shipping-address1">Address Line 1</Label>
                      <Input
                        id="shipping-address1"
                        value={formData.shippingAddress.addressLine1}
                        onChange={(e) => handleInputChange('shippingAddress', 'addressLine1', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="shipping-address2">Address Line 2 (Optional)</Label>
                      <Input
                        id="shipping-address2"
                        value={formData.shippingAddress.addressLine2}
                        onChange={(e) => handleInputChange('shippingAddress', 'addressLine2', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="shipping-city">City</Label>
                        <Input
                          id="shipping-city"
                          value={formData.shippingAddress.city}
                          onChange={(e) => handleInputChange('shippingAddress', 'city', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="shipping-state">State</Label>
                        <Input
                          id="shipping-state"
                          value={formData.shippingAddress.state}
                          onChange={(e) => handleInputChange('shippingAddress', 'state', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="shipping-postal">Postal Code</Label>
                        <Input
                          id="shipping-postal"
                          value={formData.shippingAddress.postalCode}
                          onChange={(e) => handleInputChange('shippingAddress', 'postalCode', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="shipping-phone">Phone Number</Label>
                      <Input
                        id="shipping-phone"
                        type="tel"
                        value={formData.shippingAddress.phone}
                        onChange={(e) => handleInputChange('shippingAddress', 'phone', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    onClick={() => setCurrentStep(2)}
                    className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Lock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Secure Payment Processing</h3>
                      <p className="text-muted-foreground mb-4">
                        Payment processing will be handled securely through Stripe
                      </p>
                      <Badge variant="outline" className="mb-4">
                        SSL Encrypted
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back to Shipping
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setCurrentStep(3)}
                    className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black"
                  >
                    Review Order
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Please review your order details before completing your purchase.
                    </div>
                    
                    <div className="space-y-2">
                      <div><strong>Email:</strong> {formData.email}</div>
                      <div><strong>Shipping to:</strong></div>
                      <div className="ml-4 text-sm text-muted-foreground">
                        {formData.shippingAddress.firstName} {formData.shippingAddress.lastName}<br />
                        {formData.shippingAddress.addressLine1}<br />
                        {formData.shippingAddress.addressLine2 && (
                          <>{formData.shippingAddress.addressLine2}<br /></>
                        )}
                        {formData.shippingAddress.city}, {formData.shippingAddress.state} {formData.shippingAddress.postalCode}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    Back to Payment
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isProcessing}
                    className="bg-gallery-gold hover:bg-gallery-gold/90 text-off-black"
                  >
                    {isProcessing ? 'Processing...' : 'Complete Order'}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex space-x-3">
                  <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.artworkTitle}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.price.amount, item.price.currency)}
                    </p>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.subtotal.amount, cart.subtotal.currency)}</span>
                </div>
                {cart.shipping && (
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {cart.shipping.amount === 0 
                        ? 'Free' 
                        : formatPrice(cart.shipping.amount, cart.shipping.currency)
                      }
                    </span>
                  </div>
                )}
                {cart.tax && (
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{formatPrice(cart.tax.amount, cart.tax.currency)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(cart.total.amount, cart.total.currency)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
