import { z } from 'zod';

import { createDurationModel } from '../../../form-fields/FormFields/FormFields.model';

export const createCalculateLayersFromDurationFormModel = (
  t: (key: string) => string
) => {
  return z.object({
    duration: createDurationModel(t)
  });
};

export type CalculateLayersFromDurationFormData = z.infer<
  ReturnType<typeof createCalculateLayersFromDurationFormModel>
>;
