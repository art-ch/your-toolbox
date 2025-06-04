'use client';

import { createContext, useContext } from 'react';
import i18next from '@/lib/i18n/client';
import { I18nextProvider } from 'react-i18next';
import { useLanguageInitialization } from './hooks/useLanguageInitialization/useLanguageInitialization';
import { useLanguageLoader } from './hooks/useLanguageLoader/useLanguageLoader';
import { Language } from '@/lib/i18n/types';

type LanguageContextType = {
  isLoading: boolean;
  currentLanguage: Language;
  changeLanguage: (newLanguage: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export type LanguageProviderProps = {
  children: React.ReactNode;
  language: Language;
};

export function LanguageProvider({
  children,
  language
}: LanguageProviderProps) {
  useLanguageInitialization(language);
  const { isLoading, currentLanguage, changeLanguage } =
    useLanguageLoader(language);

  const contextValue = {
    isLoading,
    currentLanguage,
    changeLanguage
  };

  // Combine I18nextProvider with our custom LanguageContext
  return (
    <I18nextProvider i18n={i18next}>
      <LanguageContext.Provider value={contextValue}>
        {children}
      </LanguageContext.Provider>
    </I18nextProvider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
