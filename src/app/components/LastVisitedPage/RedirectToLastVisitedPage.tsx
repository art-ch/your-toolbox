'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useLocalStorage,
  useSessionStorage
} from '@/hooks/useStorage/useStorage';

export function RedirectToLastVisitedPage() {
  const router = useRouter();
  const redirectAttempted = useRef(false);

  const [lastUrl] = useLocalStorage<string>('lastVisitedUrl', '');
  const [userActiveThisSession] = useSessionStorage<boolean>(
    'userActiveThisSession',
    false
  );
  const [hasVisitedHomepage, setHasVisitedHomepage] =
    useSessionStorage<boolean>('hasVisitedHomepage', false);

  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Always mark homepage as visited
    if (!hasVisitedHomepage) {
      setHasVisitedHomepage(true);
    }

    // Early returns for cases where we shouldn't redirect
    const shouldNotRedirect =
      redirectAttempted.current ||
      !lastUrl ||
      typeof lastUrl !== 'string' ||
      hasVisitedHomepage ||
      userActiveThisSession;

    if (shouldNotRedirect) {
      return;
    }

    // If we get here, we should redirect - this is a fresh session starting at homepage
    redirectAttempted.current = true;
    setIsRedirecting(true);

    // Delay navigation slightly to ensure state updates complete
    setTimeout(() => {
      try {
        router.push(lastUrl);
      } catch {
        // Fall back to window.location.assign if router fails
        window.location.assign(lastUrl);
      }
    }, 500);
  }, [
    lastUrl,
    userActiveThisSession,
    hasVisitedHomepage,
    setHasVisitedHomepage,
    router
  ]);

  if (isRedirecting) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-lg">Returning to the last visited page...</p>
      </div>
    );
  }

  return null;
}
