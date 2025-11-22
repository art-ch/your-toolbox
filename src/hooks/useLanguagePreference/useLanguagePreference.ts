'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { languages } from '@/lib/i18n/settings';
import Cookies from 'js-cookie';
import { enrichPathWithLanguage } from '@/utils/i18n';
import { Language } from '@/lib/i18n/types';
import { parseLanguage } from '@/utils/i18n/parseLanguage';

export function useLanguagePreference() {
  const [preferredLanguage, setPreferredLanguage] = useState<Language | null>(
    null
  );
  const router = useRouter();
  const pathname = usePathname();

  // Load saved preference on component mount
  useEffect(() => {
    const savedLanguage = parseLanguage(Cookies.get('NEXT_LOCALE'));

    if (savedLanguage && languages.includes(savedLanguage)) {
      setPreferredLanguage(savedLanguage);
    }
  }, []);

  // Sync cookie with URL language when pathname changes
  useEffect(() => {
    // Extract language from pathname (e.g., /en/page -> en, /fr -> fr)
    const pathSegments = pathname.split('/').filter(Boolean);
    const urlLanguage = pathSegments[0] as Language | undefined;

    // If the first segment is a valid language, sync cookie with URL
    if (urlLanguage && languages.includes(urlLanguage)) {
      const currentCookieLocale = Cookies.get('NEXT_LOCALE');

      // Update cookie if it doesn't match the URL language
      // This ensures the cookie reflects the actual locale in the URL
      // Important for navigation - when user clicks a link to "/",
      // the middleware will use the cookie to determine the locale
      if (currentCookieLocale !== urlLanguage) {
        Cookies.set('NEXT_LOCALE', urlLanguage, {
          expires: 365,
          path: '/',
          sameSite: 'lax'
        });
        setPreferredLanguage(urlLanguage);
      }
    }
  }, [pathname]);

  // Change language and save preference
  const changeLanguage = (newLanguage: Language) => {
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
    enrichPathWithLanguage(pathname, newLanguage, router);
  };

  return { preferredLanguage, changeLanguage };
}
