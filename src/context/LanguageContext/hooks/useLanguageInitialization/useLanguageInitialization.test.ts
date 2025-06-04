import { renderHook } from '@testing-library/react';
import { useLanguageInitialization } from './useLanguageInitialization';
import { Language } from '@/lib/i18n/types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Mock Next.js navigation hooks
const mockPush = jest.fn();
const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  prefetch: jest.fn()
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => '/en/some-path'
}));

// Mock useLanguagePreference hook
const mockUseLanguagePreference = jest.fn();
jest.mock('@/hooks/useLanguagePreference/useLanguagePreference', () => ({
  useLanguagePreference: () => mockUseLanguagePreference()
}));

// Mock enrichPathWithLanguage utility
const mockEnrichPathWithLanguage = jest.fn();
jest.mock('@/utils/i18n', () => ({
  enrichPathWithLanguage: (
    pathname: string,
    language: string,
    router: AppRouterInstance
  ) => mockEnrichPathWithLanguage(pathname, language, router)
}));

// Mock languages array
jest.mock('@/lib/i18n/settings', () => ({
  languages: ['en', 'uk', 'ru']
}));

describe('useLanguageInitialization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLanguagePreference.mockReturnValue({
      preferredLanguage: null
    });
  });

  describe('language preference handling', () => {
    it('should not call enrichPathWithLanguage when preferredLanguage is null', () => {
      mockUseLanguagePreference.mockReturnValue({
        preferredLanguage: null
      });

      renderHook(() => useLanguageInitialization('en' as Language));

      expect(mockEnrichPathWithLanguage).not.toHaveBeenCalled();
    });

    it('should not call enrichPathWithLanguage when preferredLanguage matches current language', () => {
      mockUseLanguagePreference.mockReturnValue({
        preferredLanguage: 'en'
      });

      renderHook(() => useLanguageInitialization('en' as Language));

      expect(mockEnrichPathWithLanguage).not.toHaveBeenCalled();
    });

    it('should call enrichPathWithLanguage when preferredLanguage differs from current language', () => {
      mockUseLanguagePreference.mockReturnValue({
        preferredLanguage: 'uk'
      });

      renderHook(() => useLanguageInitialization('en' as Language));

      expect(mockEnrichPathWithLanguage).toHaveBeenCalledWith(
        '/en/some-path',
        'uk',
        mockRouter
      );
    });

    it('should not call enrichPathWithLanguage when preferredLanguage is not in languages list', () => {
      mockUseLanguagePreference.mockReturnValue({
        preferredLanguage: 'fr' // not in ['en', 'uk', 'ru']
      });

      renderHook(() => useLanguageInitialization('en' as Language));

      expect(mockEnrichPathWithLanguage).not.toHaveBeenCalled();
    });

    it('should handle all supported language transitions', () => {
      const testCases = [
        { current: 'en', preferred: 'uk', shouldCall: true },
        { current: 'en', preferred: 'ru', shouldCall: true },
        { current: 'uk', preferred: 'en', shouldCall: true },
        { current: 'uk', preferred: 'ru', shouldCall: true },
        { current: 'ru', preferred: 'en', shouldCall: true },
        { current: 'ru', preferred: 'uk', shouldCall: true },
        { current: 'en', preferred: 'en', shouldCall: false },
        { current: 'uk', preferred: 'uk', shouldCall: false },
        { current: 'ru', preferred: 'ru', shouldCall: false }
      ];

      testCases.forEach(({ current, preferred, shouldCall }) => {
        jest.clearAllMocks();
        mockUseLanguagePreference.mockReturnValue({
          preferredLanguage: preferred
        });

        renderHook(() => useLanguageInitialization(current as Language));

        if (shouldCall) {
          expect(mockEnrichPathWithLanguage).toHaveBeenCalledWith(
            '/en/some-path',
            preferred,
            mockRouter
          );
        } else {
          expect(mockEnrichPathWithLanguage).not.toHaveBeenCalled();
        }
      });
    });
  });

  describe('re-initialization prevention', () => {
    it('should not reinitialize on subsequent renders', () => {
      mockUseLanguagePreference.mockReturnValue({
        preferredLanguage: 'uk'
      });

      const { rerender } = renderHook(() =>
        useLanguageInitialization('en' as Language)
      );

      expect(mockEnrichPathWithLanguage).toHaveBeenCalledTimes(1);

      // Multiple re-renders should not trigger additional calls
      rerender();
      rerender();
      rerender();

      expect(mockEnrichPathWithLanguage).toHaveBeenCalledTimes(1);
    });

    it('should not reinitialize when language prop changes after initialization', () => {
      mockUseLanguagePreference.mockReturnValue({
        preferredLanguage: 'uk'
      });

      const { rerender } = renderHook(
        ({ language }) => useLanguageInitialization(language),
        { initialProps: { language: 'en' as Language } }
      );

      expect(mockEnrichPathWithLanguage).toHaveBeenCalledTimes(1);

      // Change the language prop
      rerender({ language: 'ru' as Language });

      // Should still only have been called once during initial render
      expect(mockEnrichPathWithLanguage).toHaveBeenCalledTimes(1);
    });

    it('should not reinitialize when pathname changes after initialization', () => {
      const originalUsePathname =
        jest.requireMock('next/navigation').usePathname;

      mockUseLanguagePreference.mockReturnValue({
        preferredLanguage: 'uk'
      });

      const { rerender } = renderHook(() =>
        useLanguageInitialization('en' as Language)
      );

      expect(mockEnrichPathWithLanguage).toHaveBeenCalledTimes(1);

      // Mock pathname change
      jest.requireMock('next/navigation').usePathname = () =>
        '/en/different-path';

      rerender();

      // Should still only have been called once
      expect(mockEnrichPathWithLanguage).toHaveBeenCalledTimes(1);

      // Restore original mock
      jest.requireMock('next/navigation').usePathname = originalUsePathname;
    });
  });

  describe('edge cases', () => {
    it('should handle preferredLanguage as empty string', () => {
      mockUseLanguagePreference.mockReturnValue({
        preferredLanguage: ''
      });

      renderHook(() => useLanguageInitialization('en' as Language));

      expect(mockEnrichPathWithLanguage).not.toHaveBeenCalled();
    });

    it('should handle preferredLanguage as undefined', () => {
      mockUseLanguagePreference.mockReturnValue({
        preferredLanguage: undefined
      });

      renderHook(() => useLanguageInitialization('en' as Language));

      expect(mockEnrichPathWithLanguage).not.toHaveBeenCalled();
    });

    it('should handle case-sensitive language comparison', () => {
      mockUseLanguagePreference.mockReturnValue({
        preferredLanguage: 'EN' // uppercase, should not match
      });

      renderHook(() => useLanguageInitialization('en' as Language));

      expect(mockEnrichPathWithLanguage).not.toHaveBeenCalled();
    });
  });

  describe('integration with dependencies', () => {
    it('should pass correct arguments to enrichPathWithLanguage', () => {
      mockUseLanguagePreference.mockReturnValue({
        preferredLanguage: 'ru'
      });

      renderHook(() => useLanguageInitialization('en' as Language));

      expect(mockEnrichPathWithLanguage).toHaveBeenCalledWith(
        '/en/some-path', // pathname from mock
        'ru', // preferredLanguage
        mockRouter // router instance
      );
    });

    it('should work with different pathname formats', () => {
      const originalUsePathname =
        jest.requireMock('next/navigation').usePathname;

      const testPaths = [
        '/',
        '/en',
        '/en/',
        '/en/nested/path',
        '/en/nested/path/with/many/segments'
      ];

      testPaths.forEach((testPath) => {
        jest.clearAllMocks();
        jest.requireMock('next/navigation').usePathname = () => testPath;

        mockUseLanguagePreference.mockReturnValue({
          preferredLanguage: 'uk'
        });

        renderHook(() => useLanguageInitialization('en' as Language));

        expect(mockEnrichPathWithLanguage).toHaveBeenCalledWith(
          testPath,
          'uk',
          mockRouter
        );
      });

      // Restore original mock
      jest.requireMock('next/navigation').usePathname = originalUsePathname;
    });
  });
});
