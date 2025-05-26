'use client';

import { I18nextProvider } from 'react-i18next';
import i18next from '@/lib/i18n/client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { languages } from '@/lib/i18n/settings';
import { AppProvider } from '@/context/AppContext/AppContext';

export function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white" />
    </div>
  );
}

export function Providers({
  children,
  lng
}: {
  children: React.ReactNode;
  lng: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle initial language detection and redirection
  useEffect(() => {
    if (isInitialized) return;

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');

    // If there's a saved preference and it's different from current URL language
    if (
      savedLanguage &&
      languages.includes(savedLanguage) &&
      savedLanguage !== lng
    ) {
      // Update URL to match preference
      const segments = pathname.split('/');
      segments[1] = savedLanguage;
      router.push(segments.join('/'));
    }

    setIsInitialized(true);
  }, [lng, pathname, router, isInitialized]);

  // Set the language on the client side
  useEffect(() => {
    if (lng) {
      i18next.changeLanguage(lng).then(() => {
        setIsLoading(false);
      });
    }
  }, [lng]);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <I18nextProvider i18n={i18next}>
      <Suspense fallback={<LoadingState />}>
        <AppProvider>{children}</AppProvider>
      </Suspense>
    </I18nextProvider>
  );
}
