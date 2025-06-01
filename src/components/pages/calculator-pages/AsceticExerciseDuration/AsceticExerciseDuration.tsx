'use client';

import { LuCalculator } from 'react-icons/lu';
import { getTorsunovAuthorMention } from '@/config/authorMentions';
import { ExerciseTypeTabs } from './components/ExerciseTypeTabs/ExerciseTypeTabs';
import { ToolPageHeading } from '@/components/PageHeading/PageHeading';
import { useTranslation } from 'react-i18next';
import { parseLanguage } from '@/utils/i18n/parseLanguage';

export const AsceticExerciseDuration = () => {
  const { t, i18n } = useTranslation(['asceticExerciseDuration', 'common']);

  const language = parseLanguage(i18n.language);

  return (
    <div>
      <ToolPageHeading
        icon={<LuCalculator />}
        title={t('asceticExerciseDuration:title')}
        authorMention={getTorsunovAuthorMention(t, language)}
      />
      <h2 className="text-center text-lg sm:text-xl pb-2 font-bold">
        {t('asceticExerciseDuration:exerciseType')}
      </h2>
      <ExerciseTypeTabs />
    </div>
  );
};
