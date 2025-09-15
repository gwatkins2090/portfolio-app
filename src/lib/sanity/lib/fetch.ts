import 'server-only';
import { draftMode } from 'next/headers';
import { client } from './client';
import { readToken } from './tokens';

const DEFAULT_PARAMS = {};
const DEFAULT_TAGS: string[] = [];

export default async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string;
  params?: any;
  tags?: string[];
}): Promise<QueryResponse> {
  const isDraftMode = (await draftMode()).isEnabled;

  if (isDraftMode && !readToken) {
    throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required.');
  }

  const perspective = isDraftMode ? 'previewDrafts' : 'published';

  const queryClient = client.withConfig({
    token: isDraftMode ? readToken : undefined,
    perspective,
    useCdn: !isDraftMode,
    stega: isDraftMode,
  });

  return queryClient.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: isDraftMode ? 0 : false,
      tags,
    },
  });
}
