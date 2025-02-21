'use client';

import React from 'react';

import { useAppContext } from '@/app/context/AppContext/AppContext';
import { cn } from '@/lib/utils';

export const Overlay = () => {
  const { drawer } = useAppContext();

  if (!drawer.isOpen) {
    return null;
  }

  return <div className={cn('fixed inset-0')} onClick={drawer.close} />;
};
