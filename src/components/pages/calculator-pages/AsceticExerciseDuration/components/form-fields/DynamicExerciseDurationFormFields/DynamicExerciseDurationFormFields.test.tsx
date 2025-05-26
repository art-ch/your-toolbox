import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpeedField } from './DynamicExerciseDurationFormFields';
import { TestFieldWrapper } from '../FormFields/FormFields.test';

describe('Form Field Components', () => {
  describe('SpeedField', () => {
    it('should render with correct label and description', () => {
      render(
        <TestFieldWrapper>
          {(form) => <SpeedField form={form} name="speed" />}
        </TestFieldWrapper>
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
        <TestFieldWrapper>
          {(form) => <SpeedField form={form} name="speed" />}
        </TestFieldWrapper>
      );

      await userEvent.type(screen.getByLabelText(/speed \(km\/h\):/i), '10');
      expect(screen.getByLabelText(/speed \(km\/h\):/i)).toHaveValue(10);
    });
  });
});
