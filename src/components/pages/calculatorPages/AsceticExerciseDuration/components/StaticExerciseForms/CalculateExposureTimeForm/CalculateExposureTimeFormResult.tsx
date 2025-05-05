import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formatTime } from '@/utils/timeUtils';
import { WaterExposureWarning } from '../../WaterExposureWarning/WaterExposureWarning';
import { useTranslation } from 'react-i18next';

export type CalculateExposureTimeFormResultProps = {
  result: number;
  form: UseFormReturn<{
    mentalLayers: number;
    temperature: number;
  }>;
};

export const CalculateExposureTimeFormResult = ({
  result,
  form
}: CalculateExposureTimeFormResultProps) => {
  const { t } = useTranslation('asceticExerciseDuration');

  const formattedDuration = formatTime(result, t);
  const temperature = form.getValues().temperature;

  return (
    <div data-testid="calculate-exposure-time-form-result">
      <p>
        {t('calculateExposureTimeResult1', {
          temperature: form.getValues().temperature,
          mentalLayerAmount: t('mentalLayerAmount', {
            count: Number(form.getValues().mentalLayers)
          })
        })}
      </p>
      <p>
        {t('calculateExposureTimeResult2', { duration: formattedDuration })}
      </p>

      <WaterExposureWarning
        temperature={temperature}
        duration={result}
        formattedDuration={formattedDuration}
      />
    </div>
  );
};
