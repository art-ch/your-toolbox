import { z } from 'zod';
import {
  createDurationModel,
  createMentalLayersModel
} from '../../../form-fields/FormFields/FormFields.model';

export const createCalculateTemperatureFormModel = (
  t: (key: string) => string
) => {
  return z.object({
    mentalLayers: createMentalLayersModel(t),
    duration: createDurationModel(t)
  });
};

export type CalculateTemperatureFormData = z.infer<
  ReturnType<typeof createCalculateTemperatureFormModel>
>;
