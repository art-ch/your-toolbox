import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateExposureTimeFormResult,
  CalculateExposureTimeFormResultProps
} from './CalculateExposureTimeFormResult';
import { formatTime } from '@/utils/i18n';
import { WaterExposureWarning } from '../../../WaterExposureWarning/WaterExposureWarning';

jest.mock('@/lib/i18n/utils', () => ({
  formatTime: jest.fn()
}));

jest.mock('../../../WaterExposureWarning/WaterExposureWarning', () => ({
  WaterExposureWarning: jest.fn(() => (
    <div data-testid="water-exposure-warning" />
  ))
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
    formatTimeMock.mockImplementation((time) => `${time} minutes`);
  });

  it('renders the component with correct mental layers and temperature', () => {
    const result = 45;

    render(<CalculateExposureTimeFormResult result={result} form={mockForm} />);

    expect(
      screen.getByTestId('calculate-exposure-time-form-result')
    ).toBeInTheDocument();
    expect(
      screen.getByText('To clean 3 mental layers in 15 °C water')
    ).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(2);
  });

  it('displays the correctly formatted time', () => {
    const result = 30;
    formatTimeMock.mockReturnValue('30 minutes');

    render(<CalculateExposureTimeFormResult result={result} form={mockForm} />);

    expect(formatTime).toHaveBeenCalledWith(30);
    expect(
      screen.getByText('You will have to sit still in it for 30 minutes')
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
      screen.getByText('To clean 5 mental layers in 10 °C water')
    ).toBeInTheDocument();
    expect(
      screen.getByText('You will have to sit still in it for 1 hour 15 minutes')
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
      screen.getByText('To clean 1 mental layers in 20 °C water')
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
      screen.getByText('To clean 2 mental layers in 5 °C water')
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
