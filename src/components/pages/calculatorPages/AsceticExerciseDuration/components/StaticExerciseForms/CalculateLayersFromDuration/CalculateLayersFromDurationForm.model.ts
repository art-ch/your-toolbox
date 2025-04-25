import { z } from 'zod';

import { duration } from '../../FormFields/FormFields.model';

export const CalculateLayersFromDurationFormModel = z.object({
  duration
});

export type CalculateLayersFromDurationFormData = z.infer<
  typeof CalculateLayersFromDurationFormModel
>;
