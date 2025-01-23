import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CleansingCyclesField,
  DurationField
} from '../../DynamicExerciseDurationFormFields';
import { dynamicExerciseDurationCalculator } from '../../../services/DynamicExerciseDuration/DynamicExerciseDurationService';
import {
  CalculateSpeedFormData,
  CalculateSpeedFormModel
} from './CalculateSpeedForm.model';
import { CalculateSpeedFormResult } from './CalculateSpeedFormResult';

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
      subtitle="Calculate the speed required to clean a specified number of mental layers while walking or running for a specified amount of time."
      formModel={CalculateSpeedFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <CleansingCyclesField form={form} name="cleansingCycles" />
          <DurationField form={form} name="duration" />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateSpeedFormResult result={result} form={form} />
      )}
    />
  );
};
