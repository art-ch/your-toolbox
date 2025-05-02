'use client';

import { I18nextProvider } from 'react-i18next';
import i18next from '@/lib/i18n/client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { languages } from '@/lib/i18n/settings';
import { AppProvider } from '@/context/AppContext/AppContext';

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
      i18next.changeLanguage(lng);
    }
  }, [lng]);

  return (
    <I18nextProvider i18n={i18next}>
      <AppProvider>{children}</AppProvider>
    </I18nextProvider>
  );
}
