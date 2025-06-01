'use client';

import { useState, useEffect } from 'react';
import i18next from '@/lib/i18n/client';
import { languages } from '@/lib/i18n/settings';
import { useLanguagePreference } from '@/hooks/useLanguagePreference/useLanguagePreference';
import { Language } from '@/lib/i18n/types';

export function useLanguageLoader(language: Language) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const { changeLanguage: setPreferredLanguage } = useLanguagePreference();

  useEffect(() => {
    if (language) {
      setCurrentLanguage(language);
      i18next.changeLanguage(language).then(() => {
        setIsLoading(false);
      });
    }
  }, [language]);

  const changeLanguage = (newLanguage: Language) => {
    if (languages.includes(newLanguage)) {
      setPreferredLanguage(newLanguage);
    }
  };

  return { isLoading, currentLanguage, changeLanguage };
}
