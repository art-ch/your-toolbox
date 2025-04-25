import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import { dynamicExerciseDurationCalculator } from '../../../services/DynamicExerciseDuration';
import {
  CalculateSpeedFormData,
  CalculateSpeedFormModel
} from './CalculateSpeedForm.model';
import { CalculateSpeedFormResult } from './CalculateSpeedFormResult';
import { DurationField, MentalLayersField } from '../../FormFields';
import { DYNAMIC_EXERCISE_DURATION_FORM_FIELD_DESCRIPTION } from '../../../constants/DynamicExercise.constants';

export const CalculateSpeedForm = () => {
  const handleSubmit = (data: CalculateSpeedFormData) => {
    return dynamicExerciseDurationCalculator.calculateSpeedFromCyclesAndTime(
      data.mentalLayers,
      data.duration
    );
  };

  return (
    <CalculatorForm
      title="Calculate Speed"
      subtitle="Calculate the speed required to clean a specified number of mental layers while walking or running for a specified amount of time."
      formModel={CalculateSpeedFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <MentalLayersField form={form} name="mentalLayers" />
          <DurationField
            form={form}
            name="duration"
            description={DYNAMIC_EXERCISE_DURATION_FORM_FIELD_DESCRIPTION}
          />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateSpeedFormResult result={result} form={form} />
      )}
    />
  );
};
