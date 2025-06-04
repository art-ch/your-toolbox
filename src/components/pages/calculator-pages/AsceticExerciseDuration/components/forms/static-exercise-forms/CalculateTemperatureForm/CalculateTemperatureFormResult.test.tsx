import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateTemperatureFormResult,
  CalculateTemperatureFormResultProps
} from './CalculateTemperatureFormResult';
import { WaterExposureWarning } from '../../../WaterExposureWarning/WaterExposureWarning';

// Mock the necessary modules
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Simple key-return mock
    i18n: {
      language: 'en'
    }
  })
}));

jest.mock('@/utils/i18n/parseLanguage', () => ({
  parseLanguage: jest.fn(() => 'en')
}));

jest.mock('@/utils/timeUtils', () => ({
  convertMinutesToHoursAndMinutes: jest.fn((minutes) => {
    const hours = Math.floor(minutes / 60);
    return { hours, minutes: minutes % 60 };
  })
}));

jest.mock('../../../WaterExposureWarning/WaterExposureWarning', () => ({
  WaterExposureWarning: jest.fn(() => (
    <div data-testid="water-exposure-warning" />
  ))
}));

const WaterExposureWarningMock = WaterExposureWarning as jest.Mock;

describe('CalculateTemperatureFormResult', () => {
  const defaultValues = {
    mentalLayers: 3,
    duration: 30
  };

  const createMockForm = (values = defaultValues) => {
    const getValues = jest.fn().mockReturnValue(values);
    return {
      getValues
    } as unknown as CalculateTemperatureFormResultProps['form'];
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with correct mental layers and duration', () => {
    const mockForm = createMockForm();
    const result = 15;

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(
      screen.getByTestId('calculate-temperature-form-result')
    ).toBeInTheDocument();
    expect(screen.getByText(/calculateTemperatureResult1/)).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(2);
  });

  it('displays the correct water temperature result', () => {
    const mockForm = createMockForm();
    const result = 15;

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(screen.getByText(/calculateTemperatureResult2/)).toBeInTheDocument();
  });

  it('passes correct props to WaterExposureWarning component', () => {
    const mockForm = createMockForm();
    const result = 10;

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 10,
        duration: 30
      },
      undefined
    );
    expect(screen.getByTestId('water-exposure-warning')).toBeInTheDocument();
  });

  it('updates correctly when different values are provided', () => {
    const mockForm = createMockForm({
      mentalLayers: 5,
      duration: 60
    });
    const result = 8;

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(screen.getByText(/calculateTemperatureResult1/)).toBeInTheDocument();
    expect(screen.getByText(/calculateTemperatureResult2/)).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 8,
        duration: 60
      },
      undefined
    );
  });

  it('handles single mental layer case', () => {
    const mockForm = createMockForm({
      mentalLayers: 1,
      duration: 20
    });
    const result = 18;

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(screen.getByText(/calculateTemperatureResult1/)).toBeInTheDocument();
    expect(screen.getByText(/calculateTemperatureResult2/)).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 18,
        duration: 20
      },
      undefined
    );
  });

  it('handles warm water temperature result', () => {
    const mockForm = createMockForm();
    const result = 25;

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(screen.getByText(/calculateTemperatureResult2/)).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 25,
        duration: 30
      },
      undefined
    );
  });

  it('handles cold water temperature result', () => {
    const mockForm = createMockForm();
    const result = 5;

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(screen.getByText(/calculateTemperatureResult2/)).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 5,
        duration: 30
      },
      undefined
    );
  });

  it('handles hour and minute formatting', () => {
    const mockForm = createMockForm({
      mentalLayers: 4,
      duration: 90
    });
    const result = 12;

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(screen.getByText('calculateTemperatureResult1')).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 12,
        duration: 90
      },
      undefined
    );
  });

  it('handles decimal temperature result', () => {
    const mockForm = createMockForm();
    const result = 12.5;

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(screen.getByText('calculateTemperatureResult1')).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 12.5,
        duration: 30
      },
      undefined
    );
  });
});
