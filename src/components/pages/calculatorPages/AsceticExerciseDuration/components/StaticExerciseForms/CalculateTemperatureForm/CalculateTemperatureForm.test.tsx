import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculateTemperatureForm } from './CalculateTemperatureForm';
import { waterExposureDurationCalculator } from '../../../services/StaticExerciseDuration/WaterExposureDurationService';

jest.mock(
  '../../../services/StaticExerciseDuration/WaterExposureDurationService',
  () => ({
    waterExposureDurationCalculator: {
      calculateRequiredTemperature: jest.fn()
    }
  })
);

const calculateRequiredTemperatureMock =
  waterExposureDurationCalculator.calculateRequiredTemperature as jest.Mock;

describe('CalculateTemperatureForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call calculateRequiredTemperature with correct parameters when form is submitted', async () => {
    // Mock the return value
    const mockResult = 15; // 15°C
    calculateRequiredTemperatureMock.mockReturnValue(mockResult);

    render(<CalculateTemperatureForm />);

    // Find the input fields
    const mentalLayersInput = screen.getByLabelText(/mental layers/i);
    const durationInput = screen.getByLabelText(/duration/i);

    // Enter values
    await userEvent.type(mentalLayersInput, '5');
    await userEvent.type(durationInput, '30');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /calculate/i });
    await userEvent.click(submitButton);

    // Verify the service was called with the correct parameters
    expect(
      waterExposureDurationCalculator.calculateRequiredTemperature
    ).toHaveBeenCalledWith(5, 30);

    // Verify the result is displayed
    await waitFor(() => {
      expect(
        screen.getByTestId('calculate-temperature-form-result')
      ).toBeInTheDocument();
    });
  });
});
