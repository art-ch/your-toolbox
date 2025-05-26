import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculateSpeedForm } from './CalculateSpeedForm';
import { dynamicExerciseDurationCalculator } from '../../../../services/DynamicExerciseDuration/DynamicExerciseDurationService';

jest.mock(
  '../../../../services/DynamicExerciseDuration/DynamicExerciseDurationService',
  () => ({
    dynamicExerciseDurationCalculator: {
      calculateSpeedFromCyclesAndTime: jest.fn()
    }
  })
);

const calculateSpeedFromCyclesAndTimeMock =
  dynamicExerciseDurationCalculator.calculateSpeedFromCyclesAndTime as jest.Mock;

describe('CalculateSpeedForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call calculateSpeedFromCyclesAndTime with correct parameters when form is submitted', async () => {
    const mockResult = 7;

    calculateSpeedFromCyclesAndTimeMock.mockReturnValue(mockResult);

    render(<CalculateSpeedForm />);

    const cleansingCyclesInput = screen.getByLabelText(/layers/i);
    const durationInput = screen.getByLabelText(/duration/i);

    await userEvent.type(cleansingCyclesInput, '1');
    await userEvent.type(durationInput, '30');

    const submitButton = screen.getByRole('button', { name: /calculate/i });
    await userEvent.click(submitButton);

    expect(
      dynamicExerciseDurationCalculator.calculateSpeedFromCyclesAndTime
    ).toHaveBeenCalledWith(1, 30);

    await waitFor(() => {
      expect(
        screen.getByTestId('calculate-speed-form-result')
      ).toBeInTheDocument();
    });
  });
});
