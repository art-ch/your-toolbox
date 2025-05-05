'use client';

import { formatTime } from '@/utils/timeUtils';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export type CalculateDurationFromLayersFormResultProps = {
  result: number;
  form: UseFormReturn<{
    mentalLayers: number;
  }>;
};

export const CalculateDurationFromLayersFormResult = ({
  result,
  form
}: CalculateDurationFromLayersFormResultProps) => {
  const { t } = useTranslation('asceticExerciseDuration');

  const duration = formatTime(result, t);

  return (
    <div data-testid="calculate-duration-from-layers-form-result">
      <p>
        {t('calculateDurationFromLayersResult1', {
          mentalLayerAmount: Number(form.getValues().mentalLayers)
        })}
      </p>
      <p>{t('calculateDurationFromLayersResult2', { duration })}</p>
    </div>
  );
};
