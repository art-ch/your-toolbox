import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculateExposureTimeForm } from './CalculateExposureTimeForm';
import { waterExposureDurationCalculator } from '../../../services/StaticExerciseDuration/WaterExposureDurationService';

// Mock the service
jest.mock(
  '../../../services/StaticExerciseDuration/WaterExposureDurationService',
  () => ({
    waterExposureDurationCalculator: {
      calculateTotalExposureTime: jest.fn()
    }
  })
);

const calculateTotalExposureTimeMock =
  waterExposureDurationCalculator.calculateTotalExposureTime as jest.Mock;

describe('CalculateExposureTimeForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call calculateTotalExposureTime with correct parameters when form is submitted', async () => {
    // Mock the return value
    const mockResult = 45; // 45 minutes
    calculateTotalExposureTimeMock.mockReturnValue(mockResult);

    render(<CalculateExposureTimeForm />);

    // Find the input fields
    const mentalLayersInput = screen.getByLabelText(/mental layers/i);
    const temperatureInput = screen.getByLabelText(/temperature/i);

    // Enter values
    await userEvent.type(mentalLayersInput, '5');
    await userEvent.type(temperatureInput, '15');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /calculate/i });
    await userEvent.click(submitButton);

    // Verify the service was called with the correct parameters
    expect(
      waterExposureDurationCalculator.calculateTotalExposureTime
    ).toHaveBeenCalledWith(15, 5);

    // Verify the result is displayed
    await waitFor(() => {
      expect(
        screen.getByTestId('calculate-exposure-time-form-result')
      ).toBeInTheDocument();
    });
  });
});
