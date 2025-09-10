'use client'

import { useEffect } from 'react'
import { client } from '@/lib/sanity'

export function SanityVisualEditing() {
  useEffect(() => {
    // Only enable in development
    if (process.env.NODE_ENV !== 'development') {
      return
    }

    // Import and initialize visual editing dynamically
    const initVisualEditing = async () => {
      try {
        const { enableVisualEditing } = await import('@sanity/visual-editing')

        enableVisualEditing({
          zIndex: 1000,
        })

        console.log('✅ Sanity Visual Editing enabled')
      } catch (error) {
        console.warn('⚠️ Visual editing not available:', error)
      }
    }

    initVisualEditing()
  }, [])

  // Only show indicator in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 1001,
        background: '#2276fc',
        color: 'white',
        padding: '4px 8px',
        fontSize: '11px',
        borderRadius: '0 0 0 4px',
        fontFamily: 'monospace'
      }}
    >
      🎨 Visual Editing
    </div>
  )
}
