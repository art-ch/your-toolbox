'use client';

import { Hero } from '@/components/Hero/Hero';
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Hero
      title="404"
      subtitle={t('404:subtitle')}
      buttonText={t('common:checkAvailableTools')}
    />
  );
};
