import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | Jennifer Watkins - Contemporary Art Portfolio',
  description: 'Review your selected artworks and proceed to checkout. Secure payment processing for original contemporary art purchases.',
  keywords: ['shopping cart', 'art purchase', 'Jennifer Watkins', 'checkout', 'buy art'],
  openGraph: {
    title: 'Shopping Cart | Jennifer Watkins Contemporary Art',
    description: 'Complete your art purchase with secure checkout.',
    type: 'website',
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
