import { z } from 'zod';
import { MENTAL_LAYER_AMOUNT } from '../../../constants/contants';
import { preprocessNumericValue } from '@/components/Form/Form.utils';

export const createDurationModel = (t: (key: string) => string) => {
  return z.preprocess(
    preprocessNumericValue,
    z
      .number({
        invalid_type_error: t('validation.invalidNumber')
      })
      .min(1, t('validation.duration'))
  );
};

export const createMentalLayersModel = (t: (key: string) => string) => {
  return z.preprocess(
    preprocessNumericValue,
    z
      .number({
        invalid_type_error: t('validation.invalidNumber')
      })
      .int(t('validation.mentalLayersWholeNumbers'))
      .min(1, t('validation.mentalLayers'))
      .max(MENTAL_LAYER_AMOUNT, t('validation.mentalLayersMax'))
  );
};
