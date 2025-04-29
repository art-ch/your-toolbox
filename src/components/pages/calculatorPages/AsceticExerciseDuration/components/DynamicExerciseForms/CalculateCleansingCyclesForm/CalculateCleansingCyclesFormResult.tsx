import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CalculateCleansingCyclesReturnType } from '../../../services/DynamicExerciseDuration';
import { getIsWalking } from '../../../utils/dynamicExerciseUtils/utils';
import { formatTime } from '@/utils/timeUtils';

export type CalculateCleansingCyclesFormResultProps = {
  result: CalculateCleansingCyclesReturnType;
  form: UseFormReturn<{
    duration: number;
    speed: number;
  }>;
};

export const CalculateCleansingCyclesFormResult = ({
  result,
  form
}: CalculateCleansingCyclesFormResultProps) => {
  const hasCleanedAllMentalLayers = result.minutesTo5Cycles === 0;
  const isOverextending = result.minutesTo5Cycles < 0;

  const isOkayToExerciseMore = !isOverextending && !hasCleanedAllMentalLayers;
  const isNotOkayToExerciseMore = isOverextending || hasCleanedAllMentalLayers;

  const isWalking = getIsWalking(form.getValues().speed);

  const duration = formatTime(form.getValues().duration);
  const timeTo5Cycles = formatTime(result.minutesTo5Cycles);
  const recommendedExerciseTime = formatTime(result.recommendedExerciseMinutes);

  return (
    <div data-testid="calculate-cleansing-cycles-form-result">
      <p>
        After {isWalking ? 'walking' : 'running'} for {duration}
      </p>
      <p>
        You will have{' '}
        {isNotOkayToExerciseMore ? 'all 5 of your' : result.completedCycles}{' '}
        mental layers cleaned
      </p>
      {isOkayToExerciseMore && (
        <>
          <p>
            You have to {isWalking ? 'walk' : 'run'}{' '}
            {result.minutesUntilNextCycle} minutes more to clean 1 more mental
            layer
          </p>
          <p>
            You will have to {isWalking ? 'walk' : 'run'} {timeTo5Cycles} more
            to clean all mental layers
          </p>
        </>
      )}
      {!isOverextending && (
        <p>
          It is recommended to do this exercise once every{' '}
          {result.recommendedFrequencyDays} days
        </p>
      )}
      {isOverextending && (
        <>
          <p>
            It is recommended to limit this exercise to{' '}
            {recommendedExerciseTime}.
          </p>
          <p>
            Avoid overexertion, excessive exercising can be counterproductive.
          </p>
        </>
      )}
    </div>
  );
};
