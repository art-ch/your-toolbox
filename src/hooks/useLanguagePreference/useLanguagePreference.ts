'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { languages } from '@/lib/i18n/settings';
import Cookies from 'js-cookie';

export function useLanguagePreference() {
  const [preferredLanguage, setPreferredLanguage] = useState<string | null>(
    null
  );
  const router = useRouter();
  const pathname = usePathname();

  // Load saved preference on component mount
  useEffect(() => {
    const savedLanguage = Cookies.get('NEXT_LOCALE');
    if (savedLanguage && languages.includes(savedLanguage)) {
      setPreferredLanguage(savedLanguage);
    }
  }, []);

  // Change language and save preference
  const changeLanguage = (newLanguage: string) => {
    if (!languages.includes(newLanguage)) {
      console.error(`Language ${newLanguage} is not supported`);
      return;
    }

    // Set cookie with a reasonable expiration (1 year)
    Cookies.set('NEXT_LOCALE', newLanguage, {
      expires: 365,
      path: '/',
      sameSite: 'lax' // Good security practice
    });

    setPreferredLanguage(newLanguage);

    // Update URL to reflect language change
    const segments = pathname.split('/');
    segments[1] = newLanguage; // Replace the language segment
    const newPath = segments.join('/');

    router.push(newPath);
  };

  return { preferredLanguage, changeLanguage };
}
