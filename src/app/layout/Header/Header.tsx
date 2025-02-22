'use client';

import React from 'react';
import { PiToolboxFill } from 'react-icons/pi';

import {
  NavigationMenu,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import { AppDrawerTrigger } from './components/AppDrawerTrigger/AppDrawerTrigger';
import Link from 'next/link';

export const Header = () => {
  return (
    <NavigationMenu className="min-w-full shadow-sm py-0.5 justify-normal">
      <div className="min-w-full px-4">
        <NavigationMenuList className="min-width-full grid grid-cols-3">
          <AppDrawerTrigger />
          <Link className="justify-self-center" href="/">
            <PiToolboxFill className="text-[40px]" />
          </Link>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
};
