'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { languages } from '@/lib/i18n/settings';
import { useLanguagePreference } from '@/hooks/useLanguagePreference/useLanguagePreference';
import { enrichPathWithLanguage } from '@/utils/i18n';
import { Language } from '@/lib/i18n/types';

export function useLanguageInitialization(language: Language) {
  const router = useRouter();
  const pathname = usePathname();
  const { preferredLanguage } = useLanguagePreference();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    // If there's a saved preference and it's different from current URL language
    if (
      preferredLanguage &&
      languages.includes(preferredLanguage) &&
      preferredLanguage !== language
    ) {
      // Update URL to match preference
      enrichPathWithLanguage(pathname, preferredLanguage, router);
    }

    setIsInitialized(true);
  }, [language, pathname, router, isInitialized, preferredLanguage]);

  return { isInitialized };
}
