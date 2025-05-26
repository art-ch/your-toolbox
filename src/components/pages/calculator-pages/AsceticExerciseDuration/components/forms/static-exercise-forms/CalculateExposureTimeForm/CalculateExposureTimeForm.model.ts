import { z } from 'zod';

import { createMentalLayersModel } from '../../../form-fields/FormFields/FormFields.model';
import { createTemperatureModel } from '../../../form-fields/StaticExerciseDurationFormFields/StaticExerciseDurationFormFields.model';

export const createCalculateExposureTimeFormModel = (
  t: (key: string) => string
) => {
  return z.object({
    mentalLayers: createMentalLayersModel(t),
    temperature: createTemperatureModel(t)
  });
};

export type CalculateExposureTimeFormData = z.infer<
  ReturnType<typeof createCalculateExposureTimeFormModel>
>;
