import { z } from 'zod';

import { mentalLayers } from '../../FormFields/FormFields.model';
import { temperature } from '../../StaticExerciseDurationFormFields/StaticExerciseDurationFormFields.model';

export const CalculateExposureTimeFormModel = z.object({
  mentalLayers,
  temperature
});

export type CalculateExposureTimeFormData = z.infer<
  typeof CalculateExposureTimeFormModel
>;
