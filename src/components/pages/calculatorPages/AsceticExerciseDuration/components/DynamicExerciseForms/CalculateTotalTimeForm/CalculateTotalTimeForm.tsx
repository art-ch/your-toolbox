import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CleansingCyclesField,
  SpeedField
} from '../DynamicExerciseDurationFormFields';
import { dynamicExerciseDurationCalculator } from '../../../services/DynamicExerciseDuration/DynamicExerciseDurationService';
import {
  CalculateTotalTimeFormData,
  CalculateTotalTimeFormModel
} from './CalculateTotalTimeForm.model';

export const CalculateTotalTimeForm = () => {
  const handleSubmit = (data: CalculateTotalTimeFormData) => {
    return dynamicExerciseDurationCalculator.calculateTotalTime(
      data.speed,
      data.cleansingCycles
    );
  };

  return (
    <CalculatorForm
      title="Calculate Total Time"
      formModel={CalculateTotalTimeFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <CleansingCyclesField form={form} name="cleansingCycles" />
          <SpeedField form={form} name="speed" />
        </>
      )}
      renderResult={(result, form) => (
        <div>
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Result:
          </h3>
          <div>
            You have to walk for {result} minutes to clean{' '}
            {form.getValues().cleansingCycles} mental layers at a speed of{' '}
            {form.getValues().speed} km/h
          </div>
        </div>
      )}
    />
  );
};
