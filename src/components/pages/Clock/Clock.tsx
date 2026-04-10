'use client';

import { LuClock } from 'react-icons/lu';
import { NavigationContainer } from '../Navigation/components/NavigationContainer/NavigationContainer';
import { NavigationLinkCard } from '../Navigation/components/NavigationLinkCard/NavigationLinkCard';
import { PageHeading } from '@/components/PageHeading/PageHeading';
import { useTranslation } from 'react-i18next';

export const Clock = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeading
        title={t('common:clock')}
        subtitle={t('common:clockDescription')}
      />
      <NavigationContainer>
        <NavigationLinkCard
          href="/clock/world-time"
          icon={<LuClock />}
          title={t('worldTime:title')}
          subtitle={t('worldTime:subtitle')}
        />
      </NavigationContainer>
    </div>
  );
};
