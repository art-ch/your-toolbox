'use client';

import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import { SpeedField } from '../../../form-fields/DynamicExerciseDurationFormFields';
import { dynamicExerciseDurationCalculator } from '../../../../services/DynamicExerciseDuration';
import {
  CalculateTotalTimeFormData,
  createCalculateTotalTimeFormModel
} from './CalculateTotalTimeForm.model';
import { CalculateTotalTimeFormResult } from './CalculateTotalTimeFormResult';
import { MentalLayersField } from '../../../form-fields/FormFields';
import { useTranslation } from 'react-i18next';

export const CalculateTotalTimeForm = () => {
  const { t } = useTranslation('asceticExerciseDuration');

  const handleSubmit = (data: CalculateTotalTimeFormData) => {
    return dynamicExerciseDurationCalculator.calculateTotalTime(
      data.speed,
      data.mentalLayers
    );
  };

  return (
    <CalculatorForm
      title={t('calculateTotalTimeTitle')}
      subtitle={t('calculateTotalTimeSubtitle')}
      formModel={createCalculateTotalTimeFormModel(t)}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <MentalLayersField form={form} name="mentalLayers" />
          <SpeedField form={form} name="speed" />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateTotalTimeFormResult result={result} form={form} />
      )}
    />
  );
};
