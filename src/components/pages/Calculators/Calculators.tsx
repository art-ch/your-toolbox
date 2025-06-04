'use client';

import { LuCalculator } from 'react-icons/lu';
import { NavigationContainer } from '../Navigation/components/NavigationContainer/NavigationContainer';
import { NavigationLinkCard } from '../Navigation/components/NavigationLinkCard/NavigationLinkCard';
import { PageHeading } from '@/components/PageHeading/PageHeading';
import { useTranslation } from 'react-i18next';

export const Calculators = () => {
  const { t } = useTranslation();

  return (
    <div>
      <PageHeading
        title={t('common:calculators')}
        subtitle={t('common:calculatorsDescription')}
      />
      <NavigationContainer>
        <NavigationLinkCard
          href="/calculators/ascetic-exercise-duration"
          icon={<LuCalculator />}
          title={t('asceticExerciseDuration:title')}
          subtitle={t('asceticExerciseDuration:subtitle')}
        />
      </NavigationContainer>
    </div>
  );
};
