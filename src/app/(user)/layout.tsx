import { draftMode } from 'next/headers';
import { SanityLive } from '@/lib/sanity/lib/live';
import DraftModeBanner from '@/components/sanity/DraftModeBanner';
import SanityVisualEditing from '@/components/sanity/visual-editing';

const UserLayout = async ({ children }: { children: React.ReactNode }) => {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <>
      <DraftModeBanner isEnabled={isDraftMode} />
      <div className={isDraftMode ? 'pt-12' : ''}>{children}</div>
      {isDraftMode && <SanityVisualEditing />}
      <SanityLive />
    </>
  );
};

export default UserLayout;
