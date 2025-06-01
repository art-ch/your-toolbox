import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * Updates the URL path to reflect a language change
 * @param pathname The current pathname from Next.js usePathname()
 * @param language The language code to set in the URL
 * @param router The Next.js router instance from useRouter()
 */
export function enrichPathWithLanguage(
  pathname: string,
  language: string,
  router: AppRouterInstance
): void {
  const segments = pathname.split('/');
  segments[1] = language;
  router.push(segments.join('/'));
}
