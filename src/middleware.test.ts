import { NextRequest, NextResponse } from 'next/server';
import { middleware } from './middleware';
import { languages, defaultLanguage } from './lib/i18n/settings';

// Mock the NextResponse methods
jest.mock('next/server', () => {
  return {
    NextRequest: jest.fn(),
    NextResponse: {
      next: jest.fn(() => ({ type: 'next' })),
      redirect: jest.fn((url) => ({ type: 'redirect', url: url.toString() }))
    }
  };
});

describe('Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to create a mock NextRequest
  function createMockRequest(
    path: string,
    cookies: { name: string; value: string }[] = []
  ) {
    const url = new URL(`https://example.com${path}`);
    return {
      nextUrl: url,
      url: url.toString(),
      cookies: {
        get: (name: string) => cookies.find((cookie) => cookie.name === name)
      }
    } as unknown as NextRequest;
  }

  describe('Path exclusions', () => {
    it.each([
      '/favicon.ico',
      '/_next/static/chunks/main.js',
      '/api/auth',
      '/images/logo.png'
    ])('should skip middleware for excluded path: %s', (path) => {
      const request = createMockRequest(path);
      middleware(request);
      expect(NextResponse.next).toHaveBeenCalled();
      expect(NextResponse.redirect).not.toHaveBeenCalled();
    });
  });

  describe('Locale handling', () => {
    it('should redirect to default language when no locale is present in path', () => {
      const request = createMockRequest('/about');
      middleware(request);

      expect(NextResponse.redirect).toHaveBeenCalledTimes(1);
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        expect.objectContaining({
          pathname: `/${defaultLanguage}/about`
        })
      );
    });

    it('should redirect root path to default language', () => {
      const request = createMockRequest('/');
      middleware(request);

      expect(NextResponse.redirect).toHaveBeenCalledTimes(1);
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        expect.objectContaining({
          pathname: `/${defaultLanguage}`
        })
      );
    });

    it('should not redirect when valid locale is already in the path', () => {
      for (const locale of languages) {
        const request = createMockRequest(`/${locale}/about`);
        middleware(request);

        expect(NextResponse.next).toHaveBeenCalled();
        expect(NextResponse.redirect).not.toHaveBeenCalled();
      }
    });

    it('should use cookie locale if available and valid', () => {
      const nonDefaultLocale =
        languages.find((lang) => lang !== defaultLanguage) || 'uk';
      const request = createMockRequest('/about', [
        { name: 'NEXT_LOCALE', value: nonDefaultLocale }
      ]);

      middleware(request);

      expect(NextResponse.redirect).toHaveBeenCalledTimes(1);
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        expect.objectContaining({
          pathname: `/${nonDefaultLocale}/about`
        })
      );
    });

    it('should use default locale if cookie locale is invalid', () => {
      const request = createMockRequest('/about', [
        { name: 'NEXT_LOCALE', value: 'invalid-locale' }
      ]);

      middleware(request);

      expect(NextResponse.redirect).toHaveBeenCalledTimes(1);
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        expect.objectContaining({
          pathname: `/${defaultLanguage}/about`
        })
      );
    });
  });
});
