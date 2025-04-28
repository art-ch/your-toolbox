import { z } from 'zod';
import { duration, mentalLayers } from '../../FormFields/FormFields.model';

export const CalculateTemperatureFormModel = z.object({
  mentalLayers,
  duration
});

export type CalculateTemperatureFormData = z.infer<
  typeof CalculateTemperatureFormModel
>;
