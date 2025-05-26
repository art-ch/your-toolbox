import { z } from 'zod';

import { createDurationModel } from '../../../form-fields/FormFields/FormFields.model';
import { createTemperatureModel } from '../../../form-fields/StaticExerciseDurationFormFields/StaticExerciseDurationFormFields.model';

export const createCalculateMentalLayersCleansedFormModel = (
  t: (key: string) => string
) => {
  return z.object({
    temperature: createTemperatureModel(t),
    duration: createDurationModel(t)
  });
};

export type CalculateMentalLayersCleansedFormData = z.infer<
  ReturnType<typeof createCalculateMentalLayersCleansedFormModel>
>;
