'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useMovementTranslation } from '../../../hooks/useMovementTranslation';
import { formatTime } from '@/utils/timeUtils';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('asceticExerciseDuration');

  const { baseMovementTranslation } = useMovementTranslation(
    form.getValues().speed
  );

  const totalTime = formatTime(result, t);

  return (
    <p data-testid="calculate-total-time-form-result">
      {t('calculateTotalTimeResult', {
        movement: baseMovementTranslation,
        totalTime,
        mentalLayerAmount: t('mentalLayerAmount', {
          count: Number(form.getValues().mentalLayers)
        }),
        speed: form.getValues().speed
      })}
    </p>
  );
};
