import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { client } from '@/sanity/lib/client';

const previewSecret = process.env.SANITY_PREVIEW_SECRET;
const token = process.env.SANITY_API_READ_TOKEN;

export async function GET(request: Request) {
  if (!previewSecret) {
    return new Response('Missing SANITY_PREVIEW_SECRET', { status: 500 });
  }

  if (!token) {
    return new Response('Missing SANITY_API_READ_TOKEN', { status: 500 });
  }

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client.withConfig({ token }),
    request.url,
    previewSecret,
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
