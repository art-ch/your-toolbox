import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { getIsWalking } from '../../../utils/DynamicExerciseUtils/utils';
import { formatTime } from '@/utils/timeUtils';

export type CalculateTotalTimeFormResultProps = {
  result: number;
  form: UseFormReturn<{
    cleansingCycles: number;
    speed: number;
  }>;
};

export const CalculateTotalTimeFormResult = ({
  result,
  form
}: CalculateTotalTimeFormResultProps) => {
  const isWalking = getIsWalking(form.getValues().speed);

  const totalTime = formatTime(result);

  return (
    <p>
      You have to {isWalking ? 'walk' : 'run'} for {totalTime} to clean{' '}
      {form.getValues().cleansingCycles} mental layers at a speed of{' '}
      {form.getValues().speed} km/h
    </p>
  );
};
