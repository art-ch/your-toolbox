import { z } from 'zod';

export const speed = z.preprocess(
  (val) => Number(val),
  z
    .number()
    .min(2, 'Speed must be at least 2 km/h (minimal walking speed)')
    .max(45, "Speed can't exceed 45 km/h (fastest human sprint)")
    .refine((val) => val <= 7 || (val > 7 && val <= 45), {
      message:
        'For walking, speed should be 2-7 km/h. For running, speed should be 7-45 km/h.'
    })
);

export const duration = z.preprocess(
  (val) => Number(val),
  z.number().min(1, 'Duration must be at least 1 munute')
);

export const cleansingCycles = z.preprocess(
  (val) => Number(val),
  z.number().min(1, 'Value of cycles should not be less than 1')
);
