import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CleansingCyclesField,
  DurationField
} from '../DynamicExerciseDurationFormFields';
import { dynamicExerciseDurationCalculator } from '../../../services/DynamicExerciseDuration/DynamicExerciseDurationService';
import {
  CalculateSpeedFormData,
  CalculateSpeedFormModel
} from './CalculateSpeedForm.model';

export const CalculateSpeedForm = () => {
  const handleSubmit = (data: CalculateSpeedFormData) => {
    return dynamicExerciseDurationCalculator.calculateSpeedFromCyclesAndTime(
      data.cleansingCycles,
      data.duration
    );
  };

  return (
    <CalculatorForm
      title="Calculate Speed"
      formModel={CalculateSpeedFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <CleansingCyclesField form={form} name="cleansingCycles" />
          <DurationField form={form} name="duration" />
        </>
      )}
      renderResult={(result, form) => (
        <div>
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Result:
          </h3>
          <div>
            You need to walk with the speed of {result} km/h to clean{' '}
            {form.getValues().cleansingCycles} mental layers in{' '}
            {form.getValues().duration} minutes
          </div>
        </div>
      )}
    />
  );
};
