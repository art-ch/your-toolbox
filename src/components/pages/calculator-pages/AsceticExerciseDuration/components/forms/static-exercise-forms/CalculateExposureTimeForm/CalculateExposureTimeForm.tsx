'use client';

import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CalculateExposureTimeFormData,
  createCalculateExposureTimeFormModel
} from './CalculateExposureTimeForm.model';
import { CalculateExposureTimeFormResult } from './CalculateExposureTimeFormResult';
import { MentalLayersField } from '../../../form-fields/FormFields';
import { waterExposureDurationCalculator } from '../../../../services/StaticExerciseDuration/WaterExposureDurationService';
import { TemperatureField } from '../../../form-fields/StaticExerciseDurationFormFields';
import { useTranslation } from 'react-i18next';

export const CalculateExposureTimeForm = () => {
  const { t } = useTranslation('asceticExerciseDuration');

  const handleSubmit = (data: CalculateExposureTimeFormData) => {
    return waterExposureDurationCalculator.calculateTotalExposureTime(
      data.temperature,
      data.mentalLayers
    );
  };

  return (
    <CalculatorForm
      title={t('calculateExposureTimeTitle')}
      subtitle={t('calculateExposureTimeSubtitle')}
      formModel={createCalculateExposureTimeFormModel(t)}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <MentalLayersField form={form} name="mentalLayers" />
          <TemperatureField form={form} name="temperature" />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateExposureTimeFormResult result={result} form={form} />
      )}
    />
  );
};
