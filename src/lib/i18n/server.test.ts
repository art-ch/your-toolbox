import { createInstance, i18n, TFunction, BackendModule } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { initI18next, getTranslations } from './server';
import { getI18nOptions, defaultLanguage } from './settings';
import { DefaultLanguage, Language, TranslationNamespace } from './types';

// Mock the dependencies
jest.mock('i18next');
jest.mock('i18next-resources-to-backend');
jest.mock('react-i18next/initReactI18next');
jest.mock('./settings');

const mockCreateInstance = jest.mocked(createInstance);
const mockResourcestoBackend = jest.mocked(resourcesToBackend);
const mockInitReactI18next = jest.mocked(initReactI18next);
const mockGetI18nOptions = jest.mocked(getI18nOptions);

// Create mock i18n instance
const createMockI18nInstance = (): jest.Mocked<i18n> =>
  ({
    use: jest.fn().mockReturnThis(),
    init: jest.fn().mockResolvedValue(undefined),
    getFixedT: jest.fn()
    // Add other necessary properties as jest.fn()
  } as unknown as jest.Mocked<i18n>);

// Create mock translation function
const createMockTFunction = (): jest.Mocked<TFunction> =>
  jest.fn() as unknown as jest.Mocked<TFunction>;

describe('server.ts', () => {
  let mockI18nInstance: jest.Mocked<i18n>;
  let mockTFunction: jest.Mocked<TFunction>;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();

    mockI18nInstance = createMockI18nInstance();
    mockTFunction = createMockTFunction();

    mockCreateInstance.mockReturnValue(mockI18nInstance);
    mockI18nInstance.getFixedT.mockReturnValue(mockTFunction);

    mockGetI18nOptions.mockReturnValue({
      supportedLngs: ['en', 'uk', 'ru'],
      fallbackLng: 'en',
      lng: 'en',
      fallbackNS: 'common',
      defaultNS: 'common',
      ns: 'common',
      interpolation: {
        escapeValue: false
      }
    });

    // Mock console.error to prevent error output in tests
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('initI18next', () => {
    it('should initialize i18next instance with single namespace', async () => {
      const language: Language = 'en';
      const namespace: TranslationNamespace = 'common';

      const result = await initI18next(language, namespace);

      expect(mockCreateInstance).toHaveBeenCalledTimes(1);
      expect(mockI18nInstance.use).toHaveBeenCalledWith(mockInitReactI18next);
      expect(mockI18nInstance.use).toHaveBeenCalledWith({
        init: expect.any(Function),
        type: '3rdParty'
      });
      expect(mockGetI18nOptions).toHaveBeenCalledWith(language, namespace);
      expect(mockI18nInstance.init).toHaveBeenCalledWith(
        expect.objectContaining({
          supportedLngs: ['en', 'uk', 'ru'],
          fallbackLng: 'en',
          lng: 'en'
        })
      );
      expect(result).toBe(mockI18nInstance);
    });

    it('should initialize i18next instance with multiple namespaces', async () => {
      const language: Language = 'uk';
      const namespaces: TranslationNamespace[] = [
        'common',
        'homePage',
        'footer'
      ];

      const result = await initI18next(language, namespaces);

      expect(mockCreateInstance).toHaveBeenCalledTimes(1);
      expect(mockGetI18nOptions).toHaveBeenCalledWith(language, namespaces);
      expect(result).toBe(mockI18nInstance);
    });

    it('should initialize i18next instance with different languages', async () => {
      const testCases: Language[] = ['en', 'uk', 'ru'];

      for (const language of testCases) {
        jest.clearAllMocks();
        mockCreateInstance.mockReturnValue(mockI18nInstance);

        await initI18next(language, 'common');

        expect(mockGetI18nOptions).toHaveBeenCalledWith(language, 'common');
      }
    });

    it('should configure resourcesToBackend correctly', async () => {
      const mockResourcesLoader = jest.fn() as unknown as BackendModule;
      mockResourcestoBackend.mockReturnValue(mockResourcesLoader);

      await initI18next('en', 'common');

      expect(mockResourcestoBackend).toHaveBeenCalledWith(expect.any(Function));
      expect(mockI18nInstance.use).toHaveBeenCalledWith(mockResourcesLoader);
    });
  });

  describe('getTranslations', () => {
    it('should return translations successfully with single namespace', async () => {
      const language: Language = 'en';
      const namespace: TranslationNamespace = 'common';

      const result = await getTranslations(language, namespace);

      expect(result).toEqual({
        t: mockTFunction,
        i18n: mockI18nInstance
      });
      expect(mockI18nInstance.getFixedT).toHaveBeenCalledWith(
        language,
        namespace
      );
    });

    it('should return translations successfully with multiple namespaces', async () => {
      const language: Language = 'uk';
      const namespaces: TranslationNamespace[] = ['common', 'homePage'];

      const result = await getTranslations(language, namespaces);

      expect(result).toEqual({
        t: mockTFunction,
        i18n: mockI18nInstance
      });
      expect(mockI18nInstance.getFixedT).toHaveBeenCalledWith(
        language,
        namespaces[0]
      );
    });

    it('should use first namespace when multiple namespaces provided', async () => {
      const language: Language = 'ru';
      const namespaces: TranslationNamespace[] = ['homePage', 'footer', 'time'];

      await getTranslations(language, namespaces);

      expect(mockI18nInstance.getFixedT).toHaveBeenCalledWith(
        language,
        'homePage'
      );
    });

    it('should handle all supported languages', async () => {
      const languages: Language[] = ['en', 'uk', 'ru'];

      for (const language of languages) {
        jest.clearAllMocks();
        mockCreateInstance.mockReturnValue(mockI18nInstance);
        mockI18nInstance.getFixedT.mockReturnValue(mockTFunction);

        const result = await getTranslations(language, 'common');

        expect(result.t).toBe(mockTFunction);
        expect(result.i18n).toBe(mockI18nInstance);
      }
    });

    it('should handle all supported namespaces', async () => {
      const namespaces: TranslationNamespace[] = [
        'common',
        'homePage',
        'footer',
        'time',
        'asceticExerciseDuration'
      ];

      for (const namespace of namespaces) {
        jest.clearAllMocks();
        mockCreateInstance.mockReturnValue(mockI18nInstance);
        mockI18nInstance.getFixedT.mockReturnValue(mockTFunction);

        const result = await getTranslations('en', namespace);

        expect(result.t).toBe(mockTFunction);
        expect(mockI18nInstance.getFixedT).toHaveBeenCalledWith(
          'en',
          namespace
        );
      }
    });

    describe('Error handling', () => {
      it('should handle initI18next initialization error', async () => {
        const initError = new Error('Initialization failed');
        mockI18nInstance.init.mockRejectedValue(initError);

        const fallbackI18nInstance = createMockI18nInstance();
        const fallbackTFunction = createMockTFunction();

        mockCreateInstance
          .mockReturnValueOnce(mockI18nInstance) // First call for initI18next (fails)
          .mockReturnValueOnce(fallbackI18nInstance); // Second call for fallback

        fallbackI18nInstance.getFixedT.mockReturnValue(fallbackTFunction);

        const result = await getTranslations('en', 'common');

        expect(consoleSpy).toHaveBeenCalledWith(
          'Error getting translations:',
          initError
        );
        expect(fallbackI18nInstance.init).toHaveBeenCalledWith({
          lng: 'en',
          fallbackLng: defaultLanguage,
          resources: {}
        });
        expect(result).toEqual({
          t: fallbackTFunction,
          i18n: fallbackI18nInstance
        });
      });

      it('should handle getFixedT error', async () => {
        const getFixedTError = new Error('GetFixedT failed');
        mockI18nInstance.getFixedT.mockImplementation(() => {
          throw getFixedTError;
        });

        const fallbackI18nInstance = createMockI18nInstance();
        const fallbackTFunction = createMockTFunction();

        mockCreateInstance
          .mockReturnValueOnce(mockI18nInstance) // First call for initI18next (succeeds)
          .mockReturnValueOnce(fallbackI18nInstance); // Second call for fallback

        fallbackI18nInstance.getFixedT.mockReturnValue(fallbackTFunction);

        const result = await getTranslations('en', 'common');

        expect(consoleSpy).toHaveBeenCalledWith(
          'Error getting translations:',
          getFixedTError
        );
        expect(result).toEqual({
          t: fallbackTFunction,
          i18n: fallbackI18nInstance
        });
      });

      it('should handle resource loading error', async () => {
        // Mock a resource loading error during initialization
        const resourceError = new Error('Resource loading failed');
        mockI18nInstance.init.mockRejectedValue(resourceError);

        const fallbackI18nInstance = createMockI18nInstance();
        const fallbackTFunction = createMockTFunction();

        mockCreateInstance
          .mockReturnValueOnce(mockI18nInstance)
          .mockReturnValueOnce(fallbackI18nInstance);

        fallbackI18nInstance.getFixedT.mockReturnValue(fallbackTFunction);

        const result = await getTranslations('uk', ['homePage', 'footer']);

        expect(consoleSpy).toHaveBeenCalledWith(
          'Error getting translations:',
          resourceError
        );
        expect(fallbackI18nInstance.init).toHaveBeenCalledWith({
          lng: 'uk',
          fallbackLng: defaultLanguage,
          resources: {}
        });
        expect(fallbackI18nInstance.getFixedT).toHaveBeenCalledWith('uk');
        expect(result.t).toBe(fallbackTFunction);
      });

      it('should use defaultLanguage in fallback initialization', async () => {
        mockI18nInstance.init.mockRejectedValue(new Error('Test error'));

        const fallbackI18nInstance = createMockI18nInstance();
        mockCreateInstance
          .mockReturnValueOnce(mockI18nInstance)
          .mockReturnValueOnce(fallbackI18nInstance);

        await getTranslations('ru', 'time');

        expect(fallbackI18nInstance.init).toHaveBeenCalledWith({
          lng: 'ru',
          fallbackLng: defaultLanguage,
          resources: {}
        });
      });

      it('should handle generic errors during translation retrieval', async () => {
        const genericError = new TypeError('Unexpected error');
        mockCreateInstance.mockImplementation(() => {
          throw genericError;
        });

        const fallbackI18nInstance = createMockI18nInstance();
        const fallbackTFunction = createMockTFunction();

        mockCreateInstance
          .mockImplementationOnce(() => {
            throw genericError;
          })
          .mockReturnValueOnce(fallbackI18nInstance);

        fallbackI18nInstance.getFixedT.mockReturnValue(fallbackTFunction);

        const result = await getTranslations('en', 'asceticExerciseDuration');

        expect(consoleSpy).toHaveBeenCalledWith(
          'Error getting translations:',
          genericError
        );
        expect(result.t).toBe(fallbackTFunction);
        expect(result.i18n).toBe(fallbackI18nInstance);
      });
    });

    describe('Integration with settings', () => {
      it('should use correct i18n options from settings', async () => {
        const customOptions = {
          supportedLngs: ['en', 'uk', 'ru'] as Language[],
          fallbackLng: 'en' as DefaultLanguage,
          lng: 'uk' as Language,
          fallbackNS: 'common' as TranslationNamespace,
          defaultNS: 'common' as TranslationNamespace,
          ns: ['homePage', 'footer'] as TranslationNamespace[],
          interpolation: { escapeValue: false }
        };

        mockGetI18nOptions.mockReturnValue(customOptions);

        await getTranslations('uk', ['homePage', 'footer']);

        expect(mockGetI18nOptions).toHaveBeenCalledWith('uk', [
          'homePage',
          'footer'
        ]);
        expect(mockI18nInstance.init).toHaveBeenCalledWith(customOptions);
      });

      it('should work with defaultLanguage from settings', async () => {
        // Mock the defaultLanguage import
        const mockSettings = require('./settings');
        mockSettings.defaultLanguage = 'en';

        const error = new Error('Test error');
        mockI18nInstance.init.mockRejectedValue(error);

        const fallbackI18nInstance = createMockI18nInstance();
        mockCreateInstance
          .mockReturnValueOnce(mockI18nInstance)
          .mockReturnValueOnce(fallbackI18nInstance);

        await getTranslations('ru', 'common');

        expect(fallbackI18nInstance.init).toHaveBeenCalledWith({
          lng: 'ru',
          fallbackLng: 'en', // Should use the mocked defaultLanguage
          resources: {}
        });
      });
    });
  });

  describe('Integration tests', () => {
    it('should work end-to-end with realistic scenario', async () => {
      // Setup realistic mocks
      mockGetI18nOptions.mockReturnValue({
        supportedLngs: ['en', 'uk', 'ru'],
        fallbackLng: 'en',
        lng: 'uk',
        fallbackNS: 'common',
        defaultNS: 'common',
        ns: 'homePage',
        interpolation: { escapeValue: false }
      });

      const mockT = jest.fn((key: string) => `translated_${key}`);
      mockI18nInstance.getFixedT.mockReturnValue(mockT as unknown as TFunction);

      const result = await getTranslations('uk', 'homePage');

      expect(result.t).toBe(mockT);
      expect(result.i18n).toBe(mockI18nInstance);

      // Test that the translation function works
      const translation = result.t('title');
      expect(translation).toBe('translated_title');
    });

    it('should handle complex namespace combinations', async () => {
      const complexNamespaces: TranslationNamespace[] = [
        'common',
        'homePage',
        'footer',
        'time',
        'asceticExerciseDuration'
      ];

      await getTranslations('en', complexNamespaces);

      expect(mockGetI18nOptions).toHaveBeenCalledWith('en', complexNamespaces);
      expect(mockI18nInstance.getFixedT).toHaveBeenCalledWith('en', 'common');
    });
  });
});
