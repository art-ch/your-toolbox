'use client';

import React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

import { useAppContext } from '@/app/context/AppContext/AppContext';

export const Header = () => {
  const { drawer } = useAppContext();

  return (
    <div className="flex justify-between min-w-full p-2.5 shadow-[1px_1px_1px_0_rgba(0,0,0,0.06)]">
      <Link href="/navigation" onClick={drawer.close}>
        <h3 className="font-semibold">Navigation</h3>
      </Link>
      <X className="cursor-pointer" onClick={drawer.close} />
    </div>
  );
};
