import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateExposureTimeFormResult,
  CalculateExposureTimeFormResultProps
} from './CalculateExposureTimeFormResult';
import { formatTime } from '@/utils/i18n';
import { WaterExposureWarning } from '../../../WaterExposureWarning/WaterExposureWarning';

// Mock formatTime
jest.mock('@/utils/i18n', () => ({
  formatTime: jest.fn()
}));

// Mock WaterExposureWarning
jest.mock('../../../WaterExposureWarning/WaterExposureWarning', () => ({
  WaterExposureWarning: jest.fn(() => (
    <div data-testid="water-exposure-warning" />
  ))
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
const WaterExposureWarningMock = WaterExposureWarning as jest.Mock;

describe('CalculateExposureTimeFormResult', () => {
  const getValues = jest.fn().mockImplementation(() => ({
    mentalLayers: 3,
    temperature: 15
  }));

  const mockForm = {
    getValues
  } as unknown as CalculateExposureTimeFormResultProps['form'];

  beforeEach(() => {
    jest.clearAllMocks();
    formatTimeMock.mockImplementation(
      ({ totalMinutes }) => `${totalMinutes} minutes`
    );
  });

  it('renders the component with correct mental layers and temperature', () => {
    const result = 45;

    render(<CalculateExposureTimeFormResult result={result} form={mockForm} />);

    expect(
      screen.getByTestId('calculate-exposure-time-form-result')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/calculateExposureTimeResult1/)
    ).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(2);
  });

  it('displays the correctly formatted time', () => {
    const result = 30;
    formatTimeMock.mockReturnValue('30 minutes');

    render(<CalculateExposureTimeFormResult result={result} form={mockForm} />);

    expect(formatTime).toHaveBeenCalledWith({
      totalMinutes: 30,
      t: expect.any(Function),
      language: 'en'
    });
    expect(
      screen.getByText(/calculateExposureTimeResult2/)
    ).toBeInTheDocument();
  });

  it('passes correct props to WaterExposureWarning component', () => {
    const result = 60;

    render(<CalculateExposureTimeFormResult result={result} form={mockForm} />);

    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 15,
        duration: 60
      },
      undefined
    );
    expect(screen.getByTestId('water-exposure-warning')).toBeInTheDocument();
  });

  it('updates correctly when different values are provided', () => {
    getValues.mockImplementation(() => ({
      mentalLayers: 5,
      temperature: 10
    }));
    const result = 75;
    formatTimeMock.mockReturnValue('1 hour 15 minutes');

    render(<CalculateExposureTimeFormResult result={result} form={mockForm} />);

    expect(
      screen.getByText(/calculateExposureTimeResult1/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/calculateExposureTimeResult2/)
    ).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 10,
        duration: 75
      },
      undefined
    );
  });

  it('handles single mental layer case', () => {
    getValues.mockImplementation(() => ({
      mentalLayers: 1,
      temperature: 20
    }));
    const result = 15;
    formatTimeMock.mockReturnValue('15 minutes');

    render(<CalculateExposureTimeFormResult result={result} form={mockForm} />);

    expect(
      screen.getByText(/calculateExposureTimeResult1/)
    ).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 20,
        duration: 15
      },
      undefined
    );
  });

  it('handles extreme temperature values', () => {
    getValues.mockImplementation(() => ({
      mentalLayers: 2,
      temperature: 5
    }));
    const result = 20;
    formatTimeMock.mockReturnValue('20 minutes');

    render(<CalculateExposureTimeFormResult result={result} form={mockForm} />);

    expect(
      screen.getByText(/calculateExposureTimeResult1/)
    ).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 5,
        duration: 20
      },
      undefined
    );
  });
});
