import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalculateLayersFromDurationForm } from './CalculateLayersFromDurationForm';
import { staticExerciseDurationCalculator } from '../../../../services/StaticExerciseDuration/StaticExerciseDurationService';
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
  '../../../../services/StaticExerciseDuration/StaticExerciseDurationService',
  () => ({
    staticExerciseDurationCalculator: {
      calculateLayersFromDuration: jest.fn()
    }
  })
);

const calculateLayersFromDurationMock =
  staticExerciseDurationCalculator.calculateLayersFromDuration as jest.Mock;

const formatTimeMock = formatTime as jest.Mock;

describe('CalculateLayersFromDurationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    formatTimeMock.mockImplementation(() => '120 minutes');
  });

  it('should call calculateLayersFromDuration with correct parameters when form is submitted', async () => {
    // Mock the return value
    const mockResult = 5; // 5 mental layers
    calculateLayersFromDurationMock.mockReturnValue(mockResult);

    render(<CalculateLayersFromDurationForm />);

    // Find the duration input field
    const durationInput = screen.getByLabelText(/Duration:/i);

    // Enter a value
    await userEvent.type(durationInput, '120');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /calculate/i });
    await userEvent.click(submitButton);

    // Verify the service was called with the correct parameter
    expect(
      staticExerciseDurationCalculator.calculateLayersFromDuration
    ).toHaveBeenCalledWith(120);

    // Verify the result is displayed with correct translations
    await waitFor(() => {
      const resultElement = screen.getByTestId(
        'calculate-layers-from-duration-form-result'
      );
      expect(resultElement).toBeInTheDocument();
      expect(
        screen.getByText(/calculateLayersFromDurationResult1/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/calculateLayersFromDurationResult2/)
      ).toBeInTheDocument();
    });
  });
});
