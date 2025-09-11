import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { client } from '@/lib/sanity/lib/client';
import { readToken, previewSecret } from '@/lib/sanity/lib/tokens';

export async function GET(request: Request) {
  if (!previewSecret) {
    return new Response('Missing SANITY_PREVIEW_SECRET', { status: 500 });
  }

  if (!readToken) {
    return new Response('Missing SANITY_API_READ_TOKEN', { status: 500 });
  }

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client.withConfig({ token: readToken }),
    request.url
  );

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 });
  }

  // Enable draft mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the path from the fetched post
  redirect(redirectTo);
}
