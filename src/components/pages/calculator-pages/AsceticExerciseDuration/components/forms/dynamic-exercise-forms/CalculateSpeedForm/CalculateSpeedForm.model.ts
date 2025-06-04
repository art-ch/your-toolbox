import { z } from 'zod';
import {
  createDurationModel,
  createMentalLayersModel
} from '../../../form-fields/FormFields/FormFields.model';

export const createCalculateSpeedFormModel = (t: (key: string) => string) => {
  return z.object({
    mentalLayers: createMentalLayersModel(t),
    duration: createDurationModel(t)
  });
};

export type CalculateSpeedFormData = z.infer<
  ReturnType<typeof createCalculateSpeedFormModel>
>;
