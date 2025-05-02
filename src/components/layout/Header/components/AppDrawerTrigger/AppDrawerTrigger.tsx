'use client';

import React from 'react';

import { AlignJustify } from 'lucide-react';
import { useAppContext } from '@/context/AppContext/AppContext';

export const AppDrawerTrigger = () => {
  const { drawer } = useAppContext();

  return (
    <AlignJustify
      className="cursor-pointer"
      data-testid="app-drawer-trigger"
      onClick={drawer.open}
    />
  );
};
