import { z } from 'zod';

import { createSpeedModel } from '../../../form-fields/DynamicExerciseDurationFormFields/DynamicExerciseDurationFormFields.model';
import { createMentalLayersModel } from '../../../form-fields/FormFields/FormFields.model';

export const createCalculateTotalTimeFormModel = (
  t: (key: string) => string
) => {
  return z.object({
    mentalLayers: createMentalLayersModel(t),
    speed: createSpeedModel(t)
  });
};

export type CalculateTotalTimeFormData = z.infer<
  ReturnType<typeof createCalculateTotalTimeFormModel>
>;
