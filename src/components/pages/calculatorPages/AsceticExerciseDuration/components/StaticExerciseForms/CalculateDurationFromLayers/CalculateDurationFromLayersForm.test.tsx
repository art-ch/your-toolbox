import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculateDurationFromLayersForm } from './CalculateDurationFromLayersForm';
import { staticExerciseDurationCalculator } from '../../../services/StaticExerciseDuration/StaticExerciseDurationService';

// Mock the service
jest.mock(
  '../../../services/StaticExerciseDuration/StaticExerciseDurationService',
  () => ({
    staticExerciseDurationCalculator: {
      calculateDurationFromLayers: jest.fn()
    }
  })
);

const calculateDurationFromLayersMock =
  staticExerciseDurationCalculator.calculateDurationFromLayers as jest.Mock;

describe('CalculateDurationFromLayersForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call calculateDurationFromLayers with correct parameters when form is submitted', async () => {
    // Mock the return value
    const mockResult = 120; // 120 minutes
    calculateDurationFromLayersMock.mockReturnValue(mockResult);

    render(<CalculateDurationFromLayersForm />);

    // Find the mental layers input field
    const mentalLayersInput = screen.getByLabelText(/mental layers/i);

    // Enter a value
    await userEvent.type(mentalLayersInput, '5');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /calculate/i });
    await userEvent.click(submitButton);

    // Verify the service was called with the correct parameter
    expect(
      staticExerciseDurationCalculator.calculateDurationFromLayers
    ).toHaveBeenCalledWith(5);

    // Verify the result is displayed
    await waitFor(() => {
      expect(
        screen.getByTestId('calculate-duration-from-layers-form-result')
      ).toBeInTheDocument();
    });
  });
});
