import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CleansingCyclesField,
  SpeedField
} from '../../DynamicExerciseDurationFormFields';
import { dynamicExerciseDurationCalculator } from '../../../services/DynamicExerciseDuration/DynamicExerciseDurationService';
import {
  CalculateTotalTimeFormData,
  CalculateTotalTimeFormModel
} from './CalculateTotalTimeForm.model';
import { CalculateTotalTimeFormResult } from './CalculateTotalTimeFormResult';

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
      subtitle="Calculate the time required to clean a specified number of mental layers while walking or running at a specified speed."
      formModel={CalculateTotalTimeFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <CleansingCyclesField form={form} name="cleansingCycles" />
          <SpeedField form={form} name="speed" />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateTotalTimeFormResult result={result} form={form} />
      )}
    />
  );
};
