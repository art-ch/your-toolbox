import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormReturn
} from 'react-hook-form';
import {
  SpeedField,
  DurationField,
  CleansingCyclesField,
  SubmitButton
} from './DynamicExerciseDurationFormFields';

type FieldWrapperProps = {
  children: (
    form: UseFormReturn<FieldValues, unknown, undefined>
  ) => React.ReactNode;
};

const FieldWrapper = ({ children }: FieldWrapperProps) => {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>{children(form)}</form>
    </FormProvider>
  );
};

describe('Form Field Components', () => {
  describe('SpeedField', () => {
    it('should render with correct label and description', () => {
      render(
        <FieldWrapper>
          {(form) => <SpeedField form={form} name="speed" />}
        </FieldWrapper>
      );

      expect(screen.getByLabelText(/speed \(km\/h\):/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/please enter speed value/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/your walking or running speed/i)
      ).toBeInTheDocument();
    });

    it('should accept numeric input', async () => {
      render(
        <FieldWrapper>
          {(form) => <SpeedField form={form} name="speed" />}
        </FieldWrapper>
      );

      await userEvent.type(screen.getByLabelText(/speed \(km\/h\):/i), '10');
      expect(screen.getByLabelText(/speed \(km\/h\):/i)).toHaveValue(10);
    });
  });

  describe('DurationField', () => {
    it('should render with correct label and description', () => {
      render(
        <FieldWrapper>
          {(form) => <DurationField form={form} name="duration" />}
        </FieldWrapper>
      );

      expect(
        screen.getByLabelText(/duration \(minutes\):/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/how many minutes you plan to walk or run/i)
      ).toBeInTheDocument();
    });

    it('accepts numeric input', async () => {
      render(
        <FieldWrapper>
          {(form) => <DurationField form={form} name="duration" />}
        </FieldWrapper>
      );

      await userEvent.type(
        screen.getByLabelText(/duration \(minutes\):/i),
        '30'
      );
      expect(screen.getByLabelText(/duration \(minutes\):/i)).toHaveValue(30);
    });
  });

  describe('CleansingCyclesField', () => {
    it('should render with correct label and description', () => {
      render(
        <FieldWrapper>
          {(form) => <CleansingCyclesField form={form} name="mentalLayers" />}
        </FieldWrapper>
      );

      expect(screen.getByLabelText(/mental layers:/i)).toBeInTheDocument();
      expect(
        screen.getByText(/how many mental layers you want to clean/i)
      ).toBeInTheDocument();
    });

    it('should accept numeric input', async () => {
      render(
        <FieldWrapper>
          {(form) => <CleansingCyclesField form={form} name="mentalLayers" />}
        </FieldWrapper>
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
