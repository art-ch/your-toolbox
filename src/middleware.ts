import { NextRequest, NextResponse } from 'next/server';
import { languages, defaultLanguage } from './lib/i18n/settings';
import { parseLanguage } from './utils/i18n/parseLanguage';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip for non-HTML requests
  if (
    pathname.includes('.') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Check if the pathname starts with a supported locale
  const pathnameIsMissingLocale = languages.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Only redirect if there is no locale in the pathname
  if (pathnameIsMissingLocale) {
    // Check for language preference in cookie
    const preferredLanguage = parseLanguage(
      request.cookies.get('NEXT_LOCALE')?.value
    );

    // Use preferred language if valid, otherwise use default
    const locale =
      preferredLanguage && languages.includes(preferredLanguage)
        ? preferredLanguage
        : defaultLanguage;

    // Create new URL with the appropriate language prefix
    const newUrl = new URL(
      `/${locale}${pathname === '/' ? '' : pathname}`,
      request.url
    );

    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
