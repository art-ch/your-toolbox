import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getI18nOptions, defaultLanguage } from './settings';
import { TFunction, i18n } from 'i18next';
import { Language, TranslationNamespace } from './types';

/**
 * Initializes an i18next instance with the specified language and namespace(s)
 *
 * @param lng - The language code to initialize
 * @param ns - The namespace or array of namespaces to load
 * @returns The initialized i18next instance
 */
export const initI18next = async (
  lng: Language,
  ns: TranslationNamespace | TranslationNamespace[]
): Promise<i18n> => {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../locales/${language}/${namespace}.json`)
      )
    )
    .init(getI18nOptions(lng, ns));

  return i18nInstance;
};

/**
 * Gets translation functions for the specified language and namespace(s)
 *
 * @param lng - The language code to use
 * @param ns - The namespace or array of namespaces to load
 * @returns Object containing the translation function and i18next instance
 */
export async function getTranslations(
  lng: Language,
  ns: TranslationNamespace | TranslationNamespace[]
): Promise<{ t: TFunction; i18n: i18n }> {
  try {
    const i18nextInstance = await initI18next(lng, ns);

    return {
      t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
      i18n: i18nextInstance
    };
  } catch (error) {
    console.error('Error getting translations:', error);

    const i18nextInstance = createInstance();
    // Initialize with minimal options to get a proper TFunction
    await i18nextInstance.init({
      lng,
      fallbackLng: defaultLanguage,
      resources: {}
    });

    return {
      t: i18nextInstance.getFixedT(lng),
      i18n: i18nextInstance
    };
  }
}
