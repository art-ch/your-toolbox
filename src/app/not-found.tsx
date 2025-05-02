import { redirect } from 'next/navigation';
import { defaultLanguage } from '@/lib/i18n/settings';
import { cookies } from 'next/headers';

export default async function RootNotFound() {
  const cookieStore = await cookies();
  const preferredLanguage = cookieStore.get('NEXT_LOCALE')?.value;

  const language = preferredLanguage || defaultLanguage;

  // Redirect to our dedicated not-found page in the appropriate language
  redirect(`/${language}/not-found`);
}
