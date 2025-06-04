import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpeedField } from './DynamicExerciseDurationFormFields';
import { TestFieldWrapper } from '../FormFields/FormFields.test';

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key // Simple key-return mock
  })
}));

describe('Dynamic Exercise Duration Form Field Components', () => {
  describe('SpeedField', () => {
    it('should render with correct label and description', () => {
      render(
        <TestFieldWrapper>
          {(form) => <SpeedField form={form} name="speed" />}
        </TestFieldWrapper>
      );

      expect(screen.getByLabelText(/speed/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/speedValue/i)).toBeInTheDocument();
      expect(screen.getByText(/speedDescription/i)).toBeInTheDocument();
    });

    it('should accept numeric input', async () => {
      render(
        <TestFieldWrapper>
          {(form) => <SpeedField form={form} name="speed" />}
        </TestFieldWrapper>
      );

      await userEvent.type(screen.getByLabelText(/speed/i), '10');
      expect(screen.getByLabelText(/speed/i)).toHaveValue(10);
    });
  });
});
