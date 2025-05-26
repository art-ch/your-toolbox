'use client';

import { formatTime } from '@/utils/i18n';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MENTAL_LAYER_AMOUNT } from '../../../../constants/contants';
import { durationCaseConfig } from './CalculateLayersFromDurationForm.config';

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
  const { t, i18n } = useTranslation('asceticExerciseDuration');

  const duration = formatTime({
    totalMinutes: form.getValues().duration,
    grammarCaseConfig: durationCaseConfig,
    t,
    language: i18n.language
  });

  const allMentalLayersCleaned = result >= MENTAL_LAYER_AMOUNT;
  const isOverextending = result > MENTAL_LAYER_AMOUNT;

  const mentalLayerAmount = allMentalLayersCleaned
    ? t('allMentalLayers')
    : t('mentalLayerAmount', { count: result });

  return (
    <div data-testid="calculate-layers-from-duration-form-result">
      <p>{t('calculateLayersFromDurationResult1', { duration })}</p>
      <p>
        {t('calculateLayersFromDurationResult2', {
          mentalLayerAmount
        })}
        {isOverextending && (
          <p>{t('calculateLayersFromDurationOverextending')}</p>
        )}
      </p>
    </div>
  );
};
