import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculateExposureTimeForm } from './CalculateExposureTimeForm';
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

// Mock the service
jest.mock(
  '../../../../services/StaticExerciseDuration/WaterExposureDurationService',
  () => ({
    waterExposureDurationCalculator: {
      calculateTotalExposureTime: jest.fn()
    }
  })
);

const calculateTotalExposureTimeMock =
  waterExposureDurationCalculator.calculateTotalExposureTime as jest.Mock;

const formatTimeMock = formatTime as jest.Mock;

describe('CalculateExposureTimeForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    formatTimeMock.mockImplementation(() => '45 minutes');
  });

  it('should call calculateTotalExposureTime with correct parameters when form is submitted', async () => {
    // Mock the return value
    const mockResult = 45; // 45 minutes
    calculateTotalExposureTimeMock.mockReturnValue(mockResult);

    render(<CalculateExposureTimeForm />);

    // Find the input fields
    const mentalLayersInput = screen.getByLabelText(/mentalLayers/i);
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

    // Verify the result is displayed with correct translations
    await waitFor(() => {
      const resultElement = screen.getByTestId(
        'calculate-exposure-time-form-result'
      );
      expect(resultElement).toBeInTheDocument();
      expect(
        screen.getByText(/calculateExposureTimeResult1/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/calculateExposureTimeResult2/i)
      ).toBeInTheDocument();
    });
  });
});
