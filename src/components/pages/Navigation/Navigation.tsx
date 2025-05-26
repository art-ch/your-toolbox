'use client';

import { LuCalculator } from 'react-icons/lu';
import { MdMiscellaneousServices } from 'react-icons/md';

import { NavigationContainer } from './components/NavigationContainer/NavigationContainer';
import { NavigationLinkCard } from './components/NavigationLinkCard/NavigationLinkCard';
import { PageHeading } from '@/components/PageHeading/PageHeading';
import { useTranslation } from 'react-i18next';

export const Navigation = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeading
        title={t('common:navigation')}
        subtitle={t('common:navPageDescription', {
          category: t('common:tools').toLowerCase()
        })}
      />
      <NavigationContainer>
        <NavigationLinkCard
          href="/calculators"
          icon={<LuCalculator />}
          title={t('common:calculators')}
          subtitle={t('common:calculatorsDescription')}
        />
        <NavigationLinkCard
          href="/specialized-tools"
          icon={<MdMiscellaneousServices />}
          title={t('common:specializedTools')}
          subtitle={t('common:specializedToolsDescription')}
        />
      </NavigationContainer>
    </div>
  );
};
