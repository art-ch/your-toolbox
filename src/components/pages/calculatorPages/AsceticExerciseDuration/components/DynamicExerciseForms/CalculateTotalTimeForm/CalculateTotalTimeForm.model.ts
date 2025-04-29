import { z } from 'zod';

import { speed } from '../../DynamicExerciseDurationFormFields/DynamicExerciseDurationFormFields.model';
import { mentalLayers } from '../../FormFields/FormFields.model';

export const CalculateTotalTimeFormModel = z.object({
  mentalLayers,
  speed
});

export type CalculateTotalTimeFormData = z.infer<
  typeof CalculateTotalTimeFormModel
>;
