'use client';

import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import { SpeedField } from '../../DynamicExerciseDurationFormFields';
import { dynamicExerciseDurationCalculator } from '../../../services/DynamicExerciseDuration';
import {
  CalculateTotalTimeFormData,
  CalculateTotalTimeFormModel
} from './CalculateTotalTimeForm.model';
import { CalculateTotalTimeFormResult } from './CalculateTotalTimeFormResult';
import { MentalLayersField } from '../../FormFields';
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
      formModel={CalculateTotalTimeFormModel}
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
