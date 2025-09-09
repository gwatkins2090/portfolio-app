import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Artworks | Jennifer Watkins - Buy Contemporary Art',
  description: 'Purchase original contemporary artworks by Jennifer Watkins. Browse paintings, mixed media pieces, and limited edition prints.',
  keywords: ['buy art', 'contemporary art for sale', 'Jennifer Watkins', 'original paintings', 'art shop'],
  openGraph: {
    title: 'Shop Artworks | Jennifer Watkins Contemporary Art',
    description: 'Purchase original contemporary artworks and limited edition prints by Jennifer Watkins.',
    type: 'website',
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
