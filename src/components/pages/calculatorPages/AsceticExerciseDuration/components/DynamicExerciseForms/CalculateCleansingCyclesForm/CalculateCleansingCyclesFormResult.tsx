'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CalculateCleansingCyclesReturnType } from '../../../services/DynamicExerciseDuration';
import { useMovementTranslation } from '../../../hooks/useMovementTranslation';
import { formatTime } from '@/utils/timeUtils';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('asceticExerciseDuration');

  const { baseMovementTranslation, gerundMovementTranslation } =
    useMovementTranslation(form.getValues().speed);

  const hasCleanedAllMentalLayers = result.minutesTo5Cycles === 0;
  const isOverextending = result.minutesTo5Cycles < 0;

  const isOkayToExerciseMore = !isOverextending && !hasCleanedAllMentalLayers;
  const isNotOkayToExerciseMore = isOverextending || hasCleanedAllMentalLayers;

  const duration = formatTime(form.getValues().duration, t);
  const timeTo5Cycles = formatTime(result.minutesTo5Cycles, t);
  const timeToNextCycle = formatTime(result.minutesUntilNextCycle, t);
  const recommendedExerciseTime = formatTime(
    result.recommendedExerciseMinutes,
    t
  );

  return (
    <div data-testid="calculate-cleansing-cycles-form-result">
      <p>
        {t('movedForDuration', {
          movement: gerundMovementTranslation,
          duration
        })}
      </p>
      <p>
        {t('movedForDurationResult', {
          mentalLayerAmount: isNotOkayToExerciseMore
            ? t('allMentalLayers')
            : t('mentalLayerAmount', { count: result.completedCycles })
        })}
      </p>
      {isOkayToExerciseMore && (
        <>
          <p>
            {t('okayToExerciseMore1', {
              movement: baseMovementTranslation,
              timeToNextCycle
            })}
          </p>
          <p>
            {t('okayToExerciseMore2', {
              movement: baseMovementTranslation,
              timeTo5Cycles
            })}
          </p>
        </>
      )}
      {!isOverextending && (
        <p>
          {t('recommendedExerciseTime', {
            recommendedFrequencyDays: result.recommendedFrequencyDays
          })}
        </p>
      )}
      {isOverextending && (
        <>
          <p>
            {t('recommendedExerciseTimeOverextended1', {
              recommendedExerciseTime
            })}
          </p>
          <p>{t('recommendedExerciseTimeOverextended2')}</p>
        </>
      )}
    </div>
  );
};
