import { z } from 'zod';
import {
  MAX_SAFE_WATER_TEMPERATURE,
  MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED
} from '../../constants/StaticExercise.constants';

export const temperature = z.preprocess(
  (value) => Number(value),
  z
    .number()
    .min(MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED)
    .max(MAX_SAFE_WATER_TEMPERATURE)
    .refine(
      (val) =>
        val < MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED ||
        val > MAX_SAFE_WATER_TEMPERATURE,
      {
        message: `This temperature is not safe for human body, please choose a temperature between ${MIN_SAFE_WATER_TEMPERATURE_FOR_TRAINED}°C and ${MAX_SAFE_WATER_TEMPERATURE}°C`
      }
    )
);
