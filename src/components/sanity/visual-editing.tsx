'use client'

// Visual editing is temporarily disabled due to package compatibility
// TODO: Update when @sanity/visual-editing stabilizes
export function SanityVisualEditing() {
  // Only enable in development and when visual editing is needed
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        zIndex: 1000,
        background: '#f0f0f0',
        padding: '8px',
        fontSize: '12px',
        borderRadius: '0 0 0 4px'
      }}
    >
      Visual Editing Ready
    </div>
  )
}
