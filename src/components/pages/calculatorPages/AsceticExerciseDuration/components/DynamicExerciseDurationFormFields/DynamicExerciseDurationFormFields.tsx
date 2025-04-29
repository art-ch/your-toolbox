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

export const SpeedField = <FormType extends FieldValues>({
  form,
  name
}: FormFieldProps<FormType>) => {
  return (
    <FormField
      form={form}
      name={name}
      fieldRenderer={({ field }) => (
        <FormItem>
          <FormLabel>Speed (km/h):</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder="Please enter speed value"
              value={field.value || ''}
            />
          </FormControl>
          <FormDescription>Your walking or running speed</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
