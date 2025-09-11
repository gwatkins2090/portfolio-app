export function generatePreviewUrl(context: any): string {
  const doc = context.document ?? context;
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

  let url: string;

  switch (doc._type) {
    case 'artwork':
      url = `${baseUrl}/portfolio/${doc.slug?.current}`;
      break;
    case 'collection':
      url = `${baseUrl}/portfolio/collections/${doc.slug?.current}`;
      break;
    case 'exhibition':
      url = `${baseUrl}/exhibitions/${doc.slug?.current}`;
      break;
    case 'blogPost':
      url = `${baseUrl}/blog/${doc.slug?.current}`;
      break;
    case 'portfolioSettings':
      url = `${baseUrl}/`;
      break;
    case 'artist':
      url = `${baseUrl}/about`;
      break;
    default:
      url = `${baseUrl}/`;
  }

  return url;
}
