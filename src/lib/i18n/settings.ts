import { Language, DefaultLanguage, TranslationNamespace } from './types';

export const defaultLanguage: DefaultLanguage = 'en' as const;
export const languages: Language[] = [defaultLanguage, 'uk', 'ru'] as const;

export const namespaces: TranslationNamespace[] = [
  'common',
  'homePage',
  'footer',
  'time',
  'asceticExerciseDuration'
] as const;

export const defaultNamespace: TranslationNamespace = 'common';

export function getI18nOptions(
  lng: Language = defaultLanguage,
  ns: TranslationNamespace | TranslationNamespace[] = defaultNamespace
) {
  return {
    supportedLngs: languages,
    fallbackLng: defaultLanguage,
    lng,
    fallbackNS: defaultNamespace,
    defaultNS: defaultNamespace,
    ns,
    interpolation: {
      escapeValue: false
    }
  };
}
