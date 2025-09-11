import { draftMode } from 'next/headers';
import { SanityLive } from '@/sanity/lib/live';
import DraftModeBanner from '@/components/sanity/DraftModeBanner';
import SanityVisualEditing from '@/components/sanity/visual-editing';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <DraftModeBanner isEnabled={isDraftMode} />
      <div className={isDraftMode ? 'pt-12' : ''}>
        {children}
      </div>
      {isDraftMode && <SanityVisualEditing />}
      <SanityLive />
    </>
  );
}
