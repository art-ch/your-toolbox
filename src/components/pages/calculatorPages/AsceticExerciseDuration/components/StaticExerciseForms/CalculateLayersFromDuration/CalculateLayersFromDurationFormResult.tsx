'use client';

import { formatTime } from '@/utils/timeUtils';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export type CalculateLayersFromDurationFormResultProps = {
  result: number;
  form: UseFormReturn<{
    duration: number;
  }>;
};

export const CalculateLayersFromDurationFormResult = ({
  result,
  form
}: CalculateLayersFromDurationFormResultProps) => {
  const { t } = useTranslation('asceticExerciseDuration');

  const duration = formatTime(form.getValues().duration, t);

  return (
    <div data-testid="calculate-layers-from-duration-form-result">
      <p>{t('calculateLayersFromDurationResult1', { duration })}</p>
      <p>
        {t('calculateLayersFromDurationResult2', {
          mentalLayerAmount: t('mentalLayerAmount', { count: result })
        })}
      </p>
    </div>
  );
};
