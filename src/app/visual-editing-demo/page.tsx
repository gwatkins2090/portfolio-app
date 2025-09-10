'use client'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { EditableContent, EditableText, EditableImage } from '@/components/sanity/editable-content'
import { usePortfolioSettings, useArtistProfile, useFeaturedArtworks } from '@/hooks/use-sanity-content'

export default function VisualEditingDemoPage() {
  const { content: settings, loading: settingsLoading } = usePortfolioSettings()
  const { content: artist, loading: artistLoading } = useArtistProfile()
  const { content: artworks, loading: artworksLoading } = useFeaturedArtworks()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container px-4 max-w-4xl mx-auto">
          
          {/* Page Title */}
          <EditableText
            text="Visual Editing Demo"
            documentId="demo-page"
            documentType="page"
            fieldPath="title"
            as="h1"
            className="text-4xl font-serif font-bold text-foreground mb-8 text-center"
          />

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-12">
            <h2 className="text-xl font-semibold mb-4">🎨 How Visual Editing Works</h2>
            <div className="space-y-3 text-sm">
              <p><strong>In Development Mode:</strong> All content below has visual editing enabled</p>
              <p><strong>Editable Elements:</strong> Look for subtle hover effects and edit indicators</p>
              <p><strong>To Edit:</strong> Click on any editable element to modify it in the Sanity Studio</p>
              <p><strong>Real-time Updates:</strong> Changes appear instantly without page refresh</p>
            </div>
          </div>

          {/* Portfolio Settings Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6">Portfolio Settings</h2>
            {settingsLoading ? (
              <div className="animate-pulse">Loading portfolio settings...</div>
            ) : settings ? (
              <EditableContent
                documentId={settings._id}
                documentType="portfolioSettings"
                className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <EditableText
                  text={settings.siteName || "Jennifer Watkins Art"}
                  documentId={settings._id}
                  documentType="portfolioSettings"
                  fieldPath="siteName"
                  as="h3"
                  className="text-xl font-bold"
                />
                <EditableText
                  text={settings.tagline || "Contemporary Abstract Expressionism"}
                  documentId={settings._id}
                  documentType="portfolioSettings"
                  fieldPath="tagline"
                  as="p"
                  className="text-lg text-muted-foreground"
                />
                <EditableText
                  text={settings.description || "Explore the vibrant world of contemporary abstract art."}
                  documentId={settings._id}
                  documentType="portfolioSettings"
                  fieldPath="description"
                  as="p"
                  className="text-base"
                />
              </EditableContent>
            ) : (
              <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p>No portfolio settings found. Create them in the studio!</p>
                <a href="/studio" className="text-blue-600 hover:underline">Open Studio →</a>
              </div>
            )}
          </section>

          {/* Artist Profile Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6">Artist Profile</h2>
            {artistLoading ? (
              <div className="animate-pulse">Loading artist profile...</div>
            ) : artist ? (
              <EditableContent
                documentId={artist._id}
                documentType="artist"
                className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <EditableText
                  text={artist.name || "Jennifer Watkins"}
                  documentId={artist._id}
                  documentType="artist"
                  fieldPath="name"
                  as="h3"
                  className="text-xl font-bold"
                />
                <EditableText
                  text={artist.bio || "Contemporary artist specializing in abstract expressionism."}
                  documentId={artist._id}
                  documentType="artist"
                  fieldPath="bio"
                  as="p"
                  className="text-base"
                />
                <EditableText
                  text={artist.location || "New York, NY"}
                  documentId={artist._id}
                  documentType="artist"
                  fieldPath="location"
                  as="p"
                  className="text-sm text-muted-foreground"
                />
              </EditableContent>
            ) : (
              <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p>No artist profile found. Create one in the studio!</p>
                <a href="/studio" className="text-blue-600 hover:underline">Open Studio →</a>
              </div>
            )}
          </section>

          {/* Artworks Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6">Featured Artworks</h2>
            {artworksLoading ? (
              <div className="animate-pulse">Loading artworks...</div>
            ) : artworks && artworks.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {artworks.slice(0, 4).map((artwork: any) => (
                  <EditableContent
                    key={artwork._id}
                    documentId={artwork._id}
                    documentType="artwork"
                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <EditableText
                      text={artwork.title}
                      documentId={artwork._id}
                      documentType="artwork"
                      fieldPath="title"
                      as="h4"
                      className="text-lg font-semibold mb-2"
                    />
                    <EditableText
                      text={`${artwork.year} • ${artwork.medium}`}
                      documentId={artwork._id}
                      documentType="artwork"
                      fieldPath="year"
                      as="p"
                      className="text-sm text-muted-foreground mb-2"
                    />
                    <EditableText
                      text={artwork.description || "No description available"}
                      documentId={artwork._id}
                      documentType="artwork"
                      fieldPath="description"
                      as="p"
                      className="text-sm"
                    />
                    {artwork.price && (
                      <EditableText
                        text={`$${artwork.price.toLocaleString()}`}
                        documentId={artwork._id}
                        documentType="artwork"
                        fieldPath="price"
                        as="p"
                        className="text-lg font-bold text-gallery-gold mt-2"
                      />
                    )}
                  </EditableContent>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p>No artworks found. Create some in the studio!</p>
                <a href="/studio" className="text-blue-600 hover:underline">Open Studio →</a>
              </div>
            )}
          </section>

          {/* Quick Actions */}
          <section className="text-center">
            <h2 className="text-2xl font-serif font-bold mb-6">Quick Actions</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/studio" 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Open Sanity Studio
              </a>
              <a 
                href="/sanity-debug" 
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Debug Dashboard
              </a>
              <a 
                href="/" 
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Homepage
              </a>
            </div>
          </section>

          {/* Development Info */}
          {process.env.NODE_ENV === 'development' && (
            <section className="mt-12 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">🔧 Development Mode Active</h3>
              <div className="text-sm space-y-2">
                <p>✅ Visual editing is enabled</p>
                <p>✅ Real-time content updates</p>
                <p>✅ Sanity connection active</p>
                <p>💡 In production, only the content will show (no edit indicators)</p>
              </div>
            </section>
          )}

        </div>
      </main>
      <Footer />
    </div>
  )
}
