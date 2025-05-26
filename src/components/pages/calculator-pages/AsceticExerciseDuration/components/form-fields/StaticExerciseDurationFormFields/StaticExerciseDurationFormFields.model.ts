import { z } from 'zod';

export const createTemperatureModel = (t: (key: string) => string) =>
  z.preprocess(
    (value) => {
      if (value === '' || value === null || value === undefined) {
        return NaN;
      }
      return Number(value);
    },
    z.number({
      invalid_type_error: t('validation.invalidNumber')
    })
  );
