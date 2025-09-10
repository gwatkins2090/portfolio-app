'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'

export function SanityTest() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [projectInfo, setProjectInfo] = useState<any>(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic connection
        const result = await client.fetch('*[_type == "sanity.imageAsset"][0]')
        
        // Get project info
        const config = client.config()
        setProjectInfo({
          projectId: config.projectId,
          dataset: config.dataset,
          apiVersion: config.apiVersion,
        })
        
        setStatus('connected')
        console.log('✅ Sanity connection successful', { config, result })
      } catch (error) {
        setStatus('error')
        console.error('❌ Sanity connection failed:', error)
      }
    }

    testConnection()
  }, [])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div 
      style={{ 
        position: 'fixed', 
        bottom: 0, 
        right: 0, 
        zIndex: 1001,
        background: status === 'connected' ? '#10b981' : status === 'error' ? '#ef4444' : '#6b7280',
        color: 'white',
        padding: '8px 12px',
        fontSize: '12px',
        borderRadius: '4px 0 0 0',
        fontFamily: 'monospace',
        maxWidth: '300px'
      }}
    >
      <div>🔗 Sanity: {status}</div>
      {projectInfo && (
        <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>
          Project: {projectInfo.projectId}<br/>
          Dataset: {projectInfo.dataset}
        </div>
      )}
    </div>
  )
}
