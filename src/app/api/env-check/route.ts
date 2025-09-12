import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    NEXT_PUBLIC_SANITY_PROJECT_TITLE: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE,
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN ? '***SET***' : 'NOT_SET',
    SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET ? '***SET***' : 'NOT_SET',
    SANITY_REVALIDATE_SECRET: process.env.SANITY_REVALIDATE_SECRET ? '***SET***' : 'NOT_SET',
    NODE_ENV: process.env.NODE_ENV,
  };

  return NextResponse.json(envVars);
}
