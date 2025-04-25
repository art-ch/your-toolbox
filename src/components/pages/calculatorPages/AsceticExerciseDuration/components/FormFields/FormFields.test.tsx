import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn
} from 'react-hook-form';
import { DurationField, MentalLayersField, SubmitButton } from './FormFields';

export type TestFieldWrapperProps = {
  children: (
    form: UseFormReturn<FieldValues, unknown, FieldValues>
  ) => React.ReactNode;
};

export const TestFieldWrapper = ({ children }: TestFieldWrapperProps) => {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>{children(form)}</form>
    </FormProvider>
  );
};

describe('Form Field Components', () => {
  describe('DurationField', () => {
    it('should render with correct label and description', () => {
      render(
        <TestFieldWrapper>
          {(form) => (
            <DurationField
              form={form}
              name="duration"
              description="description"
            />
          )}
        </TestFieldWrapper>
      );

      expect(
        screen.getByLabelText(/duration \(minutes\):/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/description/i)).toBeInTheDocument();
    });

    it('accepts numeric input', async () => {
      render(
        <TestFieldWrapper>
          {(form) => (
            <DurationField
              form={form}
              name="duration"
              description="description"
            />
          )}
        </TestFieldWrapper>
      );

      await userEvent.type(
        screen.getByLabelText(/duration \(minutes\):/i),
        '30'
      );
      expect(screen.getByLabelText(/duration \(minutes\):/i)).toHaveValue(30);
    });
  });

  describe('MentalLayersField', () => {
    it('should render with correct label and description', () => {
      render(
        <TestFieldWrapper>
          {(form) => <MentalLayersField form={form} name="mentalLayers" />}
        </TestFieldWrapper>
      );

      expect(screen.getByLabelText(/mental layers:/i)).toBeInTheDocument();
      expect(
        screen.getByText(/how many mental layers you want to clean/i)
      ).toBeInTheDocument();
    });

    it('should accept numeric input', async () => {
      render(
        <TestFieldWrapper>
          {(form) => <MentalLayersField form={form} name="mentalLayers" />}
        </TestFieldWrapper>
      );

      await userEvent.type(screen.getByLabelText(/mental layers:/i), '5');
      expect(screen.getByLabelText(/mental layers:/i)).toHaveValue(5);
    });
  });

  describe('SubmitButton', () => {
    it('should render a submit button', () => {
      render(<SubmitButton />);
      expect(
        screen.getByRole('button', { name: /submit/i })
      ).toBeInTheDocument();
    });
  });
});
