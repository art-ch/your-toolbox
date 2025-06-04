import { redirect } from 'next/navigation';
import { defaultLanguage } from '@/lib/i18n/settings';
import { cookies } from 'next/headers';

/**
 * Root-level 404 Not Found handler.
 *
 * This component handles 404 errors at the app root level before language detection.
 * Since this app is internationalized with dedicated language-specific routes,
 * this component redirects users to the appropriate language-specific not-found page
 * based on their preferred language (from cookies) or falls back to the default language.
 *
 * The actual not-found UI is implemented in the [lng]/not-found page.
 *
 * Component accesses the browser's cookie store to check for a 'NEXT_LOCALE' cookie
 * that stores the user's preferred language. If no language preference is found in cookies,
 * it falls back to the default language defined in the i18n settings. Finally, it uses
 * Next.js redirect() function to send the user to the language-specific not-found page
 * with the appropriate language prefix in the URL.
 */
export default async function RootNotFound() {
  const cookieStore = await cookies();

  const preferredLanguage = cookieStore.get('NEXT_LOCALE')?.value;

  const language = preferredLanguage || defaultLanguage;

  // Redirect to the dedicated not-found page in the appropriate language
  redirect(`/${language}/not-found`);
}
