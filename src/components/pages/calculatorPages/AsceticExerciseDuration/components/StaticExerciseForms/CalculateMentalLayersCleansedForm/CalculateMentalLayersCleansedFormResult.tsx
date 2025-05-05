import { formatTime } from '@/utils/timeUtils';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { WaterExposureWarning } from '../../WaterExposureWarning/WaterExposureWarning';
import { useTranslation } from 'react-i18next';

export type CalculateMentalLayersCleansedFormResultProps = {
  result: number;
  form: UseFormReturn<{
    duration: number;
    temperature: number;
  }>;
};

export const CalculateMentalLayersCleansedFormResult = ({
  result,
  form
}: CalculateMentalLayersCleansedFormResultProps) => {
  const { t } = useTranslation('asceticExerciseDuration');

  const duration = form.getValues().duration;
  const formattedDuration = formatTime(duration, t);
  const temperature = form.getValues().temperature;

  return (
    <div data-testid="calculate-mental-layers-cleansed-form-result">
      <p>
        {t('calculateMentalLayersCleansedResult1', {
          temperature,
          duration: formattedDuration
        })}
      </p>
      <p>
        {t('calculateMentalLayersCleansedResult2', {
          mentalLayerAmount: t('mentalLayerAmount', { count: result })
        })}
      </p>

      <WaterExposureWarning
        temperature={temperature}
        duration={duration}
        formattedDuration={formattedDuration}
      />
    </div>
  );
};
