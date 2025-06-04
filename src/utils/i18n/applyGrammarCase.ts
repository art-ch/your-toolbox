import { Language } from '@/lib/i18n/types';

export type GrammarCase = 'genitive' | 'accusative' | 'default';

export type GrammarCaseConfig = Partial<Record<Language, GrammarCase>>;

/**
 * Applies the appropriate grammar case to a translation key based on language configuration
 */
export function applyGrammarCase(
  translationKey: string,
  language: Language,
  caseConfig?: GrammarCaseConfig
): string {
  const grammarCase = caseConfig?.[language] || 'default';

  if (grammarCase === 'default') {
    return translationKey;
  }

  return `${translationKey}_${grammarCase}`;
}
