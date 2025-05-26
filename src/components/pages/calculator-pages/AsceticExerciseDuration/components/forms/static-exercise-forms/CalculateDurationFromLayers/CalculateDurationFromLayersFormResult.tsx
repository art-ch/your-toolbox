'use client';

import { formatTime } from '@/utils/i18n';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { durationCaseConfig } from './СalculateDurationFromLayers.config';

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
  const { t, i18n } = useTranslation('asceticExerciseDuration');

  const duration = formatTime({
    totalMinutes: result,
    grammarCaseConfig: durationCaseConfig,
    t,
    language: i18n.language
  });

  const mentalLayerAmount = t('mentalLayerAmount', {
    count: Number(form.getValues().mentalLayers)
  });

  return (
    <div data-testid="calculate-duration-from-layers-form-result">
      <p>
        {t('calculateDurationFromLayersResult1', {
          mentalLayerAmount
        })}
      </p>
      <p>{t('calculateDurationFromLayersResult2', { duration })}</p>
    </div>
  );
};
