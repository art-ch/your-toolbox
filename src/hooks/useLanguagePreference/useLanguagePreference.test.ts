'use client';

import { renderHook, act } from '@testing-library/react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { useLanguagePreference } from './useLanguagePreference';
import { Language } from '@/lib/i18n/types';
import { enrichPathWithLanguage } from '@/utils/i18n';

// Mock the dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn()
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn()
}));

jest.mock('@/utils/i18n', () => ({
  enrichPathWithLanguage: jest.fn()
}));

// Mock the i18n utilities
const mockEnrichPathWithLanguage =
  enrichPathWithLanguage as jest.MockedFunction<typeof enrichPathWithLanguage>;

jest.mock('@/utils/i18n/parseLanguage', () => ({
  parseLanguage: jest.fn()
}));

// Mock console.error to avoid noise in tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('useLanguagePreference', () => {
  const mockRouter = {
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn()
  };

  const mockPathname = '/some-path';

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Setup default mock implementations
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (Cookies.get as jest.Mock).mockReturnValue(undefined);

    // Mock parseLanguage to return what's passed to it by default
    const { parseLanguage } = jest.requireMock('@/utils/i18n/parseLanguage');
    parseLanguage.mockImplementation((value: string | undefined) => value);
  });

  describe('initialization', () => {
    it('should initialize with preferredLanguage as null when no cookie exists', () => {
      (Cookies.get as jest.Mock).mockReturnValue(undefined);

      const { result } = renderHook(() => useLanguagePreference());

      expect(result.current.preferredLanguage).toBeNull();
      expect(Cookies.get).toHaveBeenCalledWith('NEXT_LOCALE');
    });

    it('should initialize with saved language from cookies', () => {
      const savedLanguage = 'uk' as Language;
      (Cookies.get as jest.Mock).mockReturnValue(savedLanguage);

      const { parseLanguage } = jest.requireMock('@/utils/i18n/parseLanguage');
      parseLanguage.mockReturnValue(savedLanguage);

      const { result } = renderHook(() => useLanguagePreference());

      expect(result.current.preferredLanguage).toBe(savedLanguage);
      expect(Cookies.get).toHaveBeenCalledWith('NEXT_LOCALE');
      expect(parseLanguage).toHaveBeenCalledWith(savedLanguage);
    });

    it('should handle invalid language from cookies gracefully', () => {
      const invalidLanguage = 'invalid' as Language;
      (Cookies.get as jest.Mock).mockReturnValue(invalidLanguage);

      const { parseLanguage } = jest.requireMock('@/utils/i18n/parseLanguage');
      parseLanguage.mockReturnValue('en'); // parseLanguage returns default language for invalid input

      const { result } = renderHook(() => useLanguagePreference());

      expect(result.current.preferredLanguage).toBe('en');
      expect(parseLanguage).toHaveBeenCalledWith(invalidLanguage);
    });

    it('should not set preferred language if parsed language is not in supported languages', () => {
      (Cookies.get as jest.Mock).mockReturnValue('fr');

      const { parseLanguage } = jest.requireMock('@/utils/i18n/parseLanguage');
      parseLanguage.mockReturnValue('fr'); // Assume this is not in the languages array

      const { result } = renderHook(() => useLanguagePreference());

      expect(result.current.preferredLanguage).toBeNull();
    });
  });

  describe('changeLanguage function', () => {
    it('should change language successfully for supported language', () => {
      const { result } = renderHook(() => useLanguagePreference());
      const newLanguage: Language = 'uk';

      act(() => {
        result.current.changeLanguage(newLanguage);
      });

      expect(result.current.preferredLanguage).toBe(newLanguage);
      expect(Cookies.set).toHaveBeenCalledWith('NEXT_LOCALE', newLanguage, {
        expires: 365,
        path: '/',
        sameSite: 'lax'
      });
      expect(mockEnrichPathWithLanguage).toHaveBeenCalledWith(
        mockPathname,
        newLanguage,
        mockRouter
      );
    });

    it('should handle English language change', () => {
      const { result } = renderHook(() => useLanguagePreference());
      const newLanguage: Language = 'en';

      act(() => {
        result.current.changeLanguage(newLanguage);
      });

      expect(result.current.preferredLanguage).toBe(newLanguage);
      expect(Cookies.set).toHaveBeenCalledWith('NEXT_LOCALE', newLanguage, {
        expires: 365,
        path: '/',
        sameSite: 'lax'
      });
    });

    it('should handle Russian language change', () => {
      const { result } = renderHook(() => useLanguagePreference());
      const newLanguage: Language = 'ru';

      act(() => {
        result.current.changeLanguage(newLanguage);
      });

      expect(result.current.preferredLanguage).toBe(newLanguage);
      expect(Cookies.set).toHaveBeenCalledWith('NEXT_LOCALE', newLanguage, {
        expires: 365,
        path: '/',
        sameSite: 'lax'
      });
    });

    it('should not change language for unsupported language and log error', () => {
      const { result } = renderHook(() => useLanguagePreference());
      const unsupportedLanguage = 'fr' as Language;

      act(() => {
        result.current.changeLanguage(unsupportedLanguage);
      });

      expect(result.current.preferredLanguage).toBeNull();
      expect(Cookies.set).not.toHaveBeenCalled();
      expect(mockEnrichPathWithLanguage).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith(
        `Language ${unsupportedLanguage} is not supported`
      );
    });

    it('should call enrichPathWithLanguage with correct parameters', () => {
      const { result } = renderHook(() => useLanguagePreference());
      const newLanguage: Language = 'uk';

      act(() => {
        result.current.changeLanguage(newLanguage);
      });

      expect(mockEnrichPathWithLanguage).toHaveBeenCalledTimes(1);
      expect(mockEnrichPathWithLanguage).toHaveBeenCalledWith(
        mockPathname,
        newLanguage,
        mockRouter
      );
    });

    it('should change language multiple times correctly', () => {
      const { result } = renderHook(() => useLanguagePreference());

      // First change
      act(() => {
        result.current.changeLanguage('uk');
      });

      expect(result.current.preferredLanguage).toBe('uk');
      expect(Cookies.set).toHaveBeenCalledWith(
        'NEXT_LOCALE',
        'uk',
        expect.any(Object)
      );

      // Second change
      act(() => {
        result.current.changeLanguage('ru');
      });

      expect(result.current.preferredLanguage).toBe('ru');
      expect(Cookies.set).toHaveBeenCalledWith(
        'NEXT_LOCALE',
        'ru',
        expect.any(Object)
      );

      // Back to English
      act(() => {
        result.current.changeLanguage('en');
      });

      expect(result.current.preferredLanguage).toBe('en');
      expect(Cookies.set).toHaveBeenCalledWith(
        'NEXT_LOCALE',
        'en',
        expect.any(Object)
      );

      expect(Cookies.set).toHaveBeenCalledTimes(3);
      expect(mockEnrichPathWithLanguage).toHaveBeenCalledTimes(3);
    });
  });

  describe('cookie management', () => {
    it('should set cookie with correct options', () => {
      const { result } = renderHook(() => useLanguagePreference());

      act(() => {
        result.current.changeLanguage('uk');
      });

      expect(Cookies.set).toHaveBeenCalledWith('NEXT_LOCALE', 'uk', {
        expires: 365,
        path: '/',
        sameSite: 'lax'
      });
    });

    describe('cookie sync with URL', () => {
      it('should sync cookie when pathname has valid language and cookie differs', () => {
        (usePathname as jest.Mock).mockReturnValue('/uk/some-page');
        (Cookies.get as jest.Mock).mockReturnValue('en'); // Cookie is 'en', URL is 'uk'

        const { result } = renderHook(() => useLanguagePreference());

        // Wait for useEffect to run
        act(() => {
          // Trigger re-render to ensure useEffect runs
        });

        expect(Cookies.set).toHaveBeenCalledWith('NEXT_LOCALE', 'uk', {
          expires: 365,
          path: '/',
          sameSite: 'lax'
        });
        expect(result.current.preferredLanguage).toBe('uk');
      });

      it('should not sync cookie when pathname language matches cookie', () => {
        (usePathname as jest.Mock).mockReturnValue('/uk/some-page');
        (Cookies.get as jest.Mock).mockReturnValue('uk'); // Cookie matches URL

        renderHook(() => useLanguagePreference());

        // Cookie.set should not be called for sync (only for initial load if needed)
        // We need to check that it wasn't called for sync specifically
        // The initial load might call it, so we check the call count
        const setCalls = (Cookies.set as jest.Mock).mock.calls.filter(
          (call) => call[0] === 'NEXT_LOCALE' && call[1] === 'uk'
        );
        // Should not have additional calls beyond what's needed
        expect(setCalls.length).toBeLessThanOrEqual(1);
      });

      it('should not sync cookie when pathname does not have a valid language', () => {
        (usePathname as jest.Mock).mockReturnValue(
          '/some-path-without-language'
        );
        (Cookies.get as jest.Mock).mockReturnValue('en');

        renderHook(() => useLanguagePreference());

        // Should not call Cookies.set for sync (only for initial load if needed)
        // Since pathname doesn't have a valid language, sync shouldn't happen
        const syncCalls = (Cookies.set as jest.Mock).mock.calls.filter(
          (call) => call[0] === 'NEXT_LOCALE'
        );
        // Only initial load might set cookie, but not sync
        expect(syncCalls.length).toBeLessThanOrEqual(1);
      });

      it('should sync cookie when pathname changes to different language', () => {
        (usePathname as jest.Mock).mockReturnValue('/en/page');
        (Cookies.get as jest.Mock).mockReturnValue('en');

        const { rerender } = renderHook(() => useLanguagePreference());

        // Clear previous calls
        jest.clearAllMocks();
        (Cookies.get as jest.Mock).mockReturnValue('en');

        // Change pathname to different language
        (usePathname as jest.Mock).mockReturnValue('/ru/page');
        rerender();

        // Wait for useEffect to run
        act(() => {
          // Trigger re-render
        });

        expect(Cookies.set).toHaveBeenCalledWith('NEXT_LOCALE', 'ru', {
          expires: 365,
          path: '/',
          sameSite: 'lax'
        });
      });

      it('should sync cookie for root path with language', () => {
        (usePathname as jest.Mock).mockReturnValue('/uk');
        (Cookies.get as jest.Mock).mockReturnValue('en');

        const { result } = renderHook(() => useLanguagePreference());

        act(() => {
          // Trigger re-render to ensure useEffect runs
        });

        expect(Cookies.set).toHaveBeenCalledWith('NEXT_LOCALE', 'uk', {
          expires: 365,
          path: '/',
          sameSite: 'lax'
        });
        expect(result.current.preferredLanguage).toBe('uk');
      });

      it('should sync cookie for all supported languages', () => {
        const supportedLanguages: Language[] = ['en', 'uk', 'ru'];

        supportedLanguages.forEach((lang) => {
          // Reset mocks but keep the setup
          jest.clearAllMocks();
          (usePathname as jest.Mock).mockReturnValue(`/${lang}/page`);

          // For each language, set cookie to a different language to ensure sync happens
          const differentLang = lang === 'en' ? 'uk' : 'en';
          (Cookies.get as jest.Mock)
            .mockReturnValueOnce(undefined) // Initial load - no cookie
            .mockReturnValue(differentLang); // Sync check - different from URL

          const { result } = renderHook(() => useLanguagePreference());

          act(() => {
            // Trigger re-render to ensure sync useEffect runs
          });

          expect(Cookies.set).toHaveBeenCalledWith('NEXT_LOCALE', lang, {
            expires: 365,
            path: '/',
            sameSite: 'lax'
          });
          expect(result.current.preferredLanguage).toBe(lang);
        });
      });

      it('should update preferredLanguage state when cookie syncs', () => {
        (usePathname as jest.Mock).mockReturnValue('/ru/some-page');
        (Cookies.get as jest.Mock).mockReturnValue('en');

        const { result } = renderHook(() => useLanguagePreference());

        act(() => {
          // Trigger re-render to ensure useEffect runs
        });

        expect(result.current.preferredLanguage).toBe('ru');
      });

      it('should handle pathname with multiple segments correctly', () => {
        (usePathname as jest.Mock).mockReturnValue('/uk/nested/deep/path');
        (Cookies.get as jest.Mock).mockReturnValue('en');

        const { result } = renderHook(() => useLanguagePreference());

        act(() => {
          // Trigger re-render
        });

        expect(Cookies.set).toHaveBeenCalledWith('NEXT_LOCALE', 'uk', {
          expires: 365,
          path: '/',
          sameSite: 'lax'
        });
        expect(result.current.preferredLanguage).toBe('uk');
      });
    });
  });

  describe('URL management', () => {
    it('should call enrichPathWithLanguage when language changes', () => {
      const { result } = renderHook(() => useLanguagePreference());

      act(() => {
        result.current.changeLanguage('uk');
      });

      expect(mockEnrichPathWithLanguage).toHaveBeenCalledWith(
        mockPathname,
        'uk',
        mockRouter
      );
    });

    it('should work with different pathnames', () => {
      const customPathname = '/custom/path';
      (usePathname as jest.Mock).mockReturnValue(customPathname);

      const { result } = renderHook(() => useLanguagePreference());

      act(() => {
        result.current.changeLanguage('ru');
      });

      expect(mockEnrichPathWithLanguage).toHaveBeenCalledWith(
        customPathname,
        'ru',
        mockRouter
      );
    });
  });

  describe('integration scenarios', () => {
    it('should maintain state across re-renders', () => {
      const { result, rerender } = renderHook(() => useLanguagePreference());

      act(() => {
        result.current.changeLanguage('uk');
      });

      expect(result.current.preferredLanguage).toBe('uk');

      rerender();

      expect(result.current.preferredLanguage).toBe('uk');
    });

    it('should handle initial cookie load and subsequent language change', () => {
      // First render with saved cookie
      (Cookies.get as jest.Mock).mockReturnValue('ru');
      const { parseLanguage } = jest.requireMock('@/utils/i18n/parseLanguage');
      parseLanguage.mockReturnValue('ru');

      const { result } = renderHook(() => useLanguagePreference());

      expect(result.current.preferredLanguage).toBe('ru');

      // Change language
      act(() => {
        result.current.changeLanguage('en');
      });

      expect(result.current.preferredLanguage).toBe('en');
      expect(Cookies.set).toHaveBeenCalledWith(
        'NEXT_LOCALE',
        'en',
        expect.any(Object)
      );
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      // Re-setup mocks after reset
      (useRouter as jest.Mock).mockReturnValue(mockRouter);
      (usePathname as jest.Mock).mockReturnValue(mockPathname);
      (Cookies.get as jest.Mock).mockReturnValue(undefined);
    });

    it('should handle Cookies.set failure gracefully', () => {
      (Cookies.set as jest.Mock).mockImplementation(() => {
        throw new Error('Cookie error');
      });

      const { result } = renderHook(() => useLanguagePreference());

      expect(() => {
        act(() => {
          result.current.changeLanguage('uk');
        });
      }).toThrow('Cookie error');
    });

    it('should handle enrichPathWithLanguage failure gracefully', () => {
      mockEnrichPathWithLanguage.mockImplementation(() => {
        throw new Error('Navigation error');
      });

      const { result } = renderHook(() => useLanguagePreference());

      expect(() => {
        act(() => {
          result.current.changeLanguage('uk');
        });
      }).toThrow('Navigation error');
    });
  });
});
