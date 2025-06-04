'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/AppContext/AppContext';

export const Overlay = () => {
  const { drawer } = useAppContext();

  if (!drawer.isOpen) {
    return null;
  }

  return <div className={cn('fixed inset-0')} onClick={drawer.close} />;
};
