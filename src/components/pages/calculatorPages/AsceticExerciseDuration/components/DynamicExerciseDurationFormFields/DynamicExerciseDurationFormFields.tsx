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

export const DurationField = <FormType extends FieldValues>({
  form,
  name
}: FormFieldProps<FormType>) => {
  return (
    <FormField
      form={form}
      name={name}
      fieldRenderer={({ field }) => (
        <FormItem>
          <FormLabel>Duration (minutes):</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder="Please enter duration value"
              value={field.value || ''}
            />
          </FormControl>
          <FormDescription>
            How many minutes you plan to walk or run
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const CleansingCyclesField = <FormType extends FieldValues>({
  form,
  name
}: FormFieldProps<FormType>) => {
  return (
    <FormField
      form={form}
      name={name}
      fieldRenderer={({ field }) => (
        <FormItem>
          <FormLabel>Mental layers:</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder="Please enter mental layers value"
              value={field.value || ''}
            />
          </FormControl>
          <FormDescription>
            How many mental layers you want to clean
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const SubmitButton = () => {
  return <Button type="submit">Submit</Button>;
};
