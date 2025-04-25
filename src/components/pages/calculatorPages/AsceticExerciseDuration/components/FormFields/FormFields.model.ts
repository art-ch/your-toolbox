import { z } from 'zod';
import { MENTAL_LAYER_AMOUNT } from '../../constants/contants';

export const duration = z.preprocess(
  (value) => Number(value),
  z.number().min(1, 'Duration must be at least 1 munute')
);

export const mentalLayers = z.preprocess(
  (value) => Number(value),
  z
    .number()
    .min(1, 'Value of mental layers should not be less than 1')
    .max(MENTAL_LAYER_AMOUNT, 'Value of mental layers can not be more than 5')
);
