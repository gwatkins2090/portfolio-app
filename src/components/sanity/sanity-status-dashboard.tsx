'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity/lib/client';

interface StatusDashboardProps {
  initialFetchTime: number;
  initialError: string | null;
  homepageData: any;
  aboutData: any;
}

interface ConnectionStatus {
  isConnected: boolean;
  lastChecked: Date;
  responseTime: number;
  error?: string;
}

interface EnvironmentStatus {
  projectId: string | undefined;
  dataset: string | undefined;
  hasServerToken: boolean;
  hasClientToken: boolean;
  hasPreviewSecret: boolean;
  apiVersion: string | undefined;
}

export function SanityStatusDashboard({ 
  initialFetchTime, 
  initialError, 
  homepageData, 
  aboutData 
}: StatusDashboardProps) {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: !initialError,
    lastChecked: new Date(),
    responseTime: initialFetchTime,
    error: initialError || undefined,
  });

  const [envStatus] = useState<EnvironmentStatus>({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    hasServerToken: !!process.env.SANITY_API_READ_TOKEN,
    hasClientToken: !!process.env.NEXT_PUBLIC_SANITY_API_READ_TOKEN,
    hasPreviewSecret: !!process.env.SANITY_PREVIEW_SECRET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  });

  const [isVisualEditingEnabled, setIsVisualEditingEnabled] = useState(false);
  const [isDraftMode, setIsDraftMode] = useState(false);

  // Test connection periodically
  useEffect(() => {
    const testConnection = async () => {
      const startTime = Date.now();
      try {
        await client.fetch('*[_type == "portfolioSettings"][0]._id');
        const endTime = Date.now();
        setConnectionStatus({
          isConnected: true,
          lastChecked: new Date(),
          responseTime: endTime - startTime,
        });
      } catch (error) {
        const endTime = Date.now();
        setConnectionStatus({
          isConnected: false,
          lastChecked: new Date(),
          responseTime: endTime - startTime,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    // Test immediately
    testConnection();

    // Test every 30 seconds
    const interval = setInterval(testConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  // Check visual editing and draft mode status
  useEffect(() => {
    // Check if we're in an iframe (presentation mode)
    const inIframe = window.parent !== window;
    
    // Check for draft mode cookie
    const hasDraftCookie = document.cookie.includes('__prerender_bypass');
    
    setIsVisualEditingEnabled(inIframe || hasDraftCookie);
    setIsDraftMode(hasDraftCookie);
  }, []);

  const StatusIndicator = ({ status, label }: { status: boolean; label: string }) => (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`} />
      <span className={status ? 'text-green-700' : 'text-red-700'}>{label}</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Real-time Connection Status */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${connectionStatus.isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          Real-time Connection Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <StatusIndicator status={connectionStatus.isConnected} label="Sanity Connected" />
            <p className="text-sm text-gray-600 mt-1">
              Last checked: {connectionStatus.lastChecked.toLocaleTimeString()}
            </p>
          </div>
          <div>
            <p className="text-sm">
              <span className="font-medium">Response Time:</span> {connectionStatus.responseTime}ms
            </p>
            <p className="text-sm">
              <span className="font-medium">Health:</span> 
              <span className={connectionStatus.responseTime < 1000 ? 'text-green-600' : connectionStatus.responseTime < 3000 ? 'text-yellow-600' : 'text-red-600'}>
                {connectionStatus.responseTime < 1000 ? ' Excellent' : connectionStatus.responseTime < 3000 ? ' Good' : ' Slow'}
              </span>
            </p>
          </div>
          <div>
            {connectionStatus.error && (
              <p className="text-sm text-red-600">
                <span className="font-medium">Error:</span> {connectionStatus.error}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Environment Configuration */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Environment Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <StatusIndicator status={!!envStatus.projectId} label={`Project ID: ${envStatus.projectId || 'Missing'}`} />
            <StatusIndicator status={!!envStatus.dataset} label={`Dataset: ${envStatus.dataset || 'Missing'}`} />
            <StatusIndicator status={!!envStatus.apiVersion} label={`API Version: ${envStatus.apiVersion || 'Missing'}`} />
          </div>
          <div className="space-y-2">
            <StatusIndicator status={envStatus.hasServerToken} label="Server Read Token" />
            <StatusIndicator status={envStatus.hasClientToken} label="Client Read Token" />
            <StatusIndicator status={envStatus.hasPreviewSecret} label="Preview Secret" />
          </div>
        </div>
      </div>

      {/* Visual Editing Status */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Visual Editing Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <StatusIndicator status={isVisualEditingEnabled} label="Visual Editing Enabled" />
            <StatusIndicator status={isDraftMode} label="Draft Mode Active" />
            <StatusIndicator status={window.parent !== window} label="Presentation Mode (iframe)" />
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Current URL:</span> {window.location.href}
            </p>
            <p className="text-sm">
              <span className="font-medium">User Agent:</span> {navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other'}
            </p>
          </div>
        </div>
      </div>

      {/* Sanity Client Configuration */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Sanity Client Configuration</h2>
        <div className="bg-gray-50 p-4 rounded text-sm font-mono">
          <pre>{JSON.stringify({
            projectId: client.config().projectId,
            dataset: client.config().dataset,
            apiVersion: client.config().apiVersion,
            useCdn: client.config().useCdn,
            perspective: client.config().perspective,
            hasToken: !!client.config().token,
            stegaEnabled: !!client.config().stega,
          }, null, 2)}</pre>
        </div>
      </div>

      {/* Data Status */}
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Content Data Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Homepage Data</h3>
            <StatusIndicator status={!!homepageData?.settings} label="Portfolio Settings" />
            <StatusIndicator status={!!homepageData?.artist} label="Artist Profile" />
            <StatusIndicator status={!!homepageData?.featuredArtworks?.length} label={`Featured Artworks (${homepageData?.featuredArtworks?.length || 0})`} />
          </div>
          <div>
            <h3 className="font-medium mb-2">About Page Data</h3>
            <StatusIndicator status={!!aboutData?.artist} label="Artist Biography" />
            <StatusIndicator status={!!aboutData?.settings} label="Settings Reference" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions & Testing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Visual Editing Test</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Open <a href="/studio/presentation" target="_blank" className="text-blue-600 underline">/studio/presentation</a></li>
              <li>Navigate to this page in the preview</li>
              <li>Look for edit overlays on content below</li>
              <li>Try clicking on colored boxes to edit</li>
            </ol>
          </div>
          <div>
            <h3 className="font-medium mb-2">Draft Mode Test</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Visit <a href="/api/draft?secret=xvw9fazokd9&slug=/test-sanity" className="text-blue-600 underline">Enable Draft Mode</a></li>
              <li>Return to this page</li>
              <li>Check that "Draft Mode Active" shows green</li>
              <li>Make changes in studio to see live updates</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
