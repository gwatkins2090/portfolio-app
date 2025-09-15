import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getHomepageData } from '@/lib/sanity/fetch';
import { VisualEditingWrapper } from '@/components/sanity/visual-editing-wrapper';

export const metadata: Metadata = {
  title: 'Visual Editing Test | Jennifer Watkins Portfolio',
  description: 'Test page for Sanity visual editing functionality',
};

const VisualEditingTestPage = async () => {
  // Fetch data from Sanity
  let data;
  try {
    data = await getHomepageData();
  } catch (error) {
    console.error('Error fetching data:', error);
    data = { settings: null, artist: null, featuredArtworks: [] };
  }

  const { settings, artist } = data;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container px-4 max-w-4xl mx-auto">
          
          {/* Page Title */}
          <h1 className="text-4xl font-serif font-bold text-foreground mb-8 text-center">
            Visual Editing Test Page
          </h1>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-12">
            <h2 className="text-xl font-semibold mb-4">🎨 Visual Editing Test</h2>
            <div className="space-y-3 text-sm">
              <p><strong>Purpose:</strong> This page tests visual editing with server components</p>
              <p><strong>How to test:</strong> Open this page in Sanity Studio presentation mode</p>
              <p><strong>Expected behavior:</strong> Content below should be clickable and editable</p>
              <p><strong>Visual indicators:</strong> Look for hover effects and edit overlays</p>
            </div>
          </div>

          {/* Portfolio Settings Test */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6">Portfolio Settings (Server Component)</h2>
            {settings ? (
              <VisualEditingWrapper
                documentId={settings._id}
                documentType="portfolioSettings"
                fieldPath="title"
                className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-blue-300"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">Site Title</h3>
                  <p className="text-lg">{settings.title || "Jennifer Watkins Art Portfolio"}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Description</h3>
                  <p>{settings.description || "Contemporary art portfolio showcasing original paintings and artwork."}</p>
                </div>
              </VisualEditingWrapper>
            ) : (
              <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p>No portfolio settings found. Please create portfolio settings in the studio.</p>
              </div>
            )}
          </section>

          {/* Hero Section Test */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6">Hero Section (Server Component)</h2>
            {settings?.heroSection ? (
              <VisualEditingWrapper
                documentId={settings._id}
                documentType="portfolioSettings"
                fieldPath="heroSection"
                className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-green-300"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">Hero Title</h3>
                  <p className="text-lg">{settings.heroSection.title || "Welcome to Jennifer Watkins Art"}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Hero Subtitle</h3>
                  <p>{settings.heroSection.subtitle || "Contemporary Abstract Expressionism"}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Hero Description</h3>
                  <p>{settings.heroSection.description || "Explore a curated collection of contemporary artworks."}</p>
                </div>
              </VisualEditingWrapper>
            ) : (
              <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p>No hero section found. Please configure hero section in portfolio settings.</p>
              </div>
            )}
          </section>

          {/* Artist Profile Test */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6">Artist Profile (Server Component)</h2>
            {artist ? (
              <VisualEditingWrapper
                documentId={artist._id}
                documentType="artist"
                fieldPath="name"
                className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-purple-300"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2">Artist Name</h3>
                  <p className="text-lg">{artist.name || "Jennifer Watkins"}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Short Bio</h3>
                  <p>{artist.shortBio || "Contemporary artist specializing in abstract expressionism."}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Location</h3>
                  <p>{artist.location || "New York, NY"}</p>
                </div>
              </VisualEditingWrapper>
            ) : (
              <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p>No artist profile found. Please create artist profile in the studio.</p>
              </div>
            )}
          </section>

          {/* Debug Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6">Debug Information</h2>
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <pre className="text-sm overflow-auto">
                {JSON.stringify({
                  hasSettings: !!settings,
                  settingsId: settings?._id,
                  hasArtist: !!artist,
                  artistId: artist?._id,
                  environment: process.env.NODE_ENV,
                }, null, 2)}
              </pre>
            </div>
          </section>

          {/* Instructions */}
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">✅ Testing Checklist</h3>
            <ul className="space-y-2 text-sm">
              <li>□ Open this page in Sanity Studio presentation mode</li>
              <li>□ Look for visual editing overlays on content sections</li>
              <li>□ Click on content to see if studio focuses on corresponding fields</li>
              <li>□ Make changes in studio and verify they appear in preview</li>
              <li>□ Check browser console for any visual editing errors</li>
            </ul>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VisualEditingTestPage;
