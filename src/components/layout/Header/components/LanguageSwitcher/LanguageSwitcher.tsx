'use client';

import { languages } from '@/lib/i18n/settings';
import { useLanguagePreference } from '@/hooks/useLanguagePreference/useLanguagePreference';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function LanguageSwitcher({ currentLng }: { currentLng: string }) {
  const { changeLanguage } = useLanguagePreference();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="max-w-fit justify-self-end cursor-pointer">
        {currentLng.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((lng) => (
          <DropdownMenuItem
            key={lng}
            className={`${currentLng === lng ? 'font-bold' : ''}`}
            onClick={() => changeLanguage(lng)}
          >
            {lng.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
