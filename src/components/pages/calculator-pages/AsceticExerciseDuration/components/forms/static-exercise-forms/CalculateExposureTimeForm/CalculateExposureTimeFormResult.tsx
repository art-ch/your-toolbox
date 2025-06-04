import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formatTime } from '@/utils/i18n';
import { WaterExposureWarning } from '../../../WaterExposureWarning/WaterExposureWarning';
import { useTranslation } from 'react-i18next';
import { parseLanguage } from '@/utils/i18n/parseLanguage';

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
  const { t, i18n } = useTranslation('asceticExerciseDuration');

  const language = parseLanguage(i18n.language);

  const formattedDuration = formatTime({
    totalMinutes: result,
    t,
    language
  });
  const temperature = form.getValues().temperature;
  const mentalLayerAmount = t('mentalLayerAmount', {
    count: Number(form.getValues().mentalLayers)
  });

  return (
    <div data-testid="calculate-exposure-time-form-result">
      <p>
        {t('calculateExposureTimeResult1', {
          temperature,
          mentalLayerAmount
        })}
      </p>
      <p>
        {t('calculateExposureTimeResult2', { duration: formattedDuration })}
      </p>

      <WaterExposureWarning temperature={temperature} duration={result} />
    </div>
  );
};
