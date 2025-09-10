'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

interface DebugInfo {
  connection: 'loading' | 'connected' | 'error'
  projectInfo: any
  schemaTypes: string[]
  documentCounts: Record<string, number>
  error?: string
}

export default function SanityDebugPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    connection: 'loading',
    projectInfo: null,
    schemaTypes: [],
    documentCounts: {},
  })

  useEffect(() => {
    const runDiagnostics = async () => {
      try {
        console.log('🔍 Running Sanity diagnostics...')
        
        // Test basic connection
        const config = client.config()
        console.log('📡 Client config:', config)
        
        // Get schema types
        const schemaTypes = await client.fetch('array::unique(*[]._type)')
        console.log('📋 Schema types:', schemaTypes)
        
        // Get document counts for each type
        const documentCounts: Record<string, number> = {}
        for (const type of schemaTypes) {
          try {
            const count = await client.fetch(`count(*[_type == "${type}"])`)
            documentCounts[type] = count
          } catch (error) {
            documentCounts[type] = -1 // Error getting count
          }
        }
        
        setDebugInfo({
          connection: 'connected',
          projectInfo: config,
          schemaTypes,
          documentCounts,
        })
        
        console.log('✅ Diagnostics complete')
        
      } catch (error) {
        console.error('❌ Diagnostics failed:', error)
        setDebugInfo({
          connection: 'error',
          projectInfo: null,
          schemaTypes: [],
          documentCounts: {},
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    runDiagnostics()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔧 Sanity CMS Debug Dashboard</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Connection Status</h2>
        <div style={{ 
          padding: '10px', 
          borderRadius: '4px',
          backgroundColor: debugInfo.connection === 'connected' ? '#d1fae5' : 
                          debugInfo.connection === 'error' ? '#fee2e2' : '#f3f4f6',
          color: debugInfo.connection === 'connected' ? '#065f46' : 
                 debugInfo.connection === 'error' ? '#991b1b' : '#374151'
        }}>
          Status: {debugInfo.connection}
          {debugInfo.error && <div>Error: {debugInfo.error}</div>}
        </div>
      </div>

      {debugInfo.projectInfo && (
        <div style={{ marginBottom: '20px' }}>
          <h2>Project Configuration</h2>
          <div style={{ backgroundColor: '#f9fafb', padding: '10px', borderRadius: '4px' }}>
            <div>Project ID: {debugInfo.projectInfo.projectId}</div>
            <div>Dataset: {debugInfo.projectInfo.dataset}</div>
            <div>API Version: {debugInfo.projectInfo.apiVersion}</div>
            <div>Use CDN: {debugInfo.projectInfo.useCdn ? 'Yes' : 'No'}</div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <h2>Schema Types ({debugInfo.schemaTypes.length})</h2>
        <div style={{ backgroundColor: '#f9fafb', padding: '10px', borderRadius: '4px' }}>
          {debugInfo.schemaTypes.length === 0 ? (
            <div style={{ color: '#ef4444' }}>No schema types found</div>
          ) : (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {debugInfo.schemaTypes.map(type => (
                <li key={type} style={{ marginBottom: '4px' }}>
                  <strong>{type}</strong>
                  {debugInfo.documentCounts[type] !== undefined && (
                    <span style={{ marginLeft: '10px', color: '#6b7280' }}>
                      ({debugInfo.documentCounts[type]} documents)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Expected Schema Types</h2>
        <div style={{ backgroundColor: '#f9fafb', padding: '10px', borderRadius: '4px' }}>
          <p>Your studio should have these content types:</p>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>artwork</li>
            <li>artist</li>
            <li>exhibition</li>
            <li>collection</li>
            <li>blogPost</li>
            <li>testimonial</li>
            <li>portfolioSettings</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a 
            href="/studio" 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '4px' 
            }}
          >
            Open Studio
          </a>
          <a 
            href="/" 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#059669', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '4px' 
            }}
          >
            Back to Website
          </a>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#7c3aed', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Refresh Diagnostics
          </button>
        </div>
      </div>

      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '40px' }}>
        <p>💡 <strong>Troubleshooting Tips:</strong></p>
        <ul>
          <li>If no schema types are found, check your sanity.config.ts file</li>
          <li>If connection fails, verify your environment variables</li>
          <li>If studio is empty, try restarting the development server</li>
          <li>Check the browser console for additional error messages</li>
        </ul>
      </div>
    </div>
  )
}
