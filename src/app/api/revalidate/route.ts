import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;

type WebhookPayload = {
  _type: string;
  slug?: string | undefined;
};

export async function POST(request: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      request,
      revalidateSecret,
    );

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    if (!body?._type) {
      const message = 'Bad Request';
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    // Revalidate based on document type
    const tags = [body._type];
    
    // Add specific tags based on document type
    if (body.slug) {
      tags.push(`${body._type}:${body.slug}`);
    }

    // Revalidate all relevant tags
    for (const tag of tags) {
      revalidateTag(tag);
    }

    // Also revalidate common pages
    revalidateTag('homepage');
    revalidateTag('portfolio');

    const message = `Updated route: ${body._type}`;
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
      message,
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return new Response(
      JSON.stringify({
        message: 'Internal Server Error',
        error: err instanceof Error ? err.message : 'Unknown error',
      }),
      { status: 500 }
    );
  }
}
