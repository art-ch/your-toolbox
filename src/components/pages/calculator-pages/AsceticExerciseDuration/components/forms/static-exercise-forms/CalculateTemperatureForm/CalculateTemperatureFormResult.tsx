import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { formatTime } from '@/utils/i18n';
import { WaterExposureWarning } from '../../../WaterExposureWarning/WaterExposureWarning';
import { useTranslation } from 'react-i18next';
import { durationCaseConfig } from './CalculateTemperatureForm.config';
import { parseLanguage } from '@/utils/i18n/parseLanguage';

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
  const { t, i18n } = useTranslation('asceticExerciseDuration');

  const language = parseLanguage(i18n.language);

  const duration = form.getValues().duration;
  const formattedDuration = formatTime({
    totalMinutes: duration,
    grammarCaseConfig: durationCaseConfig,
    t,
    language
  });
  const mentalLayerAmount = t('mentalLayerAmount', {
    count: Number(form.getValues().mentalLayers)
  });

  return (
    <div data-testid="calculate-temperature-form-result">
      <p>
        {t('calculateTemperatureResult1', {
          mentalLayerAmount,
          duration: formattedDuration
        })}
      </p>
      <p>{t('calculateTemperatureResult2', { temperature: result })}</p>

      <WaterExposureWarning temperature={result} duration={duration} />
    </div>
  );
};
