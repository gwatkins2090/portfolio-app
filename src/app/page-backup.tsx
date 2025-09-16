import { Metadata } from 'next';

// Generate metadata - simplified for build stability
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Jennifer Watkins - Contemporary Artist',
    description: 'Contemporary art portfolio showcasing original paintings and artwork by Jennifer Watkins.',
    keywords: ['contemporary art', 'paintings', 'Jennifer Watkins', 'artist'],
    openGraph: {
      title: 'Jennifer Watkins - Contemporary Artist',
      description: 'Contemporary art portfolio showcasing original paintings and artwork by Jennifer Watkins.',
      type: 'website',
    },
  };
}

const HomePage = async () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl font-bold text-center">Jennifer Watkins</h1>
          <p className="text-xl text-center mt-4">Contemporary Artist</p>
          <p className="text-center mt-8">Portfolio website is loading...</p>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
