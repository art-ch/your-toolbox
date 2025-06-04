import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TemperatureField } from './StaticExerciseDurationFormFields';
import { TestFieldWrapper } from '../FormFields/FormFields.test';

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key // Simple key-return mock
  })
}));

describe('Static Exercise Duration Form Field Components', () => {
  describe('TemperatureField', () => {
    it('should render with correct label and description', () => {
      render(
        <TestFieldWrapper>
          {(form) => <TemperatureField form={form} name="temperature" />}
        </TestFieldWrapper>
      );

      expect(screen.getByLabelText(/temperature/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/temperatureValue/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/temperatureDescription/i)).toBeInTheDocument();
    });

    it('should accept numeric input', async () => {
      render(
        <TestFieldWrapper>
          {(form) => <TemperatureField form={form} name="temperature" />}
        </TestFieldWrapper>
      );

      await userEvent.type(screen.getByLabelText(/temperature/i), '10');
      expect(screen.getByLabelText(/temperature/i)).toHaveValue(10);
    });
  });
});
