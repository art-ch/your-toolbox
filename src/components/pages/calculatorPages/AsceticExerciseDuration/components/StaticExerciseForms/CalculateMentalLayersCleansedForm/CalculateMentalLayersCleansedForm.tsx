import { CalculatorForm } from '@/components/CalculatorForm/CalculatorForm';
import {
  CalculateMentalLayersCleansedFormData,
  CalculateMentalLayersCleansedFormModel
} from './CalculateMentalLayersCleansedForm.model';
import { CalculateMentalLayersCleansedFormResult } from './CalculateMentalLayersCleansedFormResult';
import { DurationField } from '../../FormFields';

import { waterExposureDurationCalculator } from '../../../services/StaticExerciseDuration/WaterExposureDurationService';
import { TemperatureField } from '../../StaticExerciseDurationFormFields';
import { WATER_EXPOSURE_DURATION_FORM_FIELD_DESCRIPTION } from '../../../constants/StaticExercise.constants';

export const CalculateMentalLayersCleansedForm = () => {
  const handleSubmit = (
    data: CalculateMentalLayersCleansedFormData
  ): number => {
    return waterExposureDurationCalculator.calculateMentalLayersCleansed(
      data.temperature,
      data.duration
    );
  };

  return (
    <CalculatorForm
      title="Calculate Cleaned Mental Layers"
      subtitle="Calculate how many mental layers you will have cleaned if you sit still in a water with a certain temperature (°C) for a certain amount of time"
      formModel={CalculateMentalLayersCleansedFormModel}
      onSubmit={handleSubmit}
      renderFields={(form) => (
        <>
          <TemperatureField form={form} name="temperature" />
          <DurationField
            form={form}
            name="duration"
            description={WATER_EXPOSURE_DURATION_FORM_FIELD_DESCRIPTION}
          />
        </>
      )}
      renderResult={(result, form) => (
        <CalculateMentalLayersCleansedFormResult result={result} form={form} />
      )}
    />
  );
};
