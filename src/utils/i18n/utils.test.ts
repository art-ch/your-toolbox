import { enrichPathWithLanguage } from './utils';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Mock router
const mockRouter: jest.Mocked<AppRouterInstance> = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn()
};

describe('enrichPathWithLanguage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('basic functionality', () => {
    it('should replace the language segment in a simple path', () => {
      const pathname = '/en/dashboard';
      const language = 'uk';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/uk/dashboard');
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
    });

    it('should replace the language segment in a nested path', () => {
      const pathname = '/en/dashboard/settings/profile';
      const language = 'ru';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith(
        '/ru/dashboard/settings/profile'
      );
    });

    it('should handle root language paths', () => {
      const pathname = '/en';
      const language = 'uk';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/uk');
    });
  });

  describe('language replacement scenarios', () => {
    it('should replace English with Ukrainian', () => {
      const pathname = '/en/about';
      const language = 'uk';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/uk/about');
    });

    it('should replace Ukrainian with Russian', () => {
      const pathname = '/uk/contact';
      const language = 'ru';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/ru/contact');
    });

    it('should replace Russian with English', () => {
      const pathname = '/ru/services';
      const language = 'en';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/en/services');
    });

    it('should replace with the same language', () => {
      const pathname = '/en/home';
      const language = 'en';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/en/home');
    });
  });

  describe('complex path scenarios', () => {
    it('should handle paths with query parameters preserved structure', () => {
      const pathname = '/en/search';
      const language = 'uk';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/uk/search');
    });

    it('should handle deeply nested paths', () => {
      const pathname = '/en/admin/users/123/edit/profile/advanced';
      const language = 'ru';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith(
        '/ru/admin/users/123/edit/profile/advanced'
      );
    });

    it('should handle paths with numeric segments', () => {
      const pathname = '/en/posts/123/comments/456';
      const language = 'uk';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith(
        '/uk/posts/123/comments/456'
      );
    });

    it('should handle paths with special characters in segments', () => {
      const pathname = '/en/categories/tech-news/article-1';
      const language = 'ru';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith(
        '/ru/categories/tech-news/article-1'
      );
    });
  });

  describe('edge cases', () => {
    it('should handle empty pathname gracefully', () => {
      const pathname = '';
      const language = 'uk';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/uk');
    });

    it('should handle single slash pathname', () => {
      const pathname = '/';
      const language = 'ru';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/ru');
    });

    it('should handle pathname with only language segment', () => {
      const pathname = '/en/';
      const language = 'ru';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/ru/');
    });

    it('should handle multiple consecutive slashes', () => {
      const pathname = '/en//dashboard//settings';
      const language = 'uk';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/uk//dashboard//settings');
    });
  });

  describe('language parameter handling', () => {
    it('should work with different language formats', () => {
      const pathname = '/en/page';

      // Test with different language codes
      const languageCodes = ['uk', 'ru', 'en', 'de', 'fr'];

      languageCodes.forEach((lang) => {
        mockRouter.push.mockClear();
        enrichPathWithLanguage(pathname, lang, mockRouter);
        expect(mockRouter.push).toHaveBeenCalledWith(`/${lang}/page`);
      });
    });

    it('should handle empty language string', () => {
      const pathname = '/en/dashboard';
      const language = '';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('//dashboard');
    });

    it('should handle language with special characters', () => {
      const pathname = '/en/test';
      const language = 'en-US';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/en-US/test');
    });
  });

  describe('router interaction', () => {
    it('should call router.push exactly once', () => {
      const pathname = '/en/test';
      const language = 'uk';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledTimes(1);
    });

    it('should not call other router methods', () => {
      const pathname = '/en/test';
      const language = 'uk';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.replace).not.toHaveBeenCalled();
      expect(mockRouter.back).not.toHaveBeenCalled();
      expect(mockRouter.forward).not.toHaveBeenCalled();
      expect(mockRouter.refresh).not.toHaveBeenCalled();
      expect(mockRouter.prefetch).not.toHaveBeenCalled();
    });

    it('should work with different router instances', () => {
      const anotherMockRouter: jest.Mocked<AppRouterInstance> = {
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn()
      };

      const pathname = '/en/test';
      const language = 'uk';

      enrichPathWithLanguage(pathname, language, anotherMockRouter);

      expect(anotherMockRouter.push).toHaveBeenCalledWith('/uk/test');
      expect(mockRouter.push).not.toHaveBeenCalled();
    });
  });

  describe('path segment manipulation', () => {
    it('should correctly split and rejoin path segments', () => {
      const testCases = [
        { pathname: '/en/a/b/c', language: 'uk', expected: '/uk/a/b/c' },
        { pathname: '/ru/x', language: 'en', expected: '/en/x' },
        { pathname: '/uk', language: 'ru', expected: '/ru' },
        {
          pathname: '/en/multi/level/deep/path',
          language: 'uk',
          expected: '/uk/multi/level/deep/path'
        }
      ];

      testCases.forEach(({ pathname, language, expected }) => {
        mockRouter.push.mockClear();
        enrichPathWithLanguage(pathname, language, mockRouter);
        expect(mockRouter.push).toHaveBeenCalledWith(expected);
      });
    });

    it('should preserve trailing slashes', () => {
      const pathname = '/en/dashboard/';
      const language = 'uk';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/uk/dashboard/');
    });

    it('should handle paths with only language and trailing slash', () => {
      const pathname = '/en/';
      const language = 'ru';

      enrichPathWithLanguage(pathname, language, mockRouter);

      expect(mockRouter.push).toHaveBeenCalledWith('/ru/');
    });
  });
});
