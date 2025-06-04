import {
  applyGrammarCase,
  GrammarCase,
  GrammarCaseConfig
} from './applyGrammarCase';
import { Language } from '@/lib/i18n/types';

describe('applyGrammarCase', () => {
  const testTranslationKey = 'test.key';
  const testLanguage: Language = 'en';

  describe('default behavior', () => {
    it('should return the original key when no case config is provided', () => {
      const result = applyGrammarCase(testTranslationKey, testLanguage);
      expect(result).toBe(testTranslationKey);
    });

    it('should return the original key when empty config is provided', () => {
      const caseConfig: GrammarCaseConfig = {};
      const result = applyGrammarCase(
        testTranslationKey,
        testLanguage,
        caseConfig
      );
      expect(result).toBe(testTranslationKey);
    });

    it('should return the original key when default case is explicitly configured', () => {
      const caseConfig: GrammarCaseConfig = {
        en: 'default'
      };
      const result = applyGrammarCase(
        testTranslationKey,
        testLanguage,
        caseConfig
      );
      expect(result).toBe(testTranslationKey);
    });

    it('should return the original key when language is not in config', () => {
      const caseConfig: GrammarCaseConfig = {
        uk: 'genitive'
      };
      const result = applyGrammarCase(
        testTranslationKey,
        testLanguage,
        caseConfig
      );
      expect(result).toBe(testTranslationKey);
    });
  });

  describe('genitive case', () => {
    it('should append _genitive for genitive case', () => {
      const caseConfig: GrammarCaseConfig = {
        en: 'genitive'
      };
      const result = applyGrammarCase(
        testTranslationKey,
        testLanguage,
        caseConfig
      );
      expect(result).toBe(`${testTranslationKey}_genitive`);
    });

    it('should apply genitive case for Ukrainian', () => {
      const caseConfig: GrammarCaseConfig = {
        uk: 'genitive'
      };
      const result = applyGrammarCase(testTranslationKey, 'uk', caseConfig);
      expect(result).toBe(`${testTranslationKey}_genitive`);
    });

    it('should apply genitive case for Russian', () => {
      const caseConfig: GrammarCaseConfig = {
        ru: 'genitive'
      };
      const result = applyGrammarCase(testTranslationKey, 'ru', caseConfig);
      expect(result).toBe(`${testTranslationKey}_genitive`);
    });
  });

  describe('accusative case', () => {
    it('should append _accusative for accusative case', () => {
      const caseConfig: GrammarCaseConfig = {
        en: 'accusative'
      };
      const result = applyGrammarCase(
        testTranslationKey,
        testLanguage,
        caseConfig
      );
      expect(result).toBe(`${testTranslationKey}_accusative`);
    });

    it('should apply accusative case for Ukrainian', () => {
      const caseConfig: GrammarCaseConfig = {
        uk: 'accusative'
      };
      const result = applyGrammarCase(testTranslationKey, 'uk', caseConfig);
      expect(result).toBe(`${testTranslationKey}_accusative`);
    });

    it('should apply accusative case for Russian', () => {
      const caseConfig: GrammarCaseConfig = {
        ru: 'accusative'
      };
      const result = applyGrammarCase(testTranslationKey, 'ru', caseConfig);
      expect(result).toBe(`${testTranslationKey}_accusative`);
    });
  });

  describe('multiple languages configuration', () => {
    it('should apply different cases for different languages', () => {
      const caseConfig: GrammarCaseConfig = {
        en: 'accusative',
        uk: 'genitive',
        ru: 'default'
      };

      expect(applyGrammarCase(testTranslationKey, 'en', caseConfig)).toBe(
        `${testTranslationKey}_accusative`
      );
      expect(applyGrammarCase(testTranslationKey, 'uk', caseConfig)).toBe(
        `${testTranslationKey}_genitive`
      );
      expect(applyGrammarCase(testTranslationKey, 'ru', caseConfig)).toBe(
        testTranslationKey
      );
    });
  });

  describe('edge cases', () => {
    it('should work with empty translation key', () => {
      const caseConfig: GrammarCaseConfig = {
        en: 'genitive'
      };
      const result = applyGrammarCase('', testLanguage, caseConfig);
      expect(result).toBe('_genitive');
    });

    it('should work with complex translation keys', () => {
      const complexKey = 'namespace:section.subsection.key';
      const caseConfig: GrammarCaseConfig = {
        en: 'accusative'
      };
      const result = applyGrammarCase(complexKey, testLanguage, caseConfig);
      expect(result).toBe(`${complexKey}_accusative`);
    });

    it('should handle keys with existing underscores', () => {
      const keyWithUnderscore = 'test_key_with_underscores';
      const caseConfig: GrammarCaseConfig = {
        en: 'genitive'
      };
      const result = applyGrammarCase(
        keyWithUnderscore,
        testLanguage,
        caseConfig
      );
      expect(result).toBe(`${keyWithUnderscore}_genitive`);
    });
  });

  describe('type safety', () => {
    it('should work with all valid grammar cases', () => {
      const cases: GrammarCase[] = ['default', 'genitive', 'accusative'];

      cases.forEach((grammarCase) => {
        const caseConfig: GrammarCaseConfig = {
          en: grammarCase
        };
        const result = applyGrammarCase(
          testTranslationKey,
          testLanguage,
          caseConfig
        );

        if (grammarCase === 'default') {
          expect(result).toBe(testTranslationKey);
        } else {
          expect(result).toBe(`${testTranslationKey}_${grammarCase}`);
        }
      });
    });

    it('should work with all valid languages', () => {
      const languages: Language[] = ['en', 'uk', 'ru'];
      const caseConfig: GrammarCaseConfig = {
        en: 'genitive',
        uk: 'accusative',
        ru: 'default'
      };

      languages.forEach((language) => {
        const result = applyGrammarCase(
          testTranslationKey,
          language,
          caseConfig
        );
        expect(typeof result).toBe('string');
      });
    });
  });
});
