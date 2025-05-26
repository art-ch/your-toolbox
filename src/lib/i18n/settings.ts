export const languages = ['en', 'uk', 'ru'];
export const defaultLanguage = 'en';
export const defaultNamespace = 'common';

export function getI18nOptions(
  lng = defaultLanguage,
  ns: string | string[] = defaultNamespace
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
