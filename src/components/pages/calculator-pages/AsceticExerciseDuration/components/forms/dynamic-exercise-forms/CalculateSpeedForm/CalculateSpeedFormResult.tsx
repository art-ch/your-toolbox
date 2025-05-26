import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useMovementTranslation } from '../../../../hooks/useMovementTranslation';
import { formatTime } from '@/utils/i18n';
import { useTranslation } from 'react-i18next';
import { durationCaseConfig } from './CalculateSpeedForm.config';

export type CalculateSpeedFormResultProps = {
  result: number;
  form: UseFormReturn<{
    mentalLayers: number;
    duration: number;
  }>;
};

export const CalculateSpeedFormResult = ({
  result,
  form
}: CalculateSpeedFormResultProps) => {
  const { t, i18n } = useTranslation('asceticExerciseDuration');

  const { baseMovementTranslation } = useMovementTranslation(result);

  const isSpeedHardToAchieve = result > 45;

  return (
    <div data-testid="calculate-speed-form-result">
      <p>
        {t('calculateSpeedResult', {
          speed: result,
          movement: baseMovementTranslation,
          mentalLayerAmount: t('mentalLayerAmount', {
            count: Number(form.getValues().mentalLayers)
          }),
          duration: formatTime({
            totalMinutes: form.getValues().duration,
            grammarCaseConfig: durationCaseConfig,
            t,
            language: i18n.language
          })
        })}
      </p>
      {isSpeedHardToAchieve && <p>{t('speedHardToAchieve')}</p>}
    </div>
  );
};
