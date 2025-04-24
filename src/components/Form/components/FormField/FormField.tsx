import React from 'react';

import { FormField as ShadCnFormField } from '@/components/ui/form';
import {
  ControllerProps,
  FieldValues,
  Path,
  UseFormReturn
} from 'react-hook-form';

export type FormFieldComponentProps<FormType extends FieldValues> = {
  form: UseFormReturn<FormType, unknown, FormType>;
  name: Path<FormType>;
  fieldRenderer: ControllerProps<FormType>['render'];
};

export const FormField = <FormType extends FieldValues>({
  form,
  name,
  fieldRenderer
}: FormFieldComponentProps<FormType>) => {
  console.log('render');

  return (
    <ShadCnFormField
      control={form.control}
      name={name}
      render={fieldRenderer}
    />
  );
};
