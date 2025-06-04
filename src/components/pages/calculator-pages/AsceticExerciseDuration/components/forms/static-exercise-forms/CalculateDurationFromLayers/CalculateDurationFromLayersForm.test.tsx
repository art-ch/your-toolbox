import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculateDurationFromLayersForm } from './CalculateDurationFromLayersForm';
import { staticExerciseDurationCalculator } from '../../../../services/StaticExerciseDuration/StaticExerciseDurationService';
import { formatTime } from '@/utils/i18n';

// Mock formatTime utility
jest.mock('@/utils/i18n', () => ({
  formatTime: jest.fn()
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
  '../../../../services/StaticExerciseDuration/StaticExerciseDurationService',
  () => ({
    staticExerciseDurationCalculator: {
      calculateDurationFromLayers: jest.fn()
    }
  })
);

const calculateDurationFromLayersMock =
  staticExerciseDurationCalculator.calculateDurationFromLayers as jest.Mock;

const formatTimeMock = formatTime as jest.Mock;

describe('CalculateDurationFromLayersForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    formatTimeMock.mockImplementation(
      (options) => `${options.totalMinutes} minutes`
    );
  });

  it('should call calculateDurationFromLayers with correct parameters when form is submitted', async () => {
    // Mock the return value
    const mockResult = 120; // 120 minutes
    calculateDurationFromLayersMock.mockReturnValue(mockResult);

    render(<CalculateDurationFromLayersForm />);

    // Find the mental layers input field
    const mentalLayersInput = screen.getByLabelText(/mentalLayers/i);

    // Enter a value
    await userEvent.type(mentalLayersInput, '5');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /calculate/i });
    await userEvent.click(submitButton);

    // Verify the service was called with the correct parameter
    expect(
      staticExerciseDurationCalculator.calculateDurationFromLayers
    ).toHaveBeenCalledWith(5);

    // Verify the result is displayed with correct translations
    await waitFor(() => {
      const resultElement = screen.getByTestId(
        'calculate-duration-from-layers-form-result'
      );
      expect(resultElement).toBeInTheDocument();
      expect(
        screen.getByText(/calculateDurationFromLayersResult1/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/calculateDurationFromLayersResult2/i)
      ).toBeInTheDocument();
    });
  });
});
