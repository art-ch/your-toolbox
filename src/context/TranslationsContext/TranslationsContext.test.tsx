import React from 'react';
import { render, screen } from '@testing-library/react';
import { TranslationsProvider } from './TranslationsContext';
import { Language } from '@/lib/i18n/types';

import i18next from '@/lib/i18n/client';

jest.mock('@/lib/i18n/client', () => ({
  addResourceBundle: jest.fn(),
  changeLanguage: jest.fn()
}));

const mockAddResourceBundle = jest.spyOn(i18next, 'addResourceBundle');
const mockChangeLanguage = jest.spyOn(i18next, 'changeLanguage');

describe('TranslationsProvider', () => {
  const defaultProps = {
    language: 'en' as Language,
    namespaces: ['common', 'homePage'],
    resources: {
      common: {
        welcome: 'Welcome',
        hello: 'Hello'
      },
      homePage: {
        title: 'Home Page',
        description: 'This is the home page'
      }
    },
    children: <div data-testid="child-component">Test Child</div>
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render children correctly', () => {
      render(<TranslationsProvider {...defaultProps} />);

      expect(screen.getByTestId('child-component')).toBeInTheDocument();
      expect(screen.getByText('Test Child')).toBeInTheDocument();
    });

    it('should render with different children', () => {
      const customChildren = (
        <div>
          <span data-testid="custom-child">Custom Content</span>
          <p>Additional content</p>
        </div>
      );

      render(
        <TranslationsProvider {...defaultProps}>
          {customChildren}
        </TranslationsProvider>
      );

      expect(screen.getByTestId('custom-child')).toBeInTheDocument();
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
      expect(screen.getByText('Additional content')).toBeInTheDocument();
    });
  });

  describe('i18next Integration', () => {
    it('should add resource bundles for all namespaces', () => {
      render(<TranslationsProvider {...defaultProps} />);

      expect(mockAddResourceBundle).toHaveBeenCalledTimes(2);
      expect(mockAddResourceBundle).toHaveBeenCalledWith(
        'en',
        'common',
        defaultProps.resources.common
      );
      expect(mockAddResourceBundle).toHaveBeenCalledWith(
        'en',
        'homePage',
        defaultProps.resources.homePage
      );
    });

    it('should change language to the provided language', () => {
      render(<TranslationsProvider {...defaultProps} />);

      expect(mockChangeLanguage).toHaveBeenCalledTimes(1);
      expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    });

    it('should handle different languages', () => {
      const ukrainianProps = {
        ...defaultProps,
        language: 'uk' as Language,
        resources: {
          common: {
            welcome: 'Ласкаво просимо',
            hello: 'Привіт'
          },
          homePage: {
            title: 'Головна сторінка',
            description: 'Це головна сторінка'
          }
        }
      };

      render(<TranslationsProvider {...ukrainianProps} />);

      expect(mockAddResourceBundle).toHaveBeenCalledWith(
        'uk',
        'common',
        ukrainianProps.resources.common
      );
      expect(mockAddResourceBundle).toHaveBeenCalledWith(
        'uk',
        'homePage',
        ukrainianProps.resources.homePage
      );
      expect(mockChangeLanguage).toHaveBeenCalledWith('uk');
    });

    it('should handle single namespace', () => {
      const singleNamespaceProps = {
        ...defaultProps,
        namespaces: ['common'],
        resources: {
          common: defaultProps.resources.common
        }
      };

      render(<TranslationsProvider {...singleNamespaceProps} />);

      expect(mockAddResourceBundle).toHaveBeenCalledTimes(1);
      expect(mockAddResourceBundle).toHaveBeenCalledWith(
        'en',
        'common',
        singleNamespaceProps.resources.common
      );
    });

    it('should handle multiple namespaces', () => {
      const multipleNamespaceProps = {
        ...defaultProps,
        namespaces: ['common', 'homePage', 'footer', 'time'],
        resources: {
          ...defaultProps.resources,
          footer: {
            copyright: '© 2024 Your Toolbox'
          },
          time: {
            minutes: 'minutes',
            hours: 'hours'
          }
        }
      };

      render(<TranslationsProvider {...multipleNamespaceProps} />);

      expect(mockAddResourceBundle).toHaveBeenCalledTimes(4);
      expect(mockAddResourceBundle).toHaveBeenCalledWith(
        'en',
        'footer',
        multipleNamespaceProps.resources.footer
      );
      expect(mockAddResourceBundle).toHaveBeenCalledWith(
        'en',
        'time',
        multipleNamespaceProps.resources.time
      );
    });

    it('should handle empty namespaces array', () => {
      const emptyNamespacesProps = {
        ...defaultProps,
        namespaces: [],
        resources: {}
      };

      render(<TranslationsProvider {...emptyNamespacesProps} />);

      expect(mockAddResourceBundle).not.toHaveBeenCalled();
      expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    });
  });

  describe('Effect Dependencies', () => {
    it('should re-run effect when language changes', () => {
      const { rerender } = render(<TranslationsProvider {...defaultProps} />);

      expect(mockChangeLanguage).toHaveBeenCalledWith('en');
      expect(mockAddResourceBundle).toHaveBeenCalledTimes(2);

      jest.clearAllMocks();

      // Change language
      rerender(<TranslationsProvider {...defaultProps} language="uk" />);

      expect(mockChangeLanguage).toHaveBeenCalledWith('uk');
      expect(mockAddResourceBundle).toHaveBeenCalledTimes(2);
      expect(mockAddResourceBundle).toHaveBeenCalledWith(
        'uk',
        'common',
        defaultProps.resources.common
      );
    });

    it('should re-run effect when namespaces change', () => {
      const { rerender } = render(<TranslationsProvider {...defaultProps} />);

      expect(mockAddResourceBundle).toHaveBeenCalledTimes(2);

      jest.clearAllMocks();

      // Change namespaces
      const newNamespaces = ['common', 'footer'];
      const newResources = {
        common: defaultProps.resources.common,
        footer: { copyright: '© 2024' }
      };

      rerender(
        <TranslationsProvider
          {...defaultProps}
          namespaces={newNamespaces}
          resources={newResources}
        />
      );

      expect(mockAddResourceBundle).toHaveBeenCalledTimes(2);
      expect(mockAddResourceBundle).toHaveBeenCalledWith(
        'en',
        'footer',
        newResources.footer
      );
    });

    it('should re-run effect when resources change', () => {
      const { rerender } = render(<TranslationsProvider {...defaultProps} />);

      expect(mockAddResourceBundle).toHaveBeenCalledTimes(2);

      jest.clearAllMocks();

      // Change resources
      const newResources = {
        common: {
          welcome: 'Welcome Updated',
          hello: 'Hello Updated'
        },
        homePage: defaultProps.resources.homePage
      };

      rerender(
        <TranslationsProvider {...defaultProps} resources={newResources} />
      );

      expect(mockAddResourceBundle).toHaveBeenCalledTimes(2);
      expect(mockAddResourceBundle).toHaveBeenCalledWith(
        'en',
        'common',
        newResources.common
      );
    });

    it('should not re-run effect when only children change', () => {
      const { rerender } = render(<TranslationsProvider {...defaultProps} />);

      expect(mockAddResourceBundle).toHaveBeenCalledTimes(2);
      expect(mockChangeLanguage).toHaveBeenCalledTimes(1);

      jest.clearAllMocks();

      // Change only children
      rerender(
        <TranslationsProvider {...defaultProps}>
          <div>Different child</div>
        </TranslationsProvider>
      );

      expect(mockAddResourceBundle).not.toHaveBeenCalled();
      expect(mockChangeLanguage).not.toHaveBeenCalled();
    });
  });

  describe('Props Validation', () => {
    it('should work with all supported languages', () => {
      const languages: Language[] = ['en', 'uk', 'ru'];

      languages.forEach((language) => {
        jest.clearAllMocks();

        render(<TranslationsProvider {...defaultProps} language={language} />);

        expect(mockChangeLanguage).toHaveBeenCalledWith(language);
        expect(mockAddResourceBundle).toHaveBeenCalledWith(
          language,
          'common',
          defaultProps.resources.common
        );
      });
    });

    it('should handle complex resource structures', () => {
      const complexResources = {
        common: {
          nested: {
            deeply: {
              value: 'Deep value'
            }
          },
          array: ['item1', 'item2'],
          number: 42,
          boolean: true
        }
      };

      render(
        <TranslationsProvider
          {...defaultProps}
          namespaces={['common']}
          resources={complexResources}
        />
      );

      expect(mockAddResourceBundle).toHaveBeenCalledWith(
        'en',
        'common',
        complexResources.common
      );
    });
  });
});
