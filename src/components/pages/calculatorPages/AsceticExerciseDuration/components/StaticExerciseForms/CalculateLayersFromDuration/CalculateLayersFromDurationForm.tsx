import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CalculateLayersFromDurationFormData,
  CalculateLayersFromDurationFormModel
} from './CalculateLayersFromDurationForm.model';

import { CalculateLayersFromDurationFormResult } from './CalculateLayersFromDurationFormResult';
import { DurationField } from '../../FormFields';
import { staticExerciseDurationCalculator } from '../../../services/StaticExerciseDuration/StaticExerciseDurationService';

export const CalculateLayersFromDurationForm = () => {
  const handleSubmit = (data: CalculateLayersFromDurationFormData): number => {
    return staticExerciseDurationCalculator.calculateLayersFromDuration(
      data.duration
    );
  };

  return (
    <CalculatorForm
      title="Calculate Cleaned Mental Layers"
      subtitle="Calculate how many mental layers you will have cleaned if you sit in a seated asana pose or stand uninteruptedly for a certain amount of time"
      formModel={CalculateLayersFromDurationFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <DurationField
            form={form}
            name="duration"
            description="How many minutes you plan to sit or stand"
          />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateLayersFromDurationFormResult result={result} form={form} />
      )}
    />
  );
};
