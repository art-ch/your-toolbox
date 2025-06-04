import { defaultLanguage } from '@/lib/i18n/settings';
import { Language } from '@/lib/i18n/types';

type LanguageSwitcherConfig = Record<Language, { label: string }>;

export const languageSwitcherConfig: LanguageSwitcherConfig = {
  [defaultLanguage]: {
    label: 'English'
  },
  ['ru']: {
    label: 'Русский'
  },
  ['uk']: {
    label: 'Українська'
  }
};
