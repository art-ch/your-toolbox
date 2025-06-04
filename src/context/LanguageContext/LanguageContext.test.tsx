import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { useLanguageInitialization } from './hooks/useLanguageInitialization/useLanguageInitialization';
import { useLanguageLoader } from './hooks/useLanguageLoader/useLanguageLoader';
import { Language } from '@/lib/i18n/types';

// Mock the custom hooks
jest.mock(
  './hooks/useLanguageInitialization/useLanguageInitialization',
  () => ({
    useLanguageInitialization: jest.fn()
  })
);

jest.mock('./hooks/useLanguageLoader/useLanguageLoader', () => ({
  useLanguageLoader: jest.fn()
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  I18nextProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="i18next-provider">{children}</div>
  )
}));

// Mock i18next client
jest.mock('@/lib/i18n/client', () => ({
  __esModule: true,
  default: {}
}));

const useLanguageInitializationMock = useLanguageInitialization as jest.Mock;
const useLanguageLoaderMock = useLanguageLoader as jest.Mock;

// Test component to access the context
function TestComponent() {
  const { isLoading, currentLanguage, changeLanguage } = useLanguage();

  return (
    <div>
      <div data-testid="loading-state">{isLoading ? 'loading' : 'loaded'}</div>
      <div data-testid="current-language">{currentLanguage}</div>
      <button
        data-testid="change-language-btn"
        onClick={() => changeLanguage('uk' as Language)}
      >
        Change Language
      </button>
    </div>
  );
}

