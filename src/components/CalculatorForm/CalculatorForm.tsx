import React, { useState } from 'react';
import { useForm, FieldValues, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form as ShadCnForm } from '@/components/ui/form';
import { Button } from '../ui/button';
import { FormProps } from '../Form/Form.types';
import { useCalculatorFormResult } from './hooks/useCalculatorFormResult';
import { useTranslation } from 'react-i18next';

export type CalculatorFormProps<T extends FieldValues, R> = FormProps<T, R> & {
  renderResult: (result: R, form: UseFormReturn<T>) => React.ReactNode;
};

export const CalculatorForm = <T extends FieldValues, R>({
  title,
  subtitle,
  formModel,
  onSubmit,
  renderFields,
  renderResult
}: CalculatorFormProps<T, R>) => {
  const [formData, setFormData] = useState<T | null>(null);
  const { t } = useTranslation('common');

  const form = useForm<T>({
    resolver: zodResolver(formModel)
  });

  const calculationResult = useCalculatorFormResult(formData, onSubmit);

  const handleFormSubmit = (data: T) => {
    setFormData(data);
    onSubmit(data);
  };

  const renderResultSection = () => {
    if (formData === null || calculationResult === null) {
      return null;
    }

    return (
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold leading-none tracking-tight pb-1">
          {t('result')}:
        </h3>
        <div>{renderResult(calculationResult, form)}</div>
      </div>
    );
  };

  return (
    <article>
      <div className="lg:pb-4">
        <h2 className="text-xl md:text-2xl font-semibold leading-none tracking-tight pb-2 sm:pb-0">
          {title}
        </h2>
        {subtitle && <div>{subtitle}</div>}
      </div>

      <div className="flex w-full flex-col gap-4 lg:flex-row lg:gap-6">
        <ShadCnForm {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="lg:min-w-[50%]"
          >
            <div className="py-3 sm:py-2 flex flex-col gap-4">
              {renderFields(form)}
            </div>
            <Button className="cursor-pointer" type="submit" size="sm">
              {t('calculate')}
            </Button>
          </form>
        </ShadCnForm>

        {renderResultSection()}
      </div>
    </article>
  );
};
