import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateMentalLayersCleansedFormResult,
  CalculateMentalLayersCleansedFormResultProps
} from './CalculateMentalLayersCleansedFormResult';
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

describe('CalculateMentalLayersCleansedFormResult', () => {
  const getValues = jest.fn().mockImplementation(() => ({
    duration: 30,
    temperature: 15
  }));

  const mockForm = {
    getValues
  } as unknown as CalculateMentalLayersCleansedFormResultProps['form'];

  beforeEach(() => {
    jest.clearAllMocks();
    formatTimeMock.mockImplementation((time) => `${time} minutes`);
  });

  it('renders the component with correct duration and temperature', () => {
    const result = 3;

    render(
      <CalculateMentalLayersCleansedFormResult
        result={result}
        form={mockForm}
      />
    );

    expect(
      screen.getByTestId('calculate-mental-layers-cleansed-form-result')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'After sitting in a water with 15 °C temperature for 30 minutes'
      )
    ).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(3);
  });

  it('displays the correct number of mental layers cleaned', () => {
    const result = 3;

    render(
      <CalculateMentalLayersCleansedFormResult
        result={result}
        form={mockForm}
      />
    );

    expect(
      screen.getByText('You will have 3 mental layers cleaned')
    ).toBeInTheDocument();
  });

  it('formats the time correctly using formatTime utility', () => {
    const result = 2;
    formatTimeMock.mockReturnValue('30 minutes');

    render(
      <CalculateMentalLayersCleansedFormResult
        result={result}
        form={mockForm}
      />
    );

    expect(formatTime).toHaveBeenCalledWith(30);
    expect(
      screen.getByText(
        'After sitting in a water with 15 °C temperature for 30 minutes'
      )
    ).toBeInTheDocument();
  });

  it('passes correct props to WaterExposureWarning component', () => {
    const result = 4;

    render(
      <CalculateMentalLayersCleansedFormResult
        result={result}
        form={mockForm}
      />
    );

    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 15,
        duration: 30
      },
      undefined
    );
    expect(screen.getByTestId('water-exposure-warning')).toBeInTheDocument();
  });

  it('updates correctly when different values are provided', () => {
    getValues.mockImplementation(() => ({
      duration: 60,
      temperature: 10
    }));
    const result = 5;
    formatTimeMock.mockReturnValue('1 hour');

    render(
      <CalculateMentalLayersCleansedFormResult
        result={result}
        form={mockForm}
      />
    );

    expect(
      screen.getByText(
        'After sitting in a water with 10 °C temperature for 1 hour'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('You will have 5 mental layers cleaned')
    ).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 10,
        duration: 60
      },
      undefined
    );
  });

  it('handles single mental layer case', () => {
    const result = 1;

    render(
      <CalculateMentalLayersCleansedFormResult
        result={result}
        form={mockForm}
      />
    );

    expect(
      screen.getByText('You will have 1 mental layers cleaned')
    ).toBeInTheDocument();
  });

  it('handles warm water temperature', () => {
    getValues.mockImplementation(() => ({
      duration: 20,
      temperature: 25
    }));
    const result = 1.5;
    formatTimeMock.mockReturnValue('20 minutes');

    render(
      <CalculateMentalLayersCleansedFormResult
        result={result}
        form={mockForm}
      />
    );

    expect(
      screen.getByText(
        'After sitting in a water with 25 °C temperature for 20 minutes'
      )
    ).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 25,
        duration: 20
      },
      undefined
    );
  });

  it('handles cold water temperature', () => {
    getValues.mockImplementation(() => ({
      duration: 10,
      temperature: 5
    }));
    const result = 1;
    formatTimeMock.mockReturnValue('10 minutes');

    render(
      <CalculateMentalLayersCleansedFormResult
        result={result}
        form={mockForm}
      />
    );

    expect(
      screen.getByText(
        'After sitting in a water with 5 °C temperature for 10 minutes'
      )
    ).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 5,
        duration: 10
      },
      undefined
    );
  });

  it('handles long exposure time', () => {
    getValues.mockImplementation(() => ({
      duration: 120,
      temperature: 15
    }));
    const result = 8;
    formatTimeMock.mockReturnValue('2 hours');

    render(
      <CalculateMentalLayersCleansedFormResult
        result={result}
        form={mockForm}
      />
    );

    expect(
      screen.getByText(
        'After sitting in a water with 15 °C temperature for 2 hours'
      )
    ).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 15,
        duration: 120
      },
      undefined
    );
  });
});
