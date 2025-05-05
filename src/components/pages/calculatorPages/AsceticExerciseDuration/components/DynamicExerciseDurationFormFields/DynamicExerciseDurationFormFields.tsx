import React from 'react';

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { FieldValues } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/Form/components/FormField/FormField';
import { FormFieldProps } from '@/components/Form/Form.types';
import { useTranslation } from 'react-i18next';

export const SpeedField = <FormType extends FieldValues>({
  form,
  name
}: FormFieldProps<FormType>) => {
  const { t } = useTranslation('asceticExerciseDuration');

  return (
    <FormField
      form={form}
      name={name}
      fieldRenderer={({ field }) => (
        <FormItem>
          <FormLabel>{t('speed')}:</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder={t('speedValue')}
              value={field.value || ''}
            />
          </FormControl>
          <FormDescription>{t('speedDescription')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
