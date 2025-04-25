import { z } from 'zod';

import { mentalLayers } from '../../FormFields/FormFields.model';

export const CalculateDurationFromLayersFormModel = z.object({
  mentalLayers
});

export type CalculateDurationFromLayersFormData = z.infer<
  typeof CalculateDurationFromLayersFormModel
>;
