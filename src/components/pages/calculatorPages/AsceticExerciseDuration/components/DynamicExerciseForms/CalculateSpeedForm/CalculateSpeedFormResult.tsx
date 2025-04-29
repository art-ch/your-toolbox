import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { getIsWalking } from '@/components/pages/calculatorPages/AsceticExerciseDuration/utils/dynamicExerciseUtils/utils';
import { formatTime } from '@/utils/timeUtils';

export type CalculateSpeedFormResultProps = {
  result: number;
  form: UseFormReturn<{
    mentalLayers: number;
    duration: number;
  }>;
};

export const CalculateSpeedFormResult = ({
  result,
  form
}: CalculateSpeedFormResultProps) => {
  const isWalking = getIsWalking(result);

  const isSpeedHardToAchieve = result > 45;

  const duration = formatTime(form.getValues().duration);

  return (
    <div data-testid="calculate-speed-form-result">
      <p>
        You need to {isWalking ? 'walk' : 'run'} with the speed of {result} km/h
        to clean {form.getValues().mentalLayers} mental layers in {duration}.
      </p>
      {isSpeedHardToAchieve && (
        <p>
          That&apos;s lightning fast! The current world record for sprint speed
          is about 45 km/h. Are you aiming to break it? If not, consider
          choosing a longer time period for a more typical running pace.
        </p>
      )}
    </div>
  );
};
