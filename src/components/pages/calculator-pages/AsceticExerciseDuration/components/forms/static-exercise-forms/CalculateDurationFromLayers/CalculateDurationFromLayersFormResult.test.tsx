import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateDurationFromLayersFormResult,
  CalculateDurationFromLayersFormResultProps
} from './CalculateDurationFromLayersFormResult';
import { formatTime } from '@/utils/i18n';

// Mock formatTime
jest.mock('@/utils/i18n', () => ({
  formatTime: jest.fn()
}));

// Mock parseLanguage
jest.mock('@/utils/i18n/parseLanguage', () => ({
  parseLanguage: jest.fn(() => 'en')
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en'
    }
  })
}));

const formatTimeMock = formatTime as jest.Mock;

describe('CalculateDurationFromLayersFormResult', () => {
  const getValues = jest.fn().mockImplementation(() => ({
    mentalLayers: 3
  }));

  const mockForm = {
    getValues
  } as unknown as CalculateDurationFromLayersFormResultProps['form'];

  beforeEach(() => {
    jest.clearAllMocks();
    formatTimeMock.mockImplementation(
      ({ totalMinutes }) => `${totalMinutes} minutes`
    );
  });

  it('renders the component with correct mental layers count', () => {
    const result = 45;

    render(
      <CalculateDurationFromLayersFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByTestId('calculate-duration-from-layers-form-result')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/calculateDurationFromLayersResult1/)
    ).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(1);
  });

  it('displays the correct duration in minutes', () => {
    const result = 30;

    render(
      <CalculateDurationFromLayersFormResult result={result} form={mockForm} />
    );

    expect(formatTime).toHaveBeenCalledWith({
      totalMinutes: 30,
      grammarCaseConfig: expect.anything(),
      t: expect.any(Function),
      language: 'en'
    });
    expect(
      screen.getByText(/calculateDurationFromLayersResult2/)
    ).toBeInTheDocument();
  });

  it('updates correctly when different values are provided', () => {
    getValues.mockImplementation(() => ({
      mentalLayers: 5
    }));
    const result = 60;

    render(
      <CalculateDurationFromLayersFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByText(/calculateDurationFromLayersResult1/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/calculateDurationFromLayersResult2/)
    ).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(1);
  });

  it('handles single mental layer case', () => {
    getValues.mockImplementation(() => ({
      mentalLayers: 1
    }));
    const result = 15;

    render(
      <CalculateDurationFromLayersFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByText(/calculateDurationFromLayersResult1/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/calculateDurationFromLayersResult2/)
    ).toBeInTheDocument();
  });
});
