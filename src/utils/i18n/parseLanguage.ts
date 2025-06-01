import { z } from 'zod';
import { defaultLanguage, languages } from '@/lib/i18n/settings';
import { Language } from '@/lib/i18n/types';

/**
 * Zod schema for validating language strings
 */
export const languageSchema = z.enum(languages as [Language, ...Language[]]);

/**
 * Safely parses the i18n language string and returns a valid Language type
 * Falls back to defaultLanguage if the language is invalid
 *
 * @param i18nLanguage - The language string from i18n.language
 * @returns A valid Language type
 */
export const parseLanguage = (i18nLanguage: string | undefined): Language => {
  const result = languageSchema.safeParse(i18nLanguage);

  if (result.success) {
    return result.data;
  }

  return defaultLanguage;
};
