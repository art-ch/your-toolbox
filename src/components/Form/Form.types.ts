import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';

export type FormProps<T extends FieldValues, R> = {
  title: string;
  subtitle?: string;
  formModel: ZodType;
  onSubmit: (data: T) => R;
  renderFields: (form: UseFormReturn<T>) => React.ReactNode;
};

export type FormFieldProps<FormType extends FieldValues> = {
  form: UseFormReturn<FormType, unknown, FormType>;
  name: Path<FormType>;
};
