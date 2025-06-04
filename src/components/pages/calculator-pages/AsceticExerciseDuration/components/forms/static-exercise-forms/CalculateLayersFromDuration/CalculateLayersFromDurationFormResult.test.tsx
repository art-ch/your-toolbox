import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateLayersFromDurationFormResult,
  CalculateLayersFromDurationFormResultProps
} from './CalculateLayersFromDurationFormResult';
import { formatTime } from '@/utils/i18n';
import { MENTAL_LAYER_AMOUNT } from '../../../../constants/contants';

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
    t: (key: string) => key, // Simple key-return mock
    i18n: {
      language: 'en'
    }
  })
}));

const formatTimeMock = formatTime as jest.Mock;

describe('CalculateLayersFromDurationFormResult', () => {
  const getValues = jest.fn().mockImplementation(() => ({
    duration: 30
  }));

  const mockForm = {
    getValues
  } as unknown as CalculateLayersFromDurationFormResultProps['form'];

  beforeEach(() => {
    jest.clearAllMocks();
    formatTimeMock.mockImplementation(
      ({ totalMinutes }) => `${totalMinutes} minutes`
    );
  });

  it('renders the component with correct duration', () => {
    const result = 3;

    render(
      <CalculateLayersFromDurationFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByTestId('calculate-layers-from-duration-form-result')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/calculateLayersFromDurationResult1/)
    ).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(1);
  });

  it('displays the correct number of mental layers cleaned', () => {
    const result = 3;

    render(
      <CalculateLayersFromDurationFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByText(/calculateLayersFromDurationResult2/)
    ).toBeInTheDocument();
  });

  it('formats the time correctly using formatTime utility', () => {
    const result = 2;

    render(
      <CalculateLayersFromDurationFormResult result={result} form={mockForm} />
    );

    expect(formatTime).toHaveBeenCalledWith({
      totalMinutes: 30,
      grammarCaseConfig: expect.anything(),
      t: expect.any(Function),
      language: 'en'
    });
  });

  it('updates correctly when different duration is provided', () => {
    getValues.mockImplementation(() => ({
      duration: 60
    }));
    const result = 5;

    render(
      <CalculateLayersFromDurationFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByText(/calculateLayersFromDurationResult1/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/calculateLayersFromDurationResult2/)
    ).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(1);
  });

  it('shows overextending message when result > MENTAL_LAYER_AMOUNT', () => {
    const result = MENTAL_LAYER_AMOUNT + 1;

    render(
      <CalculateLayersFromDurationFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByText(/calculateLayersFromDurationOverextending/)
    ).toBeInTheDocument();
  });

  it('handles short duration', () => {
    getValues.mockImplementation(() => ({
      duration: 5
    }));
    const result = 0.5;

    render(
      <CalculateLayersFromDurationFormResult result={result} form={mockForm} />
    );

    expect(
      screen.getByText(/calculateLayersFromDurationResult1/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/calculateLayersFromDurationResult2/)
    ).toBeInTheDocument();
  });
});
