import { z } from 'zod';

import { createSpeedModel } from '../../../form-fields/DynamicExerciseDurationFormFields/DynamicExerciseDurationFormFields.model';
import { createDurationModel } from '../../../form-fields/FormFields/FormFields.model';

export const createCalculateCleansingCyclesFormModel = (
  t: (key: string) => string
) => {
  return z.object({
    speed: createSpeedModel(t),
    duration: createDurationModel(t)
  });
};

export type CalculateCleansingCyclesFormData = z.infer<
  ReturnType<typeof createCalculateCleansingCyclesFormModel>
>;
