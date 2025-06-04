import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn
} from 'react-hook-form';
import { DurationField, MentalLayersField } from './FormFields';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key // Simple key-return mock
  })
}));

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

      expect(screen.getByLabelText(/duration/i)).toBeInTheDocument();
      expect(screen.getByText(/duration/i)).toBeInTheDocument();
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

      await userEvent.type(screen.getByLabelText(/duration/i), '30');
      expect(screen.getByLabelText(/duration/i)).toHaveValue(30);
    });
  });

  describe('MentalLayersField', () => {
    it('should render with correct label and description', () => {
      render(
        <TestFieldWrapper>
          {(form) => <MentalLayersField form={form} name="mentalLayers" />}
        </TestFieldWrapper>
      );

      expect(screen.getByLabelText(/mentalLayers/i)).toBeInTheDocument();
      expect(screen.getByText(/mentalLayersDescription/i)).toBeInTheDocument();
    });

    it('should accept numeric input', async () => {
      render(
        <TestFieldWrapper>
          {(form) => <MentalLayersField form={form} name="mentalLayers" />}
        </TestFieldWrapper>
      );

      await userEvent.type(screen.getByLabelText(/mentalLayers/i), '5');
      expect(screen.getByLabelText(/mentalLayers/i)).toHaveValue(5);
    });
  });
});
