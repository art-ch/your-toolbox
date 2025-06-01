import '../globals.css';
import { languages, namespaces } from '@/lib/i18n/settings';
import { createTranslationProvider } from '@/lib/i18n/server-hooks';
import { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n/server';
import { Providers } from '@/app/providers';
import { AppDrawer } from '@/components/layout/AppDrawer/AppDrawer';
import { Footer, Header } from '@/components/layout';
import { parseLanguage } from '@/utils/i18n/parseLanguage';

type GenerateMetadataProps = {
  params: { lng: string };
};

export async function generateMetadata({
  params
}: GenerateMetadataProps): Promise<Metadata> {
  const { lng } = await params;

  const language = parseLanguage(lng);

  const { t } = await getTranslations(language, 'common');

  return {
    title: 'Your toolbox',
    description: t('metadata.description'),
    icons: {
      icon: '/favicon.png',
      shortcut: '/favicon.svg',
      apple: '/apple-touch-icon.png',
      other: {
        rel: 'favicon',
        url: '/favicon.png'
      }
    }
  };
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

type LanguageLayoutProps = {
  children: React.ReactNode;
  params: { lng: string };
};

export default async function LanguageLayout({
  children,
  params
}: LanguageLayoutProps) {
  const { lng } = await params;

  const language = parseLanguage(lng);

  if (!lng) {
    throw new Error('Language parameter is missing');
  }

  const TranslationProvider = await createTranslationProvider({
    locale: language,
    namespaces,
    children
  });

  return (
    <html lang={lng}>
      <body>
        <Providers language={language}>
          <AppDrawer />
          <Header language={language} />
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
