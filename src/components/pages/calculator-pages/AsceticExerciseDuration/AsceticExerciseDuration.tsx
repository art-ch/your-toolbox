'use client';

import { LuCalculator } from 'react-icons/lu';
import { TORSUNOV } from '@/constants/authorMentions';
import { ExerciseTypeTabs } from './components/ExerciseTypeTabs/ExerciseTypeTabs';
import { ToolPageHeading } from '@/components/PageHeading/PageHeading';
import { useTranslation } from 'react-i18next';

export const AsceticExerciseDuration = () => {
  const { t } = useTranslation('asceticExerciseDuration');

  return (
    <div>
      <ToolPageHeading
        icon={<LuCalculator />}
        title={t('title')}
        authorMention={TORSUNOV}
      />
      <h2 className="text-center text-lg sm:text-xl pb-2 font-bold">
        {t('exerciseType')}
      </h2>
      <ExerciseTypeTabs />
    </div>
  );
};
