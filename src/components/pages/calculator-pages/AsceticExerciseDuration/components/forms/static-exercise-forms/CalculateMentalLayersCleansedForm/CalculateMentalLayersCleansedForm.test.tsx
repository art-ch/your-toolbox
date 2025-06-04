import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculateMentalLayersCleansedForm } from './CalculateMentalLayersCleansedForm';
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
      calculateMentalLayersCleansed: jest.fn()
    }
  })
);

const calculateMentalLayersCleansedMock =
  waterExposureDurationCalculator.calculateMentalLayersCleansed as jest.Mock;

const formatTimeMock = formatTime as jest.Mock;

describe('CalculateMentalLayersCleansedForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    formatTimeMock.mockImplementation(() => '60 minutes');
  });

  it('should call calculateMentalLayersCleansed with correct parameters when form is submitted', async () => {
    // Mock the return value
    const mockResult = 7; // 7 mental layers
    calculateMentalLayersCleansedMock.mockReturnValue(mockResult);

    render(<CalculateMentalLayersCleansedForm />);

    // Find the input fields
    const temperatureInput = screen.getByLabelText(/temperature/i);
    const durationInput = screen.getByLabelText(/duration/i);

    // Enter values
    await userEvent.type(temperatureInput, '15');
    await userEvent.type(durationInput, '60');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /calculate/i });
    await userEvent.click(submitButton);

    // Verify the service was called with the correct parameters
    expect(
      waterExposureDurationCalculator.calculateMentalLayersCleansed
    ).toHaveBeenCalledWith(15, 60);

    // Verify the result is displayed with correct translations
    await waitFor(() => {
      const resultElement = screen.getByTestId(
        'calculate-mental-layers-cleansed-form-result'
      );
      expect(resultElement).toBeInTheDocument();
      expect(
        screen.getByText(/calculateMentalLayersCleansedResult1/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/calculateMentalLayersCleansedResult2/i)
      ).toBeInTheDocument();
    });
  });
});
