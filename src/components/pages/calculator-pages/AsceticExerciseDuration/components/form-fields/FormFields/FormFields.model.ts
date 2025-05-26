import { z } from 'zod';
import { MENTAL_LAYER_AMOUNT } from '../../../constants/contants';

export const createDurationModel = (t: (key: string) => string) => {
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
      .min(1, t('validation.duration'))
  );
};

export const createMentalLayersModel = (t: (key: string) => string) => {
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
      .int(t('validation.mentalLayersWholeNumbers'))
      .min(1, t('validation.mentalLayers'))
      .max(MENTAL_LAYER_AMOUNT, t('validation.mentalLayersMax'))
  );
};
