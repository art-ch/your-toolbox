import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import { dynamicExerciseDurationCalculator } from '../../../services/DynamicExerciseDuration';
import {
  CalculateSpeedFormData,
  CalculateSpeedFormModel
} from './CalculateSpeedForm.model';
import { CalculateSpeedFormResult } from './CalculateSpeedFormResult';
import { DurationField, MentalLayersField } from '../../FormFields';
import { DYNAMIC_EXERCISE_DURATION_FORM_FIELD_DESCRIPTION_TRANSLATION_KEY } from '../../../constants/DynamicExercise.constants';
import { useTranslation } from 'react-i18next';

export const CalculateSpeedForm = () => {
  const { t } = useTranslation('asceticExerciseDuration');

  const handleSubmit = (data: CalculateSpeedFormData) => {
    return dynamicExerciseDurationCalculator.calculateSpeedFromCyclesAndTime(
      data.mentalLayers,
      data.duration
    );
  };

  return (
    <CalculatorForm
      title={t('calculateSpeedTitle')}
      subtitle={t('calculateSpeedSubtitle')}
      formModel={CalculateSpeedFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <MentalLayersField form={form} name="mentalLayers" />
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
        <CalculateSpeedFormResult result={result} form={form} />
      )}
    />
  );
};
