'use client';

import { LuCalculator } from 'react-icons/lu';
import { TORSUNOV } from '@/constants/authorMentions';
import { ExerciseTypeTabs } from './components/ExerciseTypeTabs/ExerciseTypeTabs';
import { ToolPageHeading } from '@/components/PageHeading/PageHeading';

export const AsceticExerciseDuration = () => (
  <div>
    <ToolPageHeading
      icon={<LuCalculator />}
      title="Ascetic Exercise Duration"
      authorMention={TORSUNOV}
    />
    <h2 className="text-center text-lg sm:text-xl pb-2 font-bold">
      Exercise type
    </h2>
    <ExerciseTypeTabs />
  </div>
);
