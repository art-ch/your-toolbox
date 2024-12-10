import React from 'react';

import { FormField as ShadCnFormField } from '@/components/ui/form';
import {
  ControllerProps,
  FieldValues,
  Path,
  UseFormReturn
} from 'react-hook-form';

export type FormFieldProps<FormType extends FieldValues> = {
  form: UseFormReturn<FormType, unknown, undefined>;
  name: Path<FormType>;
  fieldRenderer: ControllerProps<FormType>['render'];
};

export const FormField = <FormType extends FieldValues>({
  form,
  name,
  fieldRenderer
}: FormFieldProps<FormType>) => {
  return (
    <ShadCnFormField
      control={form.control}
      name={name}
      render={fieldRenderer}
    />
  );
};
