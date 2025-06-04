'use client';

import { Suspense, useEffect, useState } from 'react';
import { AppProvider } from '@/context/AppContext/AppContext';
import { PageLoading } from '@/components/PageLoading/PageLoading';
import {
  LanguageProvider,
  useLanguage
} from '@/context/LanguageContext/LanguageContext';
import { Language } from '@/lib/i18n/types';

type ProvidersContentProps = {
  children: React.ReactNode;
};

function ProvidersContent({ children }: ProvidersContentProps) {
  const { isLoading } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything until the component is mounted on the client
  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return <PageLoading />;
  }

  return <AppProvider>{children}</AppProvider>;
}

export type ProvidersProps = {
  children: React.ReactNode;
  language: Language;
};

export function Providers({ children, language }: ProvidersProps) {
  return (
    <LanguageProvider language={language}>
      <Suspense fallback={<PageLoading />}>
        <ProvidersContent>{children}</ProvidersContent>
      </Suspense>
    </LanguageProvider>
  );
}
