'use client';

import { Hero } from '@/components/Hero/Hero';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <Hero
      title="Your Toolbox"
      subtitle={t('homePage:subtitle')}
      buttonText={t('homePage:buttonText')}
    />
  );
};
