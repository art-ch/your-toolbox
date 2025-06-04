import { renderHook, act, waitFor } from '@testing-library/react';
import { useLanguageLoader } from './useLanguageLoader';
import { Language } from '@/lib/i18n/types';

// Mock the dependencies
jest.mock('@/lib/i18n/client', () => ({
  changeLanguage: jest.fn(() => Promise.resolve())
}));

jest.mock('@/lib/i18n/settings', () => ({
  languages: ['en', 'uk', 'ru']
}));

jest.mock('@/hooks/useLanguagePreference/useLanguagePreference', () => ({
  useLanguagePreference: jest.fn(() => ({
    changeLanguage: jest.fn()
  }))
}));

import i18next from '@/lib/i18n/client';
import { languages } from '@/lib/i18n/settings';
import { useLanguagePreference } from '@/hooks/useLanguagePreference/useLanguagePreference';
import { TFunction } from 'i18next';

// Type the mocked modules
const mockI18next = i18next as jest.Mocked<typeof i18next>;
const mockUseLanguagePreference = useLanguagePreference as jest.MockedFunction<
  typeof useLanguagePreference
>;

describe('useLanguageLoader', () => {
  const mockSetPreferredLanguage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLanguagePreference.mockReturnValue({
      preferredLanguage: null,
      changeLanguage: mockSetPreferredLanguage
    });
    mockI18next.changeLanguage.mockResolvedValue(
      undefined as unknown as TFunction<'translation', undefined>
    );
  });

  describe('Initial state', () => {
    it('should initialize with loading state true and provided language', () => {
      const { result } = renderHook(() => useLanguageLoader('en' as Language));

      expect(result.current.isLoading).toBe(true);
      expect(result.current.currentLanguage).toBe('en');
      expect(typeof result.current.changeLanguage).toBe('function');
    });

    it('should initialize correctly with different languages', () => {
      const testLanguages: Language[] = ['en', 'uk', 'ru'];

      testLanguages.forEach((language) => {
        const { result } = renderHook(() => useLanguageLoader(language));

        expect(result.current.currentLanguage).toBe(language);
        expect(result.current.isLoading).toBe(true);
      });
    });
  });

  describe('Language loading effect', () => {
    it('should call i18next.changeLanguage when language is provided', async () => {
      renderHook(() => useLanguageLoader('en' as Language));

      expect(mockI18next.changeLanguage).toHaveBeenCalledWith('en');
      expect(mockI18next.changeLanguage).toHaveBeenCalledTimes(1);
    });

    it('should set loading to false after i18next.changeLanguage resolves', async () => {
      const { result } = renderHook(() => useLanguageLoader('en' as Language));

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('should update currentLanguage and call i18next when language prop changes', async () => {
      const { result, rerender } = renderHook(
        ({ language }) => useLanguageLoader(language),
        { initialProps: { language: 'en' as Language } }
      );

      expect(result.current.currentLanguage).toBe('en');
      expect(mockI18next.changeLanguage).toHaveBeenCalledWith('en');

      // Change language prop
      rerender({ language: 'uk' as Language });

      expect(result.current.currentLanguage).toBe('uk');
      expect(mockI18next.changeLanguage).toHaveBeenCalledWith('uk');
      expect(mockI18next.changeLanguage).toHaveBeenCalledTimes(2);
    });
  });

  describe('changeLanguage function', () => {
    it('should call setPreferredLanguage when language is valid', () => {
      const { result } = renderHook(() => useLanguageLoader('en' as Language));

      act(() => {
        result.current.changeLanguage('uk' as Language);
      });

      expect(mockSetPreferredLanguage).toHaveBeenCalledWith('uk');
      expect(mockSetPreferredLanguage).toHaveBeenCalledTimes(1);
    });

    it('should call setPreferredLanguage for all valid languages', () => {
      const { result } = renderHook(() => useLanguageLoader('en' as Language));
      const validLanguages: Language[] = ['en', 'uk', 'ru'];

      validLanguages.forEach((language) => {
        act(() => {
          result.current.changeLanguage(language);
        });
      });

      expect(mockSetPreferredLanguage).toHaveBeenCalledTimes(3);
      validLanguages.forEach((language) => {
        expect(mockSetPreferredLanguage).toHaveBeenCalledWith(language);
      });
    });

    it('should not call setPreferredLanguage for invalid languages', () => {
      const { result } = renderHook(() => useLanguageLoader('en' as Language));

      // Mock languages to not include 'fr'
      jest.mocked(languages).splice(0, languages.length, 'en', 'uk', 'ru');

      act(() => {
        result.current.changeLanguage('fr' as Language);
      });

      expect(mockSetPreferredLanguage).not.toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined language parameter', async () => {
      const { result } = renderHook(() =>
        useLanguageLoader(undefined as unknown as Language)
      );

      expect(result.current.currentLanguage).toBeUndefined();
      expect(result.current.isLoading).toBe(true);

      // i18next.changeLanguage should not be called with undefined
      expect(mockI18next.changeLanguage).not.toHaveBeenCalled();
    });

    it('should handle null language parameter', async () => {
      const { result } = renderHook(() =>
        useLanguageLoader(null as unknown as Language)
      );

      expect(result.current.currentLanguage).toBeNull();
      expect(result.current.isLoading).toBe(true);

      // i18next.changeLanguage should not be called with null
      expect(mockI18next.changeLanguage).not.toHaveBeenCalled();
    });

    it('should maintain loading state when i18next.changeLanguage is slow', () => {
      let resolvePromise: () => void;
      const slowPromise = new Promise<void>((resolve) => {
        resolvePromise = resolve;
      });

      mockI18next.changeLanguage.mockReturnValue(
        slowPromise as unknown as Promise<TFunction<'translation', undefined>>
      );

      const { result } = renderHook(() => useLanguageLoader('en' as Language));

      expect(result.current.isLoading).toBe(true);

      // Resolve the promise
      act(() => {
        resolvePromise();
      });
    });
  });

  describe('Multiple language changes', () => {
    it('should handle rapid language changes correctly', async () => {
      const { result, rerender } = renderHook(
        ({ language }) => useLanguageLoader(language),
        { initialProps: { language: 'en' as Language } }
      );

      // Rapidly change languages
      rerender({ language: 'uk' as Language });
      rerender({ language: 'ru' as Language });
      rerender({ language: 'en' as Language });

      expect(result.current.currentLanguage).toBe('en');
      expect(mockI18next.changeLanguage).toHaveBeenCalledTimes(4); // Initial + 3 changes
      expect(mockI18next.changeLanguage).toHaveBeenLastCalledWith('en');
    });
  });

  describe('Integration with useLanguagePreference', () => {
    it('should use the mocked useLanguagePreference hook', () => {
      renderHook(() => useLanguageLoader('en' as Language));

      expect(mockUseLanguagePreference).toHaveBeenCalledTimes(1);
    });

    it('should handle when useLanguagePreference returns different changeLanguage function', () => {
      const alternativeChangeLanguage = jest.fn();
      mockUseLanguagePreference.mockReturnValue({
        preferredLanguage: null,
        changeLanguage: alternativeChangeLanguage
      });

      const { result } = renderHook(() => useLanguageLoader('en' as Language));

      act(() => {
        result.current.changeLanguage('uk' as Language);
      });

      expect(alternativeChangeLanguage).toHaveBeenCalledWith('uk');
      expect(mockSetPreferredLanguage).not.toHaveBeenCalled();
    });
  });
});
