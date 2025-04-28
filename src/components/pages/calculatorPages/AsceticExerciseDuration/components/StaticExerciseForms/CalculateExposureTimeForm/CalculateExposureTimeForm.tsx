import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CalculateExposureTimeFormData,
  CalculateExposureTimeFormModel
} from './CalculateExposureTimeForm.model';
import { CalculateExposureTimeFormResult } from './CalculateExposureTimeFormResult';
import { MentalLayersField } from '../../FormFields';
import { waterExposureDurationCalculator } from '../../../services/StaticExerciseDuration/WaterExposureDurationService';
import { TemperatureField } from '../../StaticExerciseDurationFormFields';

export const CalculateExposureTimeForm = () => {
  const handleSubmit = (data: CalculateExposureTimeFormData) => {
    return waterExposureDurationCalculator.calculateTotalExposureTime(
      data.temperature,
      data.mentalLayers
    );
  };

  return (
    <CalculatorForm
      title="Calculate Exposure Time"
      subtitle="Calculate the time required to clean a specified number of mental layers while sitting in a water with specified temperature (°C)."
      formModel={CalculateExposureTimeFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <MentalLayersField form={form} name="mentalLayers" />
          <TemperatureField form={form} name="temperature" />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateExposureTimeFormResult result={result} form={form} />
      )}
    />
  );
};
