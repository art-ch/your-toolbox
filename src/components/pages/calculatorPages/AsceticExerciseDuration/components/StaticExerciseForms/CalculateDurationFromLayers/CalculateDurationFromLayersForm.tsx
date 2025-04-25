import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CalculateDurationFromLayersFormData,
  CalculateDurationFromLayersFormModel
} from './CalculateDurationFromLayersForm.model';

import { CalculateDurationFromLayersFormResult } from './CalculateDurationFromLayersFormResult';
import { MentalLayersField } from '../../FormFields';
import { staticExerciseDurationCalculator } from '../../../services/StaticExerciseDuration/StaticExerciseDurationService';

export const CalculateDurationFromLayersForm = () => {
  const handleSubmit = (data: CalculateDurationFromLayersFormData): number => {
    return staticExerciseDurationCalculator.calculateDurationFromLayers(
      data.mentalLayers
    );
  };

  return (
    <CalculatorForm
      title="Calculate Duration"
      subtitle="Calculate how long you have to sit in a seated asana pose or stand uninteruptedly to clean a certain amount of mental layers"
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
