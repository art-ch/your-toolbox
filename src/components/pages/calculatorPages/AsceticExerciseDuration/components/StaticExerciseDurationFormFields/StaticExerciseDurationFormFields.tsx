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

export const TemperatureField = <FormType extends FieldValues>({
  form,
  name
}: FormFieldProps<FormType>) => {
  return (
    <FormField
      form={form}
      name={name}
      fieldRenderer={({ field }) => (
        <FormItem>
          <FormLabel>Temperature (°C):</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder="Please enter temperature value"
              value={field.value || ''}
            />
          </FormControl>
          <FormDescription>Your water temperature</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
