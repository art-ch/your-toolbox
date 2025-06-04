import { formatTime } from '@/utils/i18n';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { WaterExposureWarning } from '../../../WaterExposureWarning/WaterExposureWarning';
import { useTranslation } from 'react-i18next';
import { durationCaseConfig } from './CalculateMentalLayersCleansedForm.config';
import { MENTAL_LAYER_AMOUNT } from '../../../../constants/contants';
import { parseLanguage } from '@/utils/i18n/parseLanguage';

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
  const { t, i18n } = useTranslation('asceticExerciseDuration');

  const language = parseLanguage(i18n.language);

  const duration = form.getValues().duration;
  const formattedDuration = formatTime({
    totalMinutes: duration,
    grammarCaseConfig: durationCaseConfig,
    t,
    language
  });
  const temperature = form.getValues().temperature;

  const allMentalLayersCleaned = result >= MENTAL_LAYER_AMOUNT;
  const isOverextending = result > MENTAL_LAYER_AMOUNT;

  const mentalLayerAmount = allMentalLayersCleaned
    ? t('allMentalLayers')
    : t('mentalLayerAmount', { count: result });

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
          mentalLayerAmount
        })}
      </p>
      {isOverextending && (
        <p>{t('calculateMentalLayersCleansedOverextending')}</p>
      )}
      <WaterExposureWarning temperature={temperature} duration={duration} />
    </div>
  );
};
