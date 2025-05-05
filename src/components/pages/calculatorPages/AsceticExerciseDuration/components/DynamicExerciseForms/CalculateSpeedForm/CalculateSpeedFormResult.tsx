import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useMovementTranslation } from '../../../hooks/useMovementTranslation';
import { formatTime } from '@/utils/timeUtils';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('asceticExerciseDuration');

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
          duration: formatTime(form.getValues().duration, t)
        })}
      </p>
      {isSpeedHardToAchieve && <p>{t('speedHardToAchieve')}</p>}
    </div>
  );
};
