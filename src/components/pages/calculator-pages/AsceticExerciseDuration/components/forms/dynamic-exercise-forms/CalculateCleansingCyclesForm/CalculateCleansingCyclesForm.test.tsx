import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculateCleansingCyclesForm } from './CalculateCleansingCyclesForm';
import { dynamicExerciseDurationCalculator } from '../../../../services/DynamicExerciseDuration';
import { MENTAL_LAYER_AMOUNT } from '../../../../constants/contants';

jest.mock('../../../services/DynamicExerciseDuration', () => ({
  dynamicExerciseDurationCalculator: {
    calculateCleansingCycles: jest.fn()
  }
}));

const calculateCleansingCyclesMock =
  dynamicExerciseDurationCalculator.calculateCleansingCycles as jest.Mock;

describe('CalculateCleansingCyclesForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call calculateCleansingCycles with correct parameters when form is submitted', async () => {
    const mockResult = {
      cleansingCycles: MENTAL_LAYER_AMOUNT
    };

    calculateCleansingCyclesMock.mockReturnValue(mockResult);

    render(<CalculateCleansingCyclesForm />);

    const speedInput = screen.getByLabelText(/speed/i);
    const durationInput = screen.getByLabelText(/duration/i);

    await userEvent.type(speedInput, '5');
    await userEvent.type(durationInput, '30');

    const submitButton = screen.getByRole('button', { name: /calculate/i });
    await userEvent.click(submitButton);

    expect(
      dynamicExerciseDurationCalculator.calculateCleansingCycles
    ).toHaveBeenCalledWith(5, 30);

    await waitFor(() => {
      expect(
        screen.getByTestId('calculate-cleansing-cycles-form-result')
      ).toBeInTheDocument();
    });
  });
});
