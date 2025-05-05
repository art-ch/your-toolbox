import '../globals.css';
import { languages } from '@/lib/i18n/settings';
import { createTranslationProvider } from '@/lib/i18n/server-hooks';

import { Providers } from '@/app/providers';
import { AppDrawer } from '@/components/layout/AppDrawer/AppDrawer';
import { Footer, Header } from '@/components/layout';

const namespaces = ['common', 'homePage', 'footer', 'asceticExerciseDuration'];

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default async function LanguageLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const { lng } = await params;

  if (!lng) {
    throw new Error('Language parameter is missing');
  }

  const TranslationProvider = await createTranslationProvider({
    locale: lng,
    namespaces,
    children
  });

  return (
    <html lang={lng}>
      <body>
        <Providers lng={lng}>
          <AppDrawer />
          <Header lng={lng} />
          {/* 44 (height of header and paddings) + 48 (height of footer) = 92 */}
          <main className="min-h-[calc(100vh-92px)] max-w-(--breakpoint-xl) my-0 mx-auto px-4 sm:px-6 2xl:px-0">
            {TranslationProvider}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
