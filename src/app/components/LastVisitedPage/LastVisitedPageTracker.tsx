'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import {
  useLocalStorage,
  useSessionStorage
} from '@/hooks/useStorage/useStorage';

export function LastVisitedPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const [_, updateLastUrl] = useLocalStorage
  const { 1: updateLastUrl } = useLocalStorage<string>('lastVisitedUrl', '');
  // const [__, setActiveThisSession] = useLocalStorage
  const { 1: setActiveThisSession } = useSessionStorage<boolean>(
    'userActiveThisSession',
    false
  );

  useEffect(() => {
    // Mark user as active in this session as soon as they load any page
    setActiveThisSession(true);

    // Only track non-homepage URLs
    if (pathname && pathname !== '/') {
      const search = searchParams?.toString() || '';
      const fullUrl = search ? `${pathname}?${search}` : pathname;
      updateLastUrl(fullUrl);
    }
  }, [pathname, searchParams, updateLastUrl, setActiveThisSession]);

  return null;
}
