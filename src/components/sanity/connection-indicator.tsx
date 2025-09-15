'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity/lib/client';

interface ConnectionStatus {
  isConnected: boolean;
  projectId: string;
  dataset: string;
  lastChecked: Date;
}

export function ConnectionIndicator() {
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: false,
    projectId: '',
    dataset: '',
    lastChecked: new Date(),
  });

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Simple query to test connection
        await client.fetch('*[_type == "portfolioSettings"][0]._id');
        setStatus({
          isConnected: true,
          projectId: client.config().projectId || '',
          dataset: client.config().dataset || '',
          lastChecked: new Date(),
        });
      } catch (error) {
        setStatus(prev => ({
          ...prev,
          isConnected: false,
          lastChecked: new Date(),
        }));
      }
    };

    // Check connection immediately
    checkConnection();

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg bg-white border border-gray-200 text-sm"
      style={{ 
        fontSize: '12px',
        minWidth: 'auto',
        maxWidth: '200px'
      }}
    >
      {/* Connection Status Icon */}
      <div className="flex items-center gap-1">
        {status.isConnected ? (
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Connected to Sanity" />
        ) : (
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" title="Disconnected from Sanity" />
        )}
        <span className="text-gray-600 font-medium">
          {status.isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      {/* Project Info (only show when connected) */}
      {status.isConnected && (
        <div className="text-gray-500 text-xs border-l border-gray-200 pl-2">
          {status.projectId}
        </div>
      )}

      {/* Hover tooltip with more details */}
      <div className="absolute top-full right-0 mt-1 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        <div>Project: {status.projectId}</div>
        <div>Dataset: {status.dataset}</div>
        <div>Last checked: {status.lastChecked.toLocaleTimeString()}</div>
      </div>
    </div>
  );
}

// Minimal version for even less intrusion
export function MinimalConnectionIndicator() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await client.fetch('*[_type == "portfolioSettings"][0]._id');
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed top-4 right-4 z-50 w-6 h-6 rounded-full shadow-lg flex items-center justify-center"
      style={{ 
        backgroundColor: isConnected ? '#10b981' : '#ef4444',
        border: '2px solid white'
      }}
      title={isConnected ? 'Sanity Connected' : 'Sanity Disconnected'}
    >
      {isConnected ? (
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );
}
