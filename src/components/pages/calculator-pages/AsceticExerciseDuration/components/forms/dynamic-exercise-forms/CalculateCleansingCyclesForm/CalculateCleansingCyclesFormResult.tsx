'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { CalculateCleansingCyclesReturnType } from '../../../../services/DynamicExerciseDuration';
import { useMovementTranslation } from '../../../../hooks/useMovementTranslation';
import { formatDays, formatTime } from '@/utils/i18n';
import { useTranslation } from 'react-i18next';
import {
  durationCaseConfig,
  timeTo5CyclesCaseConfig,
  timeToNextCycleCaseConfig
} from './CalculateCleansingCyclesForm.config';
import { parseLanguage } from '@/utils/i18n/parseLanguage';

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
  const { t, i18n } = useTranslation('asceticExerciseDuration');

  const language = parseLanguage(i18n.language);

  const { baseMovementTranslation, gerundMovementTranslation } =
    useMovementTranslation(form.getValues().speed);

  const hasCleanedAllMentalLayers = result.minutesTo5Cycles === 0;
  const isOverextending = result.minutesTo5Cycles < 0;

  const isOkayToExerciseMore = !isOverextending && !hasCleanedAllMentalLayers;
  const isNotOkayToExerciseMore = isOverextending || hasCleanedAllMentalLayers;

  const duration = formatTime({
    totalMinutes: form.getValues().duration,
    grammarCaseConfig: durationCaseConfig,
    t,
    language
  });
  const timeToNextCycle = formatTime({
    totalMinutes: result.minutesUntilNextCycle,
    grammarCaseConfig: timeToNextCycleCaseConfig,
    t,
    language
  });
  const timeTo5Cycles = formatTime({
    totalMinutes: result.minutesTo5Cycles,
    grammarCaseConfig: timeTo5CyclesCaseConfig,
    t,
    language
  });
  const recommendedFrequencyDays = formatDays(
    result.recommendedFrequencyDays,
    t
  );
  const recommendedExerciseTime = formatTime({
    totalMinutes: result.recommendedExerciseMinutes,
    t,
    language
  });
  const mentalLayerAmount = isNotOkayToExerciseMore
    ? t('allMentalLayers')
    : t('mentalLayerAmount', { count: result.completedCycles });
  const onceEveryTranslation =
    result.recommendedFrequencyDays === 1 ? '' : t('time:onceEvery');

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
          mentalLayerAmount
        })}
      </p>
      {!isOverextending && (
        <p>
          {t('recommendedExerciseTime', {
            onceEvery: onceEveryTranslation,
            recommendedFrequencyDays
          })}
        </p>
      )}
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
