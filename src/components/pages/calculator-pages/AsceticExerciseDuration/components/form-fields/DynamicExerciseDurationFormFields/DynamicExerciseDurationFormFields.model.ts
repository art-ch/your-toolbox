import { z } from 'zod';
import {
  MIN_SPEED,
  MAX_WALKING_SPEED,
  MAX_SPEED
} from '../../../constants/DynamicExercise.constants';

export const createSpeedModel = (t: (key: string) => string) => {
  return z.preprocess(
    (value) => {
      if (value === '' || value === null || value === undefined) {
        return NaN;
      }
      return Number(value);
    },
    z
      .number({
        invalid_type_error: t('validation.invalidNumber')
      })
      .min(MIN_SPEED, t('validation.speedMin'))
      .max(MAX_SPEED, t('validation.speedMax'))
      .refine(
        (value) =>
          value <= MAX_WALKING_SPEED ||
          (value > MAX_WALKING_SPEED && value <= MAX_SPEED),
        {
          message: t('validation.validSpeed')
        }
      )
  );
};
