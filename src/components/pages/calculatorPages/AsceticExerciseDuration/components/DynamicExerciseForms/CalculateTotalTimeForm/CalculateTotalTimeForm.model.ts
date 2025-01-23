import { z } from 'zod';

import {
  cleansingCycles,
  speed
} from '../../DynamicExerciseDurationFormFields/DynamicExerciseDurationFormFields.model';

export const CalculateTotalTimeFormModel = z.object({
  cleansingCycles,
  speed
});

export type CalculateTotalTimeFormData = z.infer<
  typeof CalculateTotalTimeFormModel
>;
