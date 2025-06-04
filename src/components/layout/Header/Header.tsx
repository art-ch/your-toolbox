'use client';

import React from 'react';
import { PiToolboxFill } from 'react-icons/pi';

import {
  NavigationMenu,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import { AppDrawerTrigger } from './components/AppDrawerTrigger/AppDrawerTrigger';
import Link from 'next/link';
import { LanguageSwitcher } from './components/LanguageSwitcher/LanguageSwitcher';
import { Language } from '@/lib/i18n/types';

export type HeaderProps = {
  language: Language;
};

export const Header = ({ language }: HeaderProps) => {
  return (
    <NavigationMenu className="min-w-full shadow-xs py-0.5 justify-normal">
      <div className="min-w-full px-4">
        <NavigationMenuList className="min-width-full grid grid-cols-3">
          <AppDrawerTrigger />
          <Link className="justify-self-center" href="/">
            <PiToolboxFill className="text-[40px]" />
          </Link>
          <LanguageSwitcher currentLanguage={language} />
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
};
