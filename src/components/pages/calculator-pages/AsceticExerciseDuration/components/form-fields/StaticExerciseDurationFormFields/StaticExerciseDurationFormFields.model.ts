import { z } from 'zod';

import { preprocessNumericValue } from '@/components/Form/Form.utils';

export const createTemperatureModel = (t: (key: string) => string) =>
  z.preprocess(
    preprocessNumericValue,
    z.number({
      invalid_type_error: t('validation.invalidNumber')
    })
  );
