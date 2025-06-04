import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  createTranslationProvider,
  CreateTranslationProviderProps
} from './server-hooks';
import { getTranslations } from './server';
import { TranslationsProvider } from '@/context/TranslationsContext/TranslationsContext';
import { i18n, TFunction } from 'i18next';
import { Language, TranslationNamespace } from './types';

// Mock the dependencies
jest.mock('./server');
jest.mock('@/context/TranslationsContext/TranslationsContext');

const mockGetTranslations = jest.mocked(getTranslations);
const mockTranslationsProvider = jest.mocked(TranslationsProvider);

// Mock i18n instance for testing
const createMockI18nInstance = (
  resources: Record<string, unknown> = {}
): jest.Mocked<i18n> =>
  ({
    getResourceBundle: jest.fn((locale: string, namespace: string) => {
      return resources[`${locale}:${namespace}`];
    })
  } as unknown as jest.Mocked<i18n>);

describe('server-hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock for TranslationsProvider
    mockTranslationsProvider.mockImplementation(({ children }) => (
      <div data-testid="translations-provider">{children}</div>
    ));

    // Setup console spies to avoid console output during tests
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createTranslationProvider', () => {
    const defaultProps: CreateTranslationProviderProps = {
      children: <div data-testid="test-child">Test Content</div>,
      locale: 'en',
      namespaces: ['common']
    };

    const mockResources = {
      'en:common': {
        welcome: 'Welcome',
        hello: 'Hello'
      }
    };

    beforeEach(() => {
      const mockI18nInstance = createMockI18nInstance(mockResources);
      mockGetTranslations.mockResolvedValue({
        t: jest.fn() as unknown as TFunction,
        i18n: mockI18nInstance
      });
    });

    describe('Basic functionality', () => {
      it('should create a TranslationsProvider with correct props', async () => {
        const Provider = await createTranslationProvider(defaultProps);

        render(Provider);

        // Verify that TranslationsProvider was called with correct props
        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          {
            language: 'en',
            namespaces: ['common'],
            resources: {
              common: mockResources['en:common']
            },
            children: defaultProps.children
          },
          undefined
        );

        // Verify the component renders
        expect(screen.getByTestId('translations-provider')).toBeInTheDocument();
      });

      it('should handle multiple namespaces', async () => {
        const multipleNamespaceResources = {
          'en:common': { welcome: 'Welcome' },
          'en:homePage': { title: 'Home' },
          'en:footer': { copyright: '© 2024' }
        };

        const mockI18nInstance = createMockI18nInstance(
          multipleNamespaceResources
        );
        mockGetTranslations.mockResolvedValue({
          t: jest.fn() as unknown as TFunction,
          i18n: mockI18nInstance
        });

        const props: CreateTranslationProviderProps = {
          ...defaultProps,
          namespaces: ['common', 'homePage', 'footer']
        };

        const Provider = await createTranslationProvider(props);
        render(Provider);

        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          {
            language: 'en',
            namespaces: ['common', 'homePage', 'footer'],
            resources: {
              common: multipleNamespaceResources['en:common'],
              homePage: multipleNamespaceResources['en:homePage'],
              footer: multipleNamespaceResources['en:footer']
            },
            children: defaultProps.children
          },
          undefined
        );
      });

      it('should use default namespace when namespaces not provided', async () => {
        const propsWithoutNamespaces = {
          children: defaultProps.children,
          locale: 'en' as Language
        };

        const Provider = await createTranslationProvider(
          propsWithoutNamespaces
        );
        render(Provider);

        expect(mockGetTranslations).toHaveBeenCalledWith('en', ['common']);
        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          expect.objectContaining({
            namespaces: ['common']
          }),
          undefined
        );
      });

      it('should handle different languages', async () => {
        const ukrainianResources = {
          'uk:common': {
            welcome: 'Ласкаво просимо',
            hello: 'Привіт'
          }
        };

        const mockI18nInstance = createMockI18nInstance(ukrainianResources);
        mockGetTranslations.mockResolvedValue({
          t: jest.fn() as unknown as TFunction,
          i18n: mockI18nInstance
        });

        const ukrainianProps: CreateTranslationProviderProps = {
          ...defaultProps,
          locale: 'uk'
        };

        const Provider = await createTranslationProvider(ukrainianProps);
        render(Provider);

        expect(mockGetTranslations).toHaveBeenCalledWith('uk', ['common']);
        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          {
            language: 'uk',
            namespaces: ['common'],
            resources: {
              common: ukrainianResources['uk:common']
            },
            children: defaultProps.children
          },
          undefined
        );
      });
    });

    describe('Locale fallback handling', () => {
      it('should fallback to default language when locale is null/undefined', async () => {
        const propsWithNullLocale = {
          ...defaultProps,
          locale: null as unknown as Language
        };

        const Provider = await createTranslationProvider(propsWithNullLocale);
        render(Provider);

        expect(mockGetTranslations).toHaveBeenCalledWith('en', ['common']);
        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          expect.objectContaining({
            language: 'en'
          }),
          undefined
        );
      });

      it('should fallback to default language when locale is undefined', async () => {
        const propsWithUndefinedLocale = {
          ...defaultProps,
          locale: undefined as unknown as Language
        };

        const Provider = await createTranslationProvider(
          propsWithUndefinedLocale
        );
        render(Provider);

        expect(mockGetTranslations).toHaveBeenCalledWith('en', ['common']);
        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          expect.objectContaining({
            language: 'en'
          }),
          undefined
        );
      });
    });

    describe('Error handling', () => {
      it('should handle missing resource bundles gracefully', async () => {
        // Create mock i18n instance that returns undefined for getResourceBundle
        const mockI18nInstance = createMockI18nInstance({});
        mockGetTranslations.mockResolvedValue({
          t: jest.fn() as unknown as TFunction,
          i18n: mockI18nInstance
        });

        const Provider = await createTranslationProvider(defaultProps);
        render(Provider);

        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          expect.objectContaining({
            resources: {
              common: {} // Should be empty object when resource not found
            }
          }),
          undefined
        );

        // Verify warning was logged
        expect(console.warn).toHaveBeenCalledWith(
          'Resource bundle for locale "en" and namespace "common" has not been found.'
        );
      });

      it('should handle invalid i18n instance', async () => {
        // Mock with invalid i18n instance
        const invalidI18nInstance = {} as i18n;
        mockGetTranslations.mockResolvedValue({
          t: jest.fn() as unknown as TFunction,
          i18n: invalidI18nInstance
        });

        const Provider = await createTranslationProvider(defaultProps);
        render(Provider);

        expect(console.error).toHaveBeenCalledWith(
          'Invalid i18n instance or missing getResourceBundle method'
        );

        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          expect.objectContaining({
            resources: {
              common: {} // Should be empty object when i18n is invalid
            }
          }),
          undefined
        );
      });

      it('should handle getResourceBundle throwing an error', async () => {
        const mockI18nInstance = {
          getResourceBundle: jest.fn().mockImplementation(() => {
            throw new Error('Resource loading failed');
          })
        } as unknown as jest.Mocked<i18n>;

        mockGetTranslations.mockResolvedValue({
          t: jest.fn() as unknown as TFunction,
          i18n: mockI18nInstance
        });

        const Provider = await createTranslationProvider(defaultProps);
        render(Provider);

        expect(console.error).toHaveBeenCalledWith(
          'Error loading resource bundle for locale "en" and namespace "common":',
          expect.any(Error)
        );

        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          expect.objectContaining({
            resources: {
              common: {} // Should be empty object when error occurs
            }
          }),
          undefined
        );
      });

      it('should handle getTranslations rejection', async () => {
        mockGetTranslations.mockRejectedValue(new Error('Server error'));

        await expect(createTranslationProvider(defaultProps)).rejects.toThrow(
          'Server error'
        );
      });
    });

    describe('Resource loading', () => {
      it('should load resources for all supported languages', async () => {
        const languages: Language[] = ['en', 'uk', 'ru'];

        for (const locale of languages) {
          jest.clearAllMocks();

          const resources = {
            [`${locale}:common`]: {
              welcome: `Welcome in ${locale}`,
              hello: `Hello in ${locale}`
            }
          };

          const mockI18nInstance = createMockI18nInstance(resources);
          mockGetTranslations.mockResolvedValue({
            t: jest.fn() as unknown as TFunction,
            i18n: mockI18nInstance
          });

          const props: CreateTranslationProviderProps = {
            ...defaultProps,
            locale
          };

          const Provider = await createTranslationProvider(props);
          render(Provider);

          expect(mockGetTranslations).toHaveBeenCalledWith(locale, ['common']);
          expect(mockI18nInstance.getResourceBundle).toHaveBeenCalledWith(
            locale,
            'common'
          );
          expect(mockTranslationsProvider).toHaveBeenCalledWith(
            expect.objectContaining({
              language: locale,
              resources: {
                common: resources[`${locale}:common`]
              }
            }),
            undefined
          );
        }
      });

      it('should load resources for all supported namespaces', async () => {
        const namespaces: TranslationNamespace[] = [
          'common',
          'homePage',
          'footer',
          'time',
          'asceticExerciseDuration'
        ];

        const resources: Record<string, unknown> = {};
        namespaces.forEach((ns) => {
          resources[`en:${ns}`] = { [`${ns}_key`]: `${ns} value` };
        });

        const mockI18nInstance = createMockI18nInstance(resources);
        mockGetTranslations.mockResolvedValue({
          t: jest.fn() as unknown as TFunction,
          i18n: mockI18nInstance
        });

        const props: CreateTranslationProviderProps = {
          ...defaultProps,
          namespaces
        };

        const Provider = await createTranslationProvider(props);
        render(Provider);

        // Verify all namespaces were requested
        namespaces.forEach((ns) => {
          expect(mockI18nInstance.getResourceBundle).toHaveBeenCalledWith(
            'en',
            ns
          );
        });

        // Verify all resources were passed to provider
        const expectedResources: Record<string, unknown> = {};
        namespaces.forEach((ns) => {
          expectedResources[ns] = resources[`en:${ns}`];
        });

        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          expect.objectContaining({
            namespaces,
            resources: expectedResources
          }),
          undefined
        );
      });

      it('should handle mixed success and failure resource loading', async () => {
        const mixedResources = {
          'en:common': { welcome: 'Welcome' }
          // homePage resource is missing (will return undefined)
        };

        const mockI18nInstance = createMockI18nInstance(mixedResources);
        mockGetTranslations.mockResolvedValue({
          t: jest.fn() as unknown as TFunction,
          i18n: mockI18nInstance
        });

        const props: CreateTranslationProviderProps = {
          ...defaultProps,
          namespaces: ['common', 'homePage']
        };

        const Provider = await createTranslationProvider(props);
        render(Provider);

        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          expect.objectContaining({
            resources: {
              common: mixedResources['en:common'],
              homePage: {} // Should be empty object for missing resource
            }
          }),
          undefined
        );

        expect(console.warn).toHaveBeenCalledWith(
          'Resource bundle for locale "en" and namespace "homePage" has not been found.'
        );
      });
    });

    describe('Children rendering', () => {
      it('should preserve children components', async () => {
        const complexChildren = (
          <div>
            <h1 data-testid="title">Test Title</h1>
            <p data-testid="content">Test content</p>
            <button data-testid="button">Click me</button>
          </div>
        );

        const props: CreateTranslationProviderProps = {
          ...defaultProps,
          children: complexChildren
        };

        const Provider = await createTranslationProvider(props);
        render(Provider);

        // Verify that children are passed correctly to TranslationsProvider
        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          expect.objectContaining({
            children: complexChildren
          }),
          undefined
        );
      });

      it('should handle React fragments as children', async () => {
        const fragmentChildren = (
          <>
            <div data-testid="first">First element</div>
            <div data-testid="second">Second element</div>
          </>
        );

        const props: CreateTranslationProviderProps = {
          ...defaultProps,
          children: fragmentChildren
        };

        const Provider = await createTranslationProvider(props);
        render(Provider);

        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          expect.objectContaining({
            children: fragmentChildren
          }),
          undefined
        );
      });

      it('should handle null/undefined children', async () => {
        const propsWithNullChildren: CreateTranslationProviderProps = {
          ...defaultProps,
          children: null
        };

        const Provider = await createTranslationProvider(propsWithNullChildren);
        render(Provider);

        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          expect.objectContaining({
            children: null
          }),
          undefined
        );
      });
    });

    describe('Integration scenarios', () => {
      it('should work with real-world props structure', async () => {
        const realWorldResources = {
          'uk:common': {
            welcome: 'Ласкаво просимо',
            navigation: {
              home: 'Головна',
              about: 'Про нас',
              contact: 'Контакти'
            }
          },
          'uk:footer': {
            copyright: '© 2024 Ваш інструмент',
            links: {
              privacy: 'Конфіденційність',
              terms: 'Умови використання'
            }
          }
        };

        const mockI18nInstance = createMockI18nInstance(realWorldResources);
        mockGetTranslations.mockResolvedValue({
          t: jest.fn() as unknown as TFunction,
          i18n: mockI18nInstance
        });

        const realWorldProps: CreateTranslationProviderProps = {
          locale: 'uk',
          namespaces: ['common', 'footer'],
          children: (
            <div>
              <header>Header content</header>
              <main>Main content</main>
              <footer>Footer content</footer>
            </div>
          )
        };

        const Provider = await createTranslationProvider(realWorldProps);
        render(Provider);

        expect(mockGetTranslations).toHaveBeenCalledWith('uk', [
          'common',
          'footer'
        ]);
        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          {
            language: 'uk',
            namespaces: ['common', 'footer'],
            resources: {
              common: realWorldResources['uk:common'],
              footer: realWorldResources['uk:footer']
            },
            children: realWorldProps.children
          },
          undefined
        );
      });

      it('should handle empty namespaces array', async () => {
        const mockI18nInstance = createMockI18nInstance({});
        mockGetTranslations.mockResolvedValue({
          t: jest.fn() as unknown as TFunction,
          i18n: mockI18nInstance
        });

        const propsWithEmptyNamespaces: CreateTranslationProviderProps = {
          ...defaultProps,
          namespaces: []
        };

        const Provider = await createTranslationProvider(
          propsWithEmptyNamespaces
        );
        render(Provider);

        expect(mockGetTranslations).toHaveBeenCalledWith('en', []);
        expect(mockTranslationsProvider).toHaveBeenCalledWith(
          expect.objectContaining({
            namespaces: [],
            resources: {}
          }),
          undefined
        );
      });
    });
  });
});
