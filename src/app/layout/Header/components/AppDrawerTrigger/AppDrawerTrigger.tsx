'use client';

import React from 'react';

import { useAppContext } from '@/app/context/AppContext/AppContext';

import { AlignJustify } from 'lucide-react';

export const AppDrawerTrigger = () => {
  const { drawer } = useAppContext();

  return <AlignJustify className="cursor-pointer" onClick={drawer.open} />;
};
