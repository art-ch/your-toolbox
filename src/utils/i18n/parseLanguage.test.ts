import { parseLanguage, languageSchema } from './parseLanguage';
import { defaultLanguage, languages } from '@/lib/i18n/settings';

describe('parseLanguage', () => {
  describe('valid languages', () => {
    it('should return English when given "en"', () => {
      const result = parseLanguage('en');
      expect(result).toBe('en');
    });

    it('should return Ukrainian when given "uk"', () => {
      const result = parseLanguage('uk');
      expect(result).toBe('uk');
    });

    it('should return Russian when given "ru"', () => {
      const result = parseLanguage('ru');
      expect(result).toBe('ru');
    });

    it('should parse all valid languages from the languages array', () => {
      languages.forEach((language) => {
        const result = parseLanguage(language);
        expect(result).toBe(language);
        expect(languages).toContain(result);
      });
    });
  });

  describe('invalid languages', () => {
    it('should return default language for invalid language string', () => {
      const result = parseLanguage('invalid');
      expect(result).toBe(defaultLanguage);
    });

    it('should return default language for unsupported language codes', () => {
      const unsupportedLanguages = ['de', 'fr', 'es', 'zh', 'ja'];

      unsupportedLanguages.forEach((lang) => {
        const result = parseLanguage(lang);
        expect(result).toBe(defaultLanguage);
      });
    });

    it('should return default language for empty string', () => {
      const result = parseLanguage('');
      expect(result).toBe(defaultLanguage);
    });

    it('should return default language for undefined input', () => {
      const result = parseLanguage(undefined);
      expect(result).toBe(defaultLanguage);
    });
  });

  describe('edge cases', () => {
    it('should be case sensitive and return default for uppercase languages', () => {
      const result1 = parseLanguage('EN');
      const result2 = parseLanguage('UK');
      const result3 = parseLanguage('RU');

      expect(result1).toBe(defaultLanguage);
      expect(result2).toBe(defaultLanguage);
      expect(result3).toBe(defaultLanguage);
    });

    it('should return default language for mixed case inputs', () => {
      const mixedCaseInputs = ['En', 'Uk', 'Ru', 'eN', 'uK', 'rU'];

      mixedCaseInputs.forEach((input) => {
        const result = parseLanguage(input);
        expect(result).toBe(defaultLanguage);
      });
    });

    it('should return default language for languages with extra characters', () => {
      const invalidInputs = ['en-US', 'uk-UA', 'ru-RU', 'en_US', 'uk_UA'];

      invalidInputs.forEach((input) => {
        const result = parseLanguage(input);
        expect(result).toBe(defaultLanguage);
      });
    });

    it('should return default language for numeric strings', () => {
      const numericInputs = ['1', '123', '0'];

      numericInputs.forEach((input) => {
        const result = parseLanguage(input);
        expect(result).toBe(defaultLanguage);
      });
    });

    it('should return default language for special characters', () => {
      const specialChars = ['!', '@', '#', '$', '%', '^', '&', '*'];

      specialChars.forEach((char) => {
        const result = parseLanguage(char);
        expect(result).toBe(defaultLanguage);
      });
    });

    it('should return default language for whitespace strings', () => {
      const whitespaceInputs = [' ', '  ', '\t', '\n', ' en ', ' uk '];

      whitespaceInputs.forEach((input) => {
        const result = parseLanguage(input);
        expect(result).toBe(defaultLanguage);
      });
    });
  });

  describe('type safety', () => {
    it('should always return a valid Language type', () => {
      const testInputs = [
        'en',
        'uk',
        'ru',
        'invalid',
        '',
        undefined,
        'EN',
        'UK',
        'RU',
        '123',
        null as unknown as string
      ];

      testInputs.forEach((input) => {
        const result = parseLanguage(input);
        expect(typeof result).toBe('string');
        expect(languages).toContain(result);
      });
    });

    it('should return the same type as defaultLanguage', () => {
      const result = parseLanguage('invalid');
      expect(typeof result).toBe(typeof defaultLanguage);
    });
  });

  describe('consistency with settings', () => {
    it('should use the correct default language from settings', () => {
      const result = parseLanguage('invalid');
      expect(result).toBe(defaultLanguage);
      expect(result).toBe('en'); // Verify the default is what we expect
    });

    it('should accept all languages defined in settings', () => {
      languages.forEach((language) => {
        const result = parseLanguage(language);
        expect(result).toBe(language);
      });
    });
  });
});

describe('languageSchema', () => {
  describe('valid parsing', () => {
    it('should successfully parse valid languages', () => {
      languages.forEach((language) => {
        const result = languageSchema.safeParse(language);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data).toBe(language);
        }
      });
    });
  });

  describe('invalid parsing', () => {
    it('should fail to parse invalid languages', () => {
      const invalidInputs = ['invalid', 'de', 'fr', '', 'EN', 'UK', 'RU'];

      invalidInputs.forEach((input) => {
        const result = languageSchema.safeParse(input);
        expect(result.success).toBe(false);
      });
    });

    it('should fail to parse undefined', () => {
      const result = languageSchema.safeParse(undefined);
      expect(result.success).toBe(false);
    });

    it('should fail to parse null', () => {
      const result = languageSchema.safeParse(null);
      expect(result.success).toBe(false);
    });

    it('should fail to parse non-string values', () => {
      const nonStringValues = [123, true, false, {}, []];

      nonStringValues.forEach((value) => {
        const result = languageSchema.safeParse(value);
        expect(result.success).toBe(false);
      });
    });
  });
});
