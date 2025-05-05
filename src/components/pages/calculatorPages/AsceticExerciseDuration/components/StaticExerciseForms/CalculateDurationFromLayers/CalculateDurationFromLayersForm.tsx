'use client';

import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CalculateDurationFromLayersFormData,
  CalculateDurationFromLayersFormModel
} from './CalculateDurationFromLayersForm.model';

import { CalculateDurationFromLayersFormResult } from './CalculateDurationFromLayersFormResult';
import { MentalLayersField } from '../../FormFields';
import { staticExerciseDurationCalculator } from '../../../services/StaticExerciseDuration/StaticExerciseDurationService';
import { useTranslation } from 'react-i18next';

export const CalculateDurationFromLayersForm = () => {
  const { t } = useTranslation('asceticExerciseDuration');

  const handleSubmit = (data: CalculateDurationFromLayersFormData): number => {
    return staticExerciseDurationCalculator.calculateDurationFromLayers(
      data.mentalLayers
    );
  };

  return (
    <CalculatorForm
      title={t('calculateDurationFromLayersTitle')}
      subtitle={t('calculateDurationFromLayersSubtitle')}
      formModel={CalculateDurationFromLayersFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <MentalLayersField form={form} name="mentalLayers" />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateDurationFromLayersFormResult result={result} form={form} />
      )}
    />
  );
};
