import { getTranslations } from './server';
import { ReactNode } from 'react';
import { defaultLanguage } from './settings';
import { TranslationsProvider } from '@/context/i18nContext/i18nContext';
import { i18n } from 'i18next';

const createEmptyResources = (namespaces: string[]): Record<string, unknown> =>
  namespaces.reduce((acc, ns) => {
    acc[ns] = {};
    return acc;
  }, {} as Record<string, unknown>);

async function loadResourceBundles(
  i18n: i18n,
  locale: string,
  namespaces: string[]
): Promise<Record<string, unknown>> {
  const resources: Record<string, unknown> = {};

  // Check if i18n instance is valid
  if (!i18n || typeof i18n.getResourceBundle !== 'function') {
    console.error('Invalid i18n instance or missing getResourceBundle method');
    return createEmptyResources(namespaces);
  }

  // Load each namespace
  for (const ns of namespaces) {
    resources[ns] = await loadSingleResourceBundle(i18n, locale, ns);
  }

  return resources;
}

async function loadSingleResourceBundle(
  i18n: i18n,
  locale: string,
  namespace: string
): Promise<unknown> {
  try {
    const resource = i18n.getResourceBundle(locale, namespace);

    if (resource) {
      return resource;
    }

    console.warn(
      `Resource bundle for locale "${locale}" and namespace "${namespace}" not found.`
    );
    return {};
  } catch (error) {
    console.error(
      `Error loading resource bundle for locale "${locale}" and namespace "${namespace}":`,
      error
    );
    return {};
  }
}

export type CreateTranslationProviderProps = {
  children: ReactNode;
  locale: string;
  namespaces?: string[];
};

export async function createTranslationProvider({
  children,
  locale,
  namespaces = ['common']
}: CreateTranslationProviderProps) {
  const safeLocale = locale || defaultLanguage;

  const { i18n } = await getTranslations(safeLocale, namespaces);

  const resources = await loadResourceBundles(i18n, safeLocale, namespaces);

  return (
    <TranslationsProvider
      locale={safeLocale}
      namespaces={namespaces}
      resources={resources}
    >
      {children}
    </TranslationsProvider>
  );
}
