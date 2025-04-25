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
import { DYNAMIC_EXERCISE_DURATION_FORM_FIELD_DESCRIPTION } from '../../../constants/DynamicExercise.constants';

export const CalculateCleansingCyclesForm = () => {
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
      title="Calculate Cleaned Mental Layers"
      subtitle="Calculate how many mental layers you will have cleaned if you walk or run uninteruptedly at a set speed for a certain amount of time"
      formModel={CalculateCleansingCyclesFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <SpeedField form={form} name="speed" />
          <DurationField
            form={form}
            name="duration"
            description={DYNAMIC_EXERCISE_DURATION_FORM_FIELD_DESCRIPTION}
          />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateCleansingCyclesFormResult result={result} form={form} />
      )}
    />
  );
};
