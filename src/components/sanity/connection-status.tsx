'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity/lib/client';

interface ConnectionStatus {
  isConnected: boolean;
  projectId: string;
  dataset: string;
  lastChecked: Date;
}

export function ConnectionStatusIndicator() {
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: false,
    projectId: '',
    dataset: '',
    lastChecked: new Date(),
  });
  const [showTooltip, setShowTooltip] = useState(false);

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
      className="fixed top-4 right-4 z-50"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{ 
        pointerEvents: 'auto',
        zIndex: 9999
      }}
    >
      {/* Main Indicator */}
      <div 
        className={`w-6 h-6 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
          status.isConnected 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-red-500 hover:bg-red-600'
        }`}
        style={{ 
          border: '2px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}
        title={status.isConnected ? 'Sanity Connected' : 'Sanity Disconnected'}
      >
        {status.isConnected ? (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="absolute top-full right-0 mt-2 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl"
          style={{ 
            minWidth: '200px',
            zIndex: 10000
          }}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${status.isConnected ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="font-medium">
                {status.isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            {status.isConnected && (
              <>
                <div className="text-gray-300">
                  <div>Project: {status.projectId}</div>
                  <div>Dataset: {status.dataset}</div>
                </div>
              </>
            )}
            <div className="text-gray-400 text-xs border-t border-gray-700 pt-1 mt-2">
              Last checked: {status.lastChecked.toLocaleTimeString()}
            </div>
          </div>
          
          {/* Tooltip arrow */}
          <div 
            className="absolute -top-1 right-3 w-2 h-2 bg-gray-900 transform rotate-45"
          />
        </div>
      )}
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
      className="fixed top-4 right-4 z-50 w-4 h-4 rounded-full shadow-lg"
      style={{ 
        backgroundColor: isConnected ? '#10b981' : '#ef4444',
        border: '1px solid white',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
      title={isConnected ? 'Sanity Connected' : 'Sanity Disconnected'}
    />
  );
}
