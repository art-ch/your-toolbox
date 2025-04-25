import { z } from 'zod';
import { duration, mentalLayers } from '../../FormFields/FormFields.model';

export const CalculateSpeedFormModel = z.object({
  mentalLayers,
  duration
});

export type CalculateSpeedFormData = z.infer<typeof CalculateSpeedFormModel>;
