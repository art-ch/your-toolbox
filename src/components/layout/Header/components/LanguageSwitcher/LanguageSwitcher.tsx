'use client';

import { languages } from '@/lib/i18n/settings';
import { useLanguagePreference } from '@/hooks/useLanguagePreference/useLanguagePreference';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { languageSwitcherConfig } from './LanguageSwitcher.config';
import { Language } from '@/lib/i18n/types';

type LanguageSwitcherProps = {
  currentLanguage: Language;
};

export function LanguageSwitcher({ currentLanguage }: LanguageSwitcherProps) {
  const { changeLanguage } = useLanguagePreference();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="max-w-fit justify-self-end cursor-pointer">
        {languageSwitcherConfig[currentLanguage].label}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((language) => (
          <DropdownMenuItem
            key={language}
            className={`${currentLanguage === language ? 'font-bold' : ''}`}
            onClick={() => changeLanguage(language)}
          >
            {languageSwitcherConfig[language].label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
