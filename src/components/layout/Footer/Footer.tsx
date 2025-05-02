'use client';

import React from 'react';
import { Link } from '@/components/Link/Link';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full min-h-12 bg-primary flex items-center justify-center">
      <div className="flex gap-1 justify-center text-sm text-secondary">
        <p>{t('footer:madeBy')}</p>
        <Link variant="light" href="https://github.com/art-ch">
          art-ch
        </Link>
      </div>
    </div>
  );
};
