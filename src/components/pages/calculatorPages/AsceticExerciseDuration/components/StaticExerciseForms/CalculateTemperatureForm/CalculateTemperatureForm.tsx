import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CalculateTemperatureFormData,
  CalculateTemperatureFormModel
} from './CalculateTemperatureForm.model';
import { CalculateTemperatureFormResult } from './CalculateTemperatureFormResult';
import { DurationField, MentalLayersField } from '../../FormFields';
import { waterExposureDurationCalculator } from '../../../services/StaticExerciseDuration/WaterExposureDurationService';
import { WATER_EXPOSURE_DURATION_FORM_FIELD_DESCRIPTION } from '../../../constants/StaticExercise.constants';

export const CalculateTemperatureForm = () => {
  const handleSubmit = (data: CalculateTemperatureFormData) => {
    return waterExposureDurationCalculator.calculateRequiredTemperature(
      data.mentalLayers,
      data.duration
    );
  };

  return (
    <CalculatorForm
      title="Calculate Temperature"
      subtitle="Calculate a water temperature to expose oneself to required to clean a specified number of mental layers."
      formModel={CalculateTemperatureFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <MentalLayersField form={form} name="mentalLayers" />
          <DurationField
            form={form}
            name="duration"
            description={WATER_EXPOSURE_DURATION_FORM_FIELD_DESCRIPTION}
          />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateTemperatureFormResult result={result} form={form} />
      )}
    />
  );
};
