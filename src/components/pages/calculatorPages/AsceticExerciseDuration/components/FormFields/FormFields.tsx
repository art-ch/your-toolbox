import React from 'react';

import { Button } from '@/components/ui/button';
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

export type DurationFieldProps<FormType extends FieldValues> =
  FormFieldProps<FormType> & {
    description: string;
  };

export const DurationField = <FormType extends FieldValues>({
  form,
  name,
  description
}: DurationFieldProps<FormType>) => {
  const { t } = useTranslation('asceticExerciseDuration');

  return (
    <FormField
      form={form}
      name={name}
      fieldRenderer={({ field }) => (
        <FormItem>
          <FormLabel>{t('duration')}:</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder={t('durationValue')}
              value={field.value || ''}
            />
          </FormControl>
          <FormDescription>{t(description)}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const MentalLayersField = <FormType extends FieldValues>({
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
          <FormLabel>{t('mentalLayers')}:</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder={t('mentalLayersValue')}
              value={field.value || ''}
            />
          </FormControl>
          <FormDescription>{t('mentalLayersDescription')}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const SubmitButton = () => {
  return <Button type="submit">Submit</Button>;
};
