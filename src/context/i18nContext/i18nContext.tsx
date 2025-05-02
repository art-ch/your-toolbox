'use client';

import { ReactNode, useEffect } from 'react';
import i18next from '@/lib/i18n/client';

export type TranslationsProviderProps = {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources: Record<string, unknown>;
};

export function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: TranslationsProviderProps) {
  useEffect(() => {
    // Add resources that were loaded on the server
    namespaces.forEach((ns) => {
      i18next.addResourceBundle(locale, ns, resources[ns]);
    });

    // Set language based on URL parameter
    i18next.changeLanguage(locale);
  }, [locale, namespaces, resources]);

  return children;
}
