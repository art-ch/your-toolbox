import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculateTotalTimeForm } from './CalculateTotalTimeForm';
import { dynamicExerciseDurationCalculator } from '../../../../services/DynamicExerciseDuration';

jest.mock('../../../../services/DynamicExerciseDuration', () => ({
  dynamicExerciseDurationCalculator: {
    calculateTotalTime: jest.fn()
  }
}));

const calculateTotalTimeMock =
  dynamicExerciseDurationCalculator.calculateTotalTime as jest.Mock;

describe('CalculateTotalTimeForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call calculateTotalTime with correct parameters when form is submitted', async () => {
    const mockResult = 30;

    calculateTotalTimeMock.mockReturnValue(mockResult);

    render(<CalculateTotalTimeForm />);

    const cleansingCyclesInput = screen.getByLabelText(/layers/i);
    const speedInput = screen.getByLabelText(/speed/i);

    await userEvent.type(cleansingCyclesInput, '1');
    await userEvent.type(speedInput, '8');

    const submitButton = screen.getByRole('button', { name: /calculate/i });
    await userEvent.click(submitButton);

    expect(
      dynamicExerciseDurationCalculator.calculateTotalTime
    ).toHaveBeenCalledWith(8, 1);

    await waitFor(() => {
      expect(
        screen.getByTestId('calculate-total-time-form-result')
      ).toBeInTheDocument();
    });
  });
});
