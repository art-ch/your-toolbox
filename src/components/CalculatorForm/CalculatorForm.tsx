import React, { useState } from 'react';
import { useForm, FieldValues, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form as ShadCnForm } from '@/components/ui/form';
import { Button } from '../ui/button';
import { FormProps } from '../Form/Form.types';
import { useCalculatorFormResult } from './hooks/useCalculatorFormResult';

export type CalculatorFormProps<T extends FieldValues, R> = FormProps<T, R> & {
  renderResult: (result: R, form: UseFormReturn<T>) => React.ReactNode;
};

export const CalculatorForm = <T extends FieldValues, R>({
  title,
  formModel,
  onSubmit,
  renderFields,
  renderResult
}: CalculatorFormProps<T, R>) => {
  const [formData, setFormData] = useState<T | null>(null);

  const form = useForm<T>({
    resolver: zodResolver(formModel)
  });

  const calculationResult = useCalculatorFormResult(formData, onSubmit);

  const handleFormSubmit = (data: T) => {
    setFormData(data);
    onSubmit(data);
  };

  return (
    <section>
      <h2 className="text-xl md:text-2xl font-semibold leading-none tracking-tight">
        {title}
      </h2>

      <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-6">
        <ShadCnForm {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="lg:flex-grow lg:max-w-[50%]"
          >
            <div className="py-2 flex flex-col gap-4">{renderFields(form)}</div>
            <Button type="submit" size="sm">
              Submit
            </Button>
          </form>
        </ShadCnForm>

        {calculationResult && formData && (
          <div>{renderResult(calculationResult, form)}</div>
        )}
      </div>
    </section>
  );
};
