'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, AlertCircle, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArtworkPrice, ArtworkStatus } from '@/types';

interface PricingOption {
  id: string;
  name: string;
  description: string;
  price: ArtworkPrice;
  features: string[];
  isPopular?: boolean;
  isAvailable: boolean;
}

interface PricingDisplayProps {
  basePrice: ArtworkPrice;
  status: ArtworkStatus;
  options?: PricingOption[];
  isNegotiable?: boolean;
  originalPrice?: ArtworkPrice;
  onSelectOption?: (optionId: string) => void;
  onContactForPrice?: () => void;
  className?: string;
}

const PricingDisplay = ({
  basePrice,
  status,
  options = [],
  isNegotiable = false,
  originalPrice,
  onSelectOption,
  onContactForPrice,
  className = ''
}: PricingDisplayProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const calculateDiscount = () => {
    if (!originalPrice || originalPrice.amount <= basePrice.amount) return 0;
    return Math.round(((originalPrice.amount - basePrice.amount) / originalPrice.amount) * 100);
  };

  const discount = calculateDiscount();
  const isAvailable = status === 'available';
  const showPrice = isAvailable && basePrice.amount > 0;

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    onSelectOption?.(optionId);
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'sold':
        return { message: 'This artwork has been sold', color: 'text-destructive', icon: X };
      case 'reserved':
        return { message: 'This artwork is currently reserved', color: 'text-orange-500', icon: AlertCircle };
      case 'not-for-sale':
        return { message: 'This artwork is not for sale', color: 'text-muted-foreground', icon: Info };
      case 'on-loan':
        return { message: 'This artwork is currently on loan', color: 'text-blue-500', icon: Info };
      default:
        return null;
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Price Display */}
      <Card className="border-2 border-gallery-gold/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Status Message */}
            {statusInfo && (
              <div className={`flex items-center space-x-2 ${statusInfo.color}`}>
                <statusInfo.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{statusInfo.message}</span>
              </div>
            )}

            {/* Price */}
            {showPrice ? (
              <div className="space-y-2">
                <div className="flex items-baseline space-x-3">
                  <span className="text-4xl font-bold text-gallery-gold">
                    {formatPrice(basePrice.amount, basePrice.currency)}
                  </span>
                  
                  {originalPrice && discount > 0 && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        {formatPrice(originalPrice.amount, originalPrice.currency)}
                      </span>
                      <Badge variant="destructive" className="text-xs">
                        {discount}% OFF
                      </Badge>
                    </>
                  )}
                </div>

                {isNegotiable && (
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      Price Negotiable
                    </Badge>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-3 w-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Contact us to discuss pricing options</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-2xl font-semibold text-muted-foreground">
                  Price on Request
                </div>
                <Button
                  variant="outline"
                  onClick={onContactForPrice}
                  className="w-full"
                >
                  Contact for Pricing
                </Button>
              </div>
            )}

            {/* Payment Info */}
            {showPrice && (
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Certificate of authenticity included</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>Professional packaging & shipping</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Options */}
      {options.length > 0 && isAvailable && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Purchase Options
          </h3>
          
          <div className="grid gap-4">
            {options.map((option) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedOption === option.id 
                      ? 'border-primary ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/50'
                  } ${!option.isAvailable ? 'opacity-50 cursor-not-allowed' : ''} ${
                    option.isPopular ? 'border-gallery-gold' : ''
                  }`}
                  onClick={() => option.isAvailable && handleOptionSelect(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-foreground">
                            {option.name}
                          </h4>
                          {option.isPopular && (
                            <Badge className="bg-gallery-gold text-off-black text-xs">
                              Popular
                            </Badge>
                          )}
                          {!option.isAvailable && (
                            <Badge variant="secondary" className="text-xs">
                              Unavailable
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                        
                        {option.features.length > 0 && (
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {option.features.map((feature, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      
                      <div className="text-right ml-4">
                        <div className="text-lg font-bold text-gallery-gold">
                          {formatPrice(option.price.amount, option.price.currency)}
                        </div>
                        {selectedOption === option.id && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Check className="h-3 w-3 text-green-500" />
                            <span className="text-xs text-green-500">Selected</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="space-y-3">
            <h4 className="font-medium text-foreground flex items-center">
              <Info className="h-4 w-4 mr-2" />
              Pricing Information
            </h4>
            
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                • All prices are in {basePrice.currency} and include certificate of authenticity
              </p>
              <p>
                • Shipping costs calculated at checkout based on location
              </p>
              <p>
                • Payment plans available for purchases over $2,000
              </p>
              <p>
                • 30-day return policy for original condition artworks
              </p>
              {isNegotiable && (
                <p>
                  • This artwork is open to price negotiation - contact us to discuss
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingDisplay;