describe('LanguageContext', () => {
  const mockChangeLanguage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    useLanguageInitializationMock.mockImplementation(() => ({}));
    useLanguageLoaderMock.mockImplementation(() => ({
      isLoading: false,
      currentLanguage: 'en' as Language,
      changeLanguage: mockChangeLanguage
    }));
  });

  describe('LanguageProvider', () => {
    it('should render children with I18nextProvider wrapper', () => {
      render(
        <LanguageProvider language="en">
          <div data-testid="test-child">Test Child</div>
        </LanguageProvider>
      );

      expect(screen.getByTestId('i18next-provider')).toBeInTheDocument();
      expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });

    it('should call useLanguageInitialization with the provided language', () => {
      render(
        <LanguageProvider language="uk">
          <div>Test</div>
        </LanguageProvider>
      );

      expect(useLanguageInitializationMock).toHaveBeenCalledWith('uk');
    });

    it('should call useLanguageLoader with the provided language', () => {
      render(
        <LanguageProvider language="ru">
          <div>Test</div>
        </LanguageProvider>
      );

      expect(useLanguageLoaderMock).toHaveBeenCalledWith('ru');
    });

    it('should provide context values from useLanguageLoader', () => {
      useLanguageLoaderMock.mockReturnValue({
        isLoading: true,
        currentLanguage: 'uk' as Language,
        changeLanguage: mockChangeLanguage
      });

      render(
        <LanguageProvider language="uk">
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('loading-state')).toHaveTextContent('loading');
      expect(screen.getByTestId('current-language')).toHaveTextContent('uk');
    });

    it('should update context when useLanguageLoader returns different values', async () => {
      const { rerender } = render(
        <LanguageProvider language="en">
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
      expect(screen.getByTestId('current-language')).toHaveTextContent('en');

      // Update the mock to return different values
      useLanguageLoaderMock.mockReturnValue({
        isLoading: true,
        currentLanguage: 'uk' as Language,
        changeLanguage: mockChangeLanguage
      });

      rerender(
        <LanguageProvider language="uk">
          <TestComponent />
        </LanguageProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading-state')).toHaveTextContent(
          'loading'
        );
        expect(screen.getByTestId('current-language')).toHaveTextContent('uk');
      });
    });
  });

  describe('useLanguage hook', () => {
    it('should provide context values when used within LanguageProvider', () => {
      useLanguageLoaderMock.mockReturnValue({
        isLoading: false,
        currentLanguage: 'ru' as Language,
        changeLanguage: mockChangeLanguage
      });

      render(
        <LanguageProvider language="ru">
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
      expect(screen.getByTestId('current-language')).toHaveTextContent('ru');
    });

    it('should call changeLanguage function when invoked', () => {
      render(
        <LanguageProvider language="en">
          <TestComponent />
        </LanguageProvider>
      );

      const changeButton = screen.getByTestId('change-language-btn');
      changeButton.click();

      expect(mockChangeLanguage).toHaveBeenCalledWith('uk');
    });

    it('should throw error when used outside of LanguageProvider', () => {
      // Temporarily mock console.error to avoid error output in tests
      const originalConsoleError = console.error;
      console.error = jest.fn();

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useLanguage must be used within a LanguageProvider');

      console.error = originalConsoleError;
    });

    it('should provide different context values for different language props', () => {
      useLanguageLoaderMock
        .mockReturnValueOnce({
          isLoading: true,
          currentLanguage: 'en' as Language,
          changeLanguage: mockChangeLanguage
        })
        .mockReturnValueOnce({
          isLoading: false,
          currentLanguage: 'uk' as Language,
          changeLanguage: mockChangeLanguage
        });

      const { rerender } = render(
        <LanguageProvider language="en">
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('loading-state')).toHaveTextContent('loading');
      expect(screen.getByTestId('current-language')).toHaveTextContent('en');

      rerender(
        <LanguageProvider language="uk">
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('loading-state')).toHaveTextContent('loaded');
      expect(screen.getByTestId('current-language')).toHaveTextContent('uk');
    });
  });

  describe('Integration with hooks', () => {
    it('should integrate properly with both custom hooks', () => {
      const mockInitialization = { isInitialized: true };
      const mockLoader = {
        isLoading: false,
        currentLanguage: 'uk' as Language,
        changeLanguage: mockChangeLanguage
      };

      useLanguageInitializationMock.mockReturnValue(mockInitialization);
      useLanguageLoaderMock.mockReturnValue(mockLoader);

      render(
        <LanguageProvider language="uk">
          <TestComponent />
        </LanguageProvider>
      );

      expect(useLanguageInitializationMock).toHaveBeenCalledWith('uk');
      expect(useLanguageLoaderMock).toHaveBeenCalledWith('uk');
      expect(screen.getByTestId('current-language')).toHaveTextContent('uk');
    });

    it('should handle loading state correctly', () => {
      useLanguageLoaderMock.mockReturnValue({
        isLoading: true,
        currentLanguage: 'en' as Language,
        changeLanguage: mockChangeLanguage
      });

      render(
        <LanguageProvider language="en">
          <TestComponent />
        </LanguageProvider>
      );

      expect(screen.getByTestId('loading-state')).toHaveTextContent('loading');
    });

    it('should handle multiple language changes', () => {
      render(
        <LanguageProvider language="en">
          <TestComponent />
        </LanguageProvider>
      );

      const changeButton = screen.getByTestId('change-language-btn');

      changeButton.click();
      changeButton.click();
      changeButton.click();

      expect(mockChangeLanguage).toHaveBeenCalledTimes(3);
      expect(mockChangeLanguage).toHaveBeenCalledWith('uk');
    });
  });

  describe('Props validation', () => {
    it('should accept all valid Language types', () => {
      const languages: Language[] = ['en', 'uk', 'ru'];

      languages.forEach((language) => {
        useLanguageLoaderMock.mockReturnValue({
          isLoading: false,
          currentLanguage: language,
          changeLanguage: mockChangeLanguage
        });

        const { unmount } = render(
          <LanguageProvider language={language}>
            <TestComponent />
          </LanguageProvider>
        );

        expect(screen.getByTestId('current-language')).toHaveTextContent(
          language
        );
        unmount();
      });
    });

    it('should render different children components', () => {
      const TestChild1 = () => <div data-testid="child-1">Child 1</div>;
      const TestChild2 = () => <div data-testid="child-2">Child 2</div>;

      const { rerender } = render(
        <LanguageProvider language="en">
          <TestChild1 />
        </LanguageProvider>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();

      rerender(
        <LanguageProvider language="en">
          <TestChild2 />
        </LanguageProvider>
      );

      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.queryByTestId('child-1')).not.toBeInTheDocument();
    });
  });
});
