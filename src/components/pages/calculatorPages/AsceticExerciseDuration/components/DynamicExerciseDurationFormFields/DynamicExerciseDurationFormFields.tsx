import React from 'react';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/Form/components/FormField/FormField';

export type FieldProps<FormType extends FieldValues> = {
  form: UseFormReturn<FormType, unknown, undefined>;
  name: Path<FormType>;
};

export const SpeedField = <FormType extends FieldValues>({
  form,
  name
}: FieldProps<FormType>) => {
  return (
    <FormField
      form={form}
      name={name}
      fieldRenderer={({ field }) => (
        <FormItem>
          <FormLabel>Speed (km/h):</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Please enter speed value"
              {...field}
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
}: FieldProps<FormType>) => {
  return (
    <FormField
      form={form}
      name={name}
      fieldRenderer={({ field }) => (
        <FormItem>
          <FormLabel>Duration (minutes):</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Please enter duration value"
              {...field}
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
}: FieldProps<FormType>) => {
  return (
    <FormField
      form={form}
      name={name}
      fieldRenderer={({ field }) => (
        <FormItem>
          <FormLabel>Mental layers:</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Please enter mental layers value"
              {...field}
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
