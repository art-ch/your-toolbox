import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculateLayersFromDurationForm } from './CalculateLayersFromDurationForm';
import { staticExerciseDurationCalculator } from '../../../services/StaticExerciseDuration/StaticExerciseDurationService';

// Mock the service
jest.mock(
  '../../../services/StaticExerciseDuration/StaticExerciseDurationService',
  () => ({
    staticExerciseDurationCalculator: {
      calculateLayersFromDuration: jest.fn()
    }
  })
);

const calculateLayersFromDurationMock =
  staticExerciseDurationCalculator.calculateLayersFromDuration as jest.Mock;

describe('CalculateLayersFromDurationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call calculateLayersFromDuration with correct parameters when form is submitted', async () => {
    // Mock the return value
    const mockResult = 5; // 5 mental layers
    calculateLayersFromDurationMock.mockReturnValue(mockResult);

    render(<CalculateLayersFromDurationForm />);

    // Find the duration input field
    const durationInput = screen.getByLabelText(/duration/i);

    // Enter a value
    await userEvent.type(durationInput, '120');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /calculate/i });
    await userEvent.click(submitButton);

    // Verify the service was called with the correct parameter
    expect(
      staticExerciseDurationCalculator.calculateLayersFromDuration
    ).toHaveBeenCalledWith(120);

    // Verify the result is displayed
    await waitFor(() => {
      expect(
        screen.getByTestId('calculate-layers-from-duration-form-result')
      ).toBeInTheDocument();
    });
  });
});
