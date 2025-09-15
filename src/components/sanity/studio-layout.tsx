'use client';

import { LayoutProps } from 'sanity';
import { useEffect, useState } from 'react';

export function StudioLayout(props: LayoutProps) {
  const [isStable, setIsStable] = useState(false);

  useEffect(() => {
    // Add a small delay to prevent rapid re-renders that cause flashing
    const timer = setTimeout(() => {
      setIsStable(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Show loading state briefly to prevent flashing
  if (!isStable) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        backgroundColor: '#f1f5f9'
      }}>
        <div style={{ 
          textAlign: 'center',
          color: '#64748b',
          fontSize: '14px'
        }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            border: '2px solid #e2e8f0',
            borderTop: '2px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 12px'
          }} />
          Loading Studio...
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return props.renderDefault(props);
}
