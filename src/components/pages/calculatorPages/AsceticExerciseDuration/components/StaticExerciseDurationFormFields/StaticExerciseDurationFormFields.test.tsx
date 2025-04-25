import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TemperatureField } from './StaticExerciseDurationFormFields';
import { TestFieldWrapper } from '../FormFields/FormFields.test';

describe('Form Field Components', () => {
  describe('TemperatureField', () => {
    it('should render with correct label and description', () => {
      render(
        <TestFieldWrapper>
          {(form) => <TemperatureField form={form} name="temperature" />}
        </TestFieldWrapper>
      );

      expect(screen.getByLabelText(/temperature \(°C\):/i)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(/please enter temperature value/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/your water temperature/i)).toBeInTheDocument();
    });

    it('should accept numeric input', async () => {
      render(
        <TestFieldWrapper>
          {(form) => <TemperatureField form={form} name="temperature" />}
        </TestFieldWrapper>
      );

      await userEvent.type(screen.getByLabelText(/temperature \(°C\):/i), '10');
      expect(screen.getByLabelText(/temperature \(°C\):/i)).toHaveValue(10);
    });
  });
});
