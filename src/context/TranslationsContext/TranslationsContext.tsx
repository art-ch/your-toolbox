'use client';

import { ReactNode, useEffect } from 'react';
import i18next from '@/lib/i18n/client';
import { Language } from '@/lib/i18n/types';

export type TranslationsProviderProps = {
  children: ReactNode;
  language: Language;
  namespaces: string[];
  resources: Record<string, unknown>;
};

export function TranslationsProvider({
  children,
  language,
  namespaces,
  resources
}: TranslationsProviderProps) {
  useEffect(() => {
    // Add resources that were loaded on the server
    namespaces.forEach((ns) => {
      i18next.addResourceBundle(language, ns, resources[ns]);
    });

    // Set language based on URL parameter
    i18next.changeLanguage(language);
  }, [language, namespaces, resources]);

  return children;
}
