import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import { SpeedField } from '../../DynamicExerciseDurationFormFields';
import { dynamicExerciseDurationCalculator } from '../../../services/DynamicExerciseDuration';
import {
  CalculateTotalTimeFormData,
  CalculateTotalTimeFormModel
} from './CalculateTotalTimeForm.model';
import { CalculateTotalTimeFormResult } from './CalculateTotalTimeFormResult';
import { MentalLayersField } from '../../FormFields';

export const CalculateTotalTimeForm = () => {
  const handleSubmit = (data: CalculateTotalTimeFormData) => {
    return dynamicExerciseDurationCalculator.calculateTotalTime(
      data.speed,
      data.mentalLayers
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
          <MentalLayersField form={form} name="mentalLayers" />
          <SpeedField form={form} name="speed" />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateTotalTimeFormResult result={result} form={form} />
      )}
    />
  );
};
