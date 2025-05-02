'use client';

import React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext/AppContext';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { drawer } = useAppContext();
  const { t } = useTranslation();

  return (
    <div className="flex justify-between min-w-full p-2.5 shadow-[1px_1px_1px_0_rgba(0,0,0,0.06)]">
      <Link href="/navigation" onClick={drawer.close}>
        <h3 className="font-semibold">{t('common:navigation')}</h3>
      </Link>
      <X className="cursor-pointer" onClick={drawer.close} />
    </div>
  );
};
