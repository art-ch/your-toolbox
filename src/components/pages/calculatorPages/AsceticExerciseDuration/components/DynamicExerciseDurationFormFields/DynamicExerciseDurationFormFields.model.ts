import { z } from 'zod';
import {
  MAX_SPEED,
  MAX_WALKING_SPEED,
  MIN_SPEED
} from '../../constants/DynamicExercise.constants';

export const speed = z.preprocess(
  (value) => Number(value),
  z
    .number()
    .min(MIN_SPEED, 'Speed must be at least 2 km/h (minimal walking speed)')
    .max(MAX_SPEED, "Speed can't exceed 45 km/h (fastest human sprint)")
    .refine(
      (value) =>
        value <= MAX_WALKING_SPEED ||
        (value > MAX_WALKING_SPEED && value <= MAX_SPEED),
      {
        message:
          'For walking, speed should be 2-7 km/h. For running, speed should be 7-45 km/h.'
      }
    )
);
