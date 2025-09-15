import { getHomepageData, getAboutPageData } from '@/lib/sanity/fetch';
import { VisualEditingWrapper } from '@/components/sanity/visual-editing-wrapper';
import { SanityStatusDashboard } from '@/components/sanity/sanity-status-dashboard';

export default async function TestSanityPage() {
  let homepageData;
  let aboutData;
  let error = null;
  let fetchStartTime = Date.now();
  let fetchEndTime;

  try {
    homepageData = await getHomepageData();
    aboutData = await getAboutPageData();
    fetchEndTime = Date.now();
  } catch (err) {
    fetchEndTime = Date.now();
    error = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error fetching Sanity data:', err);
  }

  const fetchTime = fetchEndTime - fetchStartTime;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sanity Integration Status Dashboard</h1>

      {/* Comprehensive Status Dashboard */}
      <SanityStatusDashboard
        initialFetchTime={fetchTime}
        initialError={error}
        homepageData={homepageData}
        aboutData={aboutData}
      />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
          <strong>Server-side Fetch Error:</strong> {error}
        </div>
      )}

      {/* Visual Editing Test Content */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">Visual Editing Test Content</h2>
        <p className="text-gray-600 mb-6">
          The colored boxes below are wrapped with visual editing components. In presentation mode,
          you should be able to click on them to edit the content directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Homepage Data */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Homepage Content</h3>
            {homepageData ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Portfolio Settings:</h4>
                  <VisualEditingWrapper
                    documentId={homepageData.settings?._id}
                    documentType="portfolioSettings"
                    fieldPath="title"
                  >
                    <div className="bg-blue-50 border-2 border-blue-200 p-3 rounded cursor-pointer hover:bg-blue-100 transition-colors">
                      <span className="text-xs text-blue-600 font-medium">EDITABLE: Site Title</span>
                      <p className="text-blue-800 font-medium">
                        {homepageData.settings?.title || 'No title set'}
                      </p>
                    </div>
                  </VisualEditingWrapper>

                  <VisualEditingWrapper
                    documentId={homepageData.settings?._id}
                    documentType="portfolioSettings"
                    fieldPath="heroSection.title"
                  >
                    <div className="bg-green-50 border-2 border-green-200 p-3 rounded mt-3 cursor-pointer hover:bg-green-100 transition-colors">
                      <span className="text-xs text-green-600 font-medium">EDITABLE: Hero Title</span>
                      <p className="text-green-800 font-medium">
                        {homepageData.settings?.heroSection?.title || 'No hero title set'}
                      </p>
                    </div>
                  </VisualEditingWrapper>

                  <VisualEditingWrapper
                    documentId={homepageData.settings?._id}
                    documentType="portfolioSettings"
                    fieldPath="heroSection.subtitle"
                  >
                    <div className="bg-indigo-50 border-2 border-indigo-200 p-3 rounded mt-3 cursor-pointer hover:bg-indigo-100 transition-colors">
                      <span className="text-xs text-indigo-600 font-medium">EDITABLE: Hero Subtitle</span>
                      <p className="text-indigo-800">
                        {homepageData.settings?.heroSection?.subtitle || 'No hero subtitle set'}
                      </p>
                    </div>
                  </VisualEditingWrapper>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Artist Information:</h4>
                  <VisualEditingWrapper
                    documentId={homepageData.artist?._id}
                    documentType="artist"
                    fieldPath="name"
                  >
                    <div className="bg-yellow-50 border-2 border-yellow-200 p-3 rounded cursor-pointer hover:bg-yellow-100 transition-colors">
                      <span className="text-xs text-yellow-600 font-medium">EDITABLE: Artist Name</span>
                      <p className="text-yellow-800 font-medium">
                        {homepageData.artist?.name || 'No artist name set'}
                      </p>
                    </div>
                  </VisualEditingWrapper>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 p-4 rounded">
                <p className="text-red-700">No homepage data available</p>
              </div>
            )}
          </div>

          {/* About Page Data */}
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">About Page Content</h3>
            {aboutData ? (
              <div className="space-y-4">
                <VisualEditingWrapper
                  documentId={aboutData.artist?._id}
                  documentType="artist"
                  fieldPath="bio"
                >
                  <div className="bg-purple-50 border-2 border-purple-200 p-3 rounded cursor-pointer hover:bg-purple-100 transition-colors">
                    <span className="text-xs text-purple-600 font-medium">EDITABLE: Artist Biography</span>
                    <p className="text-purple-800 text-sm mt-1">
                      {aboutData.artist?.bio ?
                        aboutData.artist.bio.substring(0, 150) + (aboutData.artist.bio.length > 150 ? '...' : '')
                        : 'No biography set'}
                    </p>
                  </div>
                </VisualEditingWrapper>

                <VisualEditingWrapper
                  documentId={aboutData.artist?._id}
                  documentType="artist"
                  fieldPath="statement"
                >
                  <div className="bg-pink-50 border-2 border-pink-200 p-3 rounded cursor-pointer hover:bg-pink-100 transition-colors">
                    <span className="text-xs text-pink-600 font-medium">EDITABLE: Artist Statement</span>
                    <p className="text-pink-800 text-sm mt-1">
                      {aboutData.artist?.statement ?
                        aboutData.artist.statement.substring(0, 150) + (aboutData.artist.statement.length > 150 ? '...' : '')
                        : 'No statement set'}
                    </p>
                  </div>
                </VisualEditingWrapper>

                <VisualEditingWrapper
                  documentId={aboutData.artist?._id}
                  documentType="artist"
                  fieldPath="shortBio"
                >
                  <div className="bg-orange-50 border-2 border-orange-200 p-3 rounded cursor-pointer hover:bg-orange-100 transition-colors">
                    <span className="text-xs text-orange-600 font-medium">EDITABLE: Short Bio</span>
                    <p className="text-orange-800 text-sm mt-1">
                      {aboutData.artist?.shortBio || 'No short bio set'}
                    </p>
                  </div>
                </VisualEditingWrapper>
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 p-4 rounded">
                <p className="text-red-700">No about page data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Raw Data Display */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Raw Data Debug</h2>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96">
          <div className="text-xs text-gray-400 mb-2">Server-side fetch results:</div>
          <pre className="text-sm">
            {JSON.stringify({
              fetchTime: `${fetchTime}ms`,
              error: error || null,
              homepageDataKeys: homepageData ? Object.keys(homepageData) : null,
              aboutDataKeys: aboutData ? Object.keys(aboutData) : null,
              settingsId: homepageData?.settings?._id,
              artistId: homepageData?.artist?._id || aboutData?.artist?._id,
              homepageData: homepageData ? {
                settings: {
                  _id: homepageData.settings?._id,
                  title: homepageData.settings?.title,
                  heroSection: homepageData.settings?.heroSection
                },
                artist: {
                  _id: homepageData.artist?._id,
                  name: homepageData.artist?.name
                },
                featuredArtworksCount: homepageData.featuredArtworks?.length
              } : null,
              aboutData: aboutData ? {
                artist: {
                  _id: aboutData.artist?._id,
                  name: aboutData.artist?.name,
                  bioLength: aboutData.artist?.bio?.length,
                  statementLength: aboutData.artist?.statement?.length
                }
              } : null
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
