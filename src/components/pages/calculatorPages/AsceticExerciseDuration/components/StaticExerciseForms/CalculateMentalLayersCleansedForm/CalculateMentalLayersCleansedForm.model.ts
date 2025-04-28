import { z } from 'zod';

import { duration } from '../../FormFields/FormFields.model';
import { temperature } from '../../StaticExerciseDurationFormFields/StaticExerciseDurationFormFields.model';

export const CalculateMentalLayersCleansedFormModel = z.object({
  temperature,
  duration
});

export type CalculateMentalLayersCleansedFormData = z.infer<
  typeof CalculateMentalLayersCleansedFormModel
>;
