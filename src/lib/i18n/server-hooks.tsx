import { getTranslations } from './server';
import { ReactNode } from 'react';
import { defaultLanguage, defaultNamespace } from './settings';
import { TranslationsProvider } from '@/context/TranslationsContext/TranslationsContext';
import { i18n } from 'i18next';
import { Language, TranslationNamespace } from './types';

/**
 * Creates an empty resources object with the specified namespaces
 * @param namespaces - Array of namespace strings to initialize
 * @returns An object with empty objects for each namespace
 */
const createEmptyResources = (namespaces: string[]): Record<string, unknown> =>
  namespaces.reduce<Record<string, unknown>>((acc, ns) => {
    acc[ns] = {};

    return acc;
  }, {});

/**
 * Loads a single resource bundle for a specific locale and namespace
 * @param i18n - The i18next instance
 * @param locale - The locale code to load resources for
 * @param namespace - The namespace to load resources for
 * @returns The resource bundle or an empty object if not found
 */
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
      `Resource bundle for locale "${locale}" and namespace "${namespace}" has not been found.`
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

/**
 * Loads multiple resource bundles for a specific locale and array of namespaces
 * @param i18n - The i18next instance
 * @param locale - The locale code to load resources for
 * @param namespaces - Array of namespaces to load resources for
 * @returns Object containing all loaded resource bundles by namespace
 */
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

/**
 * Props for the createTranslationProvider function
 */
export type CreateTranslationProviderProps = {
  children: ReactNode;
  locale: Language;
  namespaces?: TranslationNamespace[];
};

/**
 * Creates a TranslationsProvider component with loaded translations
 * @param props - The component props
 * @param props.children - Child components to wrap with the provider
 * @param props.locale - The locale code to use for translations
 * @param props.namespaces - Optional array of namespaces to load (defaults to ['common'])
 * @returns A TranslationsProvider component with loaded translation resources
 */
export async function createTranslationProvider({
  children,
  locale,
  namespaces = [defaultNamespace]
}: CreateTranslationProviderProps) {
  const safeLocale = locale || defaultLanguage;

  const { i18n } = await getTranslations(safeLocale, namespaces);

  const resources = await loadResourceBundles(i18n, safeLocale, namespaces);

  return (
    <TranslationsProvider
      language={safeLocale}
      namespaces={namespaces}
      resources={resources}
    >
      {children}
    </TranslationsProvider>
  );
}
