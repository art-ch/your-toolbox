'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useMovementTranslation } from '../../../../hooks/useMovementTranslation';
import { formatTime } from '@/utils/i18n';
import { useTranslation } from 'react-i18next';
import { totalTimeCaseConfig } from './CalculateTotalTimeForm.config';

export type CalculateTotalTimeFormResultProps = {
  result: number;
  form: UseFormReturn<{
    mentalLayers: number;
    speed: number;
  }>;
};

export const CalculateTotalTimeFormResult = ({
  result,
  form
}: CalculateTotalTimeFormResultProps) => {
  const { t, i18n } = useTranslation('asceticExerciseDuration');

  const speed = form.getValues().speed;

  const { baseMovementTranslation } = useMovementTranslation(speed);

  const totalTime = formatTime({
    totalMinutes: result,
    grammarCaseConfig: totalTimeCaseConfig,
    t,
    language: i18n.language
  });

  const mentalLayerAmount = t('mentalLayerAmount', {
    count: Number(form.getValues().mentalLayers)
  });

  return (
    <p data-testid="calculate-total-time-form-result">
      {t('calculateTotalTimeResult', {
        movement: baseMovementTranslation,
        totalTime,
        mentalLayerAmount,
        speed
      })}
    </p>
  );
};
