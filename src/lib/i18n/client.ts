'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getI18nOptions } from './settings';

// Initialize i18next for client-side
i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getI18nOptions(),
    react: {
      useSuspense: true,
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p']
    }
  });

export default i18next;
