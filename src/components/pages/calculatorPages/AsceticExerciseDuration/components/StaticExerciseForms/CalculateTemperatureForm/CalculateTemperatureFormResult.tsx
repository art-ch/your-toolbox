import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formatTime } from '@/utils/timeUtils';
import { WaterExposureWarning } from '../../WaterExposureWarning/WaterExposureWarning';
import { useTranslation } from 'react-i18next';

export type CalculateTemperatureFormResultProps = {
  result: number;
  form: UseFormReturn<{
    mentalLayers: number;
    duration: number;
  }>;
};

export const CalculateTemperatureFormResult = ({
  result,
  form
}: CalculateTemperatureFormResultProps) => {
  const { t } = useTranslation('asceticExerciseDuration');

  const duration = form.getValues().duration;
  const formattedDuration = formatTime(duration, t);

  return (
    <div data-testid="calculate-temperature-form-result">
      <p>
        {t('calculateTemperatureResult1', {
          mentalLayers: Number(form.getValues().mentalLayers),
          duration: formattedDuration
        })}
      </p>
      <p>{t('calculateTemperatureResult2', { temperature: result })}</p>

      <WaterExposureWarning
        temperature={result}
        duration={duration}
        formattedDuration={formattedDuration}
      />
    </div>
  );
};
