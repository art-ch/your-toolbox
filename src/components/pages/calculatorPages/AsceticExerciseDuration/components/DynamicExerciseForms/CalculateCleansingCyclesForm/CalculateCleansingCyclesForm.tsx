'use client';

import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import { SpeedField } from '../../DynamicExerciseDurationFormFields';
import {
  CalculateCleansingCyclesFormData,
  CalculateCleansingCyclesFormModel
} from './CalculateCleansingCyclesForm.model';
import {
  CalculateCleansingCyclesReturnType,
  dynamicExerciseDurationCalculator
} from '../../../services/DynamicExerciseDuration';
import { CalculateCleansingCyclesFormResult } from './CalculateCleansingCyclesFormResult';
import { DurationField } from '../../FormFields';
import { DYNAMIC_EXERCISE_DURATION_FORM_FIELD_DESCRIPTION_TRANSLATION_KEY } from '../../../constants/DynamicExercise.constants';
import { useTranslation } from 'react-i18next';

export const CalculateCleansingCyclesForm = () => {
  const { t } = useTranslation('asceticExerciseDuration');

  const handleSubmit = (
    data: CalculateCleansingCyclesFormData
  ): CalculateCleansingCyclesReturnType => {
    return dynamicExerciseDurationCalculator.calculateCleansingCycles(
      data.speed,
      data.duration
    );
  };

  return (
    <CalculatorForm
      title={t('calculateCleanedMentalLayersTitle')}
      subtitle={t('calculateCleanedMentalLayersSubtitle')}
      formModel={CalculateCleansingCyclesFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <SpeedField form={form} name="speed" />
          <DurationField
            form={form}
            name="duration"
            description={t(
              DYNAMIC_EXERCISE_DURATION_FORM_FIELD_DESCRIPTION_TRANSLATION_KEY
            )}
          />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateCleansingCyclesFormResult result={result} form={form} />
      )}
    />
  );
};
