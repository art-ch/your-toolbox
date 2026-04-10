'use client';

import { useAppContext } from '@/context/AppContext/AppContext';
import { cn } from '@/lib/utils';

export const Main = ({ children }: { children: React.ReactNode }) => {
  const { fullScreenMode } = useAppContext();

  const widthClass = fullScreenMode.isFullScreen
    ? 'w-full'
    : 'max-w-(--breakpoint-xl)';

  return (
    <main
      className={cn(
        // 44 (height of header and paddings) + 48 (height of footer) = 92
        // position relative to make sure full screen mode button on pages is displayed correctly
        'relative min-h-[calc(100vh-92px)] my-0 mx-auto px-4 sm:px-6 2xl:px-0',
        widthClass
      )}
    >
      {children}
    </main>
  );
};
