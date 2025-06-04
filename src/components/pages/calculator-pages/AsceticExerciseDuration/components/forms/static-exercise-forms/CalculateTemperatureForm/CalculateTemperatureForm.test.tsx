import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculateTemperatureForm } from './CalculateTemperatureForm';
import { waterExposureDurationCalculator } from '../../../../services/StaticExerciseDuration/WaterExposureDurationService';
import { formatTime } from '@/utils/i18n';

// Mock formatTime utility
jest.mock('@/utils/i18n', () => ({
  formatTime: jest.fn(),
  parseLanguage: jest.fn(() => 'en')
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Simple key-return mock
    i18n: {
      language: 'en'
    }
  })
}));

jest.mock(
  '../../../../services/StaticExerciseDuration/WaterExposureDurationService',
  () => ({
    waterExposureDurationCalculator: {
      calculateRequiredTemperature: jest.fn()
    }
  })
);

const calculateRequiredTemperatureMock =
  waterExposureDurationCalculator.calculateRequiredTemperature as jest.Mock;

const formatTimeMock = formatTime as jest.Mock;

describe('CalculateTemperatureForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    formatTimeMock.mockImplementation(() => '30 minutes');
  });

  it('should call calculateRequiredTemperature with correct parameters when form is submitted', async () => {
    // Mock the return value
    const mockResult = 15; // 15°C
    calculateRequiredTemperatureMock.mockReturnValue(mockResult);

    render(<CalculateTemperatureForm />);

    // Find the input fields
    const mentalLayersInput = screen.getByLabelText(/mentalLayers/i);
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

    // Verify the result is displayed with correct translations
    await waitFor(() => {
      const resultElement = screen.getByTestId(
        'calculate-temperature-form-result'
      );
      expect(resultElement).toBeInTheDocument();
      expect(
        screen.getByText(/calculateTemperatureResult1/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/calculateTemperatureResult2/)
      ).toBeInTheDocument();
    });
  });
});
