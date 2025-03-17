'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import { useAppContext } from '@/app/context/AppContext/AppContext';

export type ContainerProps = { children: React.ReactNode };

export const Container = ({ children }: ContainerProps) => {
  const { drawer } = useAppContext();

  const drawerPosition = drawer.isOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <div
      className={cn(
        'fixed top-0 left-0 z-20 bottom-auto transition-transform duration-300 ease-in-out shadow bg-white w-60 h-[100dvh]',
        drawerPosition
      )}
      data-testid="container"
    >
      {children}
    </div>
  );
};
