import { z } from 'zod';

import {
  speed,
  duration
} from '../../DynamicExerciseDurationFormFields/DynamicExerciseDurationFormFields.model';

export const CalculateCleansingCyclesFormModel = z.object({
  speed,
  duration
});

export type CalculateCleansingCyclesFormData = z.infer<
  typeof CalculateCleansingCyclesFormModel
>;
