export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2025-06-04';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5ave8l4g';

export const projectTitle =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ?? 'Jennifer Watkins Art Portfolio';

export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
