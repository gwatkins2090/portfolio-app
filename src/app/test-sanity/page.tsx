import { getHomepageData, getAboutPageData } from '@/lib/sanity/fetch';
import { VisualEditingWrapper } from '@/components/sanity/visual-editing-wrapper';

export default async function TestSanityPage() {
  let homepageData;
  let aboutData;
  let error = null;

  try {
    homepageData = await getHomepageData();
    aboutData = await getAboutPageData();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error fetching Sanity data:', err);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sanity Data Test Page</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Homepage Data */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Homepage Data</h2>
          {homepageData ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Settings:</h3>
                <VisualEditingWrapper
                  documentId={homepageData.settings?._id}
                  documentType="portfolioSettings"
                  fieldPath="title"
                >
                  <p className="bg-blue-50 p-2 rounded">
                    Title: {homepageData.settings?.title || 'No title'}
                  </p>
                </VisualEditingWrapper>
                <VisualEditingWrapper
                  documentId={homepageData.settings?._id}
                  documentType="portfolioSettings"
                  fieldPath="heroSection.title"
                >
                  <p className="bg-green-50 p-2 rounded mt-2">
                    Hero Title: {homepageData.settings?.heroSection?.title || 'No hero title'}
                  </p>
                </VisualEditingWrapper>
              </div>
              
              <div>
                <h3 className="font-semibold">Artist:</h3>
                <VisualEditingWrapper
                  documentId={homepageData.artist?._id}
                  documentType="artist"
                  fieldPath="name"
                >
                  <p className="bg-yellow-50 p-2 rounded">
                    Name: {homepageData.artist?.name || 'No artist name'}
                  </p>
                </VisualEditingWrapper>
              </div>
              
              <div>
                <h3 className="font-semibold">Featured Artworks:</h3>
                <p>Count: {homepageData.featuredArtworks?.length || 0}</p>
              </div>
            </div>
          ) : (
            <p className="text-red-600">No homepage data available</p>
          )}
        </div>

        {/* About Page Data */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">About Page Data</h2>
          {aboutData ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Artist:</h3>
                <VisualEditingWrapper
                  documentId={aboutData.artist?._id}
                  documentType="artist"
                  fieldPath="bio"
                >
                  <p className="bg-purple-50 p-2 rounded">
                    Bio: {aboutData.artist?.bio ? aboutData.artist.bio.substring(0, 100) + '...' : 'No bio'}
                  </p>
                </VisualEditingWrapper>
                <VisualEditingWrapper
                  documentId={aboutData.artist?._id}
                  documentType="artist"
                  fieldPath="statement"
                >
                  <p className="bg-pink-50 p-2 rounded mt-2">
                    Statement: {aboutData.artist?.statement ? aboutData.artist.statement.substring(0, 100) + '...' : 'No statement'}
                  </p>
                </VisualEditingWrapper>
              </div>
            </div>
          ) : (
            <p className="text-red-600">No about page data available</p>
          )}
        </div>
      </div>

      {/* Raw Data Display */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Raw Data (for debugging)</h2>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto">
          <pre className="text-sm">
            {JSON.stringify({ homepageData, aboutData }, null, 2)}
          </pre>
        </div>
      </div>

      {/* Visual Editing Instructions */}
      <div className="mt-8 bg-blue-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Visual Editing Test Instructions</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Open <code className="bg-gray-200 px-2 py-1 rounded">/studio/presentation</code> in a new tab</li>
          <li>Navigate to this test page in the presentation preview</li>
          <li>Try clicking on the colored boxes above - they should become editable</li>
          <li>If visual editing is working, you'll see edit overlays when hovering</li>
          <li>Changes made in the studio should appear immediately on this page</li>
        </ol>
      </div>
    </div>
  );
}
