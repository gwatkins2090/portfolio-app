'use client';

import Link from 'next/link';

interface DraftModeBannerProps {
  isEnabled: boolean;
}

export default function DraftModeBanner({ isEnabled }: DraftModeBannerProps) {
  if (!isEnabled) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white px-4 py-2 text-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
          <span className="font-medium">Preview Mode Active</span>
          <span className="text-blue-200">
            You are viewing draft content that may not be published yet.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/studio"
            className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-xs font-medium transition-colors"
          >
            Open Studio
          </Link>
          <Link
            href="/api/disable-draft"
            className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-1 rounded text-xs font-medium transition-colors"
          >
            Exit Preview
          </Link>
        </div>
      </div>
    </div>
  );
}
