import { z } from 'zod';

import { speed } from '../../DynamicExerciseDurationFormFields/DynamicExerciseDurationFormFields.model';
import { duration } from '../../FormFields/FormFields.model';

export const CalculateCleansingCyclesFormModel = z.object({
  speed,
  duration
});

export type CalculateCleansingCyclesFormData = z.infer<
  typeof CalculateCleansingCyclesFormModel
>;
