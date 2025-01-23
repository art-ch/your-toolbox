import { z } from 'zod';

import {
  cleansingCycles,
  duration
} from '../../DynamicExerciseDurationFormFields/DynamicExerciseDurationFormFields.model';

export const CalculateSpeedFormModel = z.object({
  cleansingCycles,
  duration
});

export type CalculateSpeedFormData = z.infer<typeof CalculateSpeedFormModel>;
