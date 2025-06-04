import { z } from 'zod';

import { createMentalLayersModel } from '../../../form-fields/FormFields/FormFields.model';

export const createCalculateDurationFromLayersFormModel = (
  t: (key: string) => string
) => {
  return z.object({
    mentalLayers: createMentalLayersModel(t)
  });
};

export type CalculateDurationFromLayersFormData = z.infer<
  ReturnType<typeof createCalculateDurationFromLayersFormModel>
>;
