import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateTemperatureFormResult,
  CalculateTemperatureFormResultProps
} from './CalculateTemperatureFormResult';
import { formatTime } from '@/utils/i18n';
import { WaterExposureWarning } from '../../../WaterExposureWarning/WaterExposureWarning';

jest.mock('@/utils/timeUtils', () => ({
  formatTime: jest.fn()
}));

jest.mock('../../../WaterExposureWarning/WaterExposureWarning', () => ({
  WaterExposureWarning: jest.fn(() => (
    <div data-testid="water-exposure-warning" />
  ))
}));

const formatTimeMock = formatTime as jest.Mock;
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
    formatTimeMock.mockImplementation((time) => `${time} minutes`);
  });

  it('renders the component with correct mental layers and duration', () => {
    const mockForm = createMockForm();
    const result = 15;

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(
      screen.getByTestId('calculate-temperature-form-result')
    ).toBeInTheDocument();
    expect(
      screen.getByText('To clean 3 mental layers in 30 minutes')
    ).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(2);
  });

  it('displays the correct water temperature result', () => {
    const mockForm = createMockForm();
    const result = 15;

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(
      screen.getByText('You will require a water with temperature of 15 °C')
    ).toBeInTheDocument();
  });

  it('formats the time correctly using formatTime utility', () => {
    const mockForm = createMockForm();
    const result = 12;
    formatTimeMock.mockReturnValue('30 minutes');

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(formatTime).toHaveBeenCalledWith(30);
    expect(
      screen.getByText('To clean 3 mental layers in 30 minutes')
    ).toBeInTheDocument();
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
    formatTimeMock.mockReturnValue('1 hour');

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(
      screen.getByText('To clean 5 mental layers in 1 hour')
    ).toBeInTheDocument();
    expect(
      screen.getByText('You will require a water with temperature of 8 °C')
    ).toBeInTheDocument();
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
    formatTimeMock.mockReturnValue('20 minutes');

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(
      screen.getByText('To clean 1 mental layers in 20 minutes')
    ).toBeInTheDocument();
    expect(
      screen.getByText('You will require a water with temperature of 18 °C')
    ).toBeInTheDocument();
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

    expect(
      screen.getByText('You will require a water with temperature of 25 °C')
    ).toBeInTheDocument();
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

    expect(
      screen.getByText('You will require a water with temperature of 5 °C')
    ).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 5,
        duration: 30
      },
      undefined
    );
  });

  it('handles long duration', () => {
    const mockForm = createMockForm({
      mentalLayers: 4,
      duration: 120
    });
    const result = 12;
    formatTimeMock.mockReturnValue('2 hours');

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(
      screen.getByText('To clean 4 mental layers in 2 hours')
    ).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 12,
        duration: 120
      },
      undefined
    );
  });

  it('handles decimal temperature result', () => {
    const mockForm = createMockForm();
    const result = 12.5;

    render(<CalculateTemperatureFormResult result={result} form={mockForm} />);

    expect(
      screen.getByText('You will require a water with temperature of 12.5 °C')
    ).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 12.5,
        duration: 30
      },
      undefined
    );
  });
});
