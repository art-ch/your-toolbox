'use client';

import { ToolPageHeading } from '@/app/components/PageHeading/PageHeading';
import { LuCalculator } from 'react-icons/lu';
import { TORSUNOV } from '@/constants/authorMentions';
import { CalculateCleansingCyclesForm } from './components/DynamicExerciseForms/CalculateCleansingCyclesForm/CalculateCleansingCyclesForm';
import { CalculateSpeedForm } from './components/DynamicExerciseForms/CalculateSpeedForm';
import { CalculateTotalTimeForm } from './components/DynamicExerciseForms/CalculateTotalTimeForm';

export const AsceticExerciseDuration = () => {
  return (
    <div>
      <ToolPageHeading
        icon={<LuCalculator />}
        title="Ascetic Exercise Duration"
        authorMention={TORSUNOV}
      />
      <div className="flex flex-col gap-y-8 py-2 sm:py-4 md:py-6">
        <CalculateCleansingCyclesForm />
        <CalculateSpeedForm />
        <CalculateTotalTimeForm />
      </div>
    </div>
  );
};
