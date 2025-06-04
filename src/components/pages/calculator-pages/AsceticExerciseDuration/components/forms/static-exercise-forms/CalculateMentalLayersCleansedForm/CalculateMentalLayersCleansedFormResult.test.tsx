import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateMentalLayersCleansedFormResult,
  CalculateMentalLayersCleansedFormResultProps
} from './CalculateMentalLayersCleansedFormResult';
import { formatTime } from '@/utils/i18n';
import { WaterExposureWarning } from '../../../WaterExposureWarning/WaterExposureWarning';
import { MENTAL_LAYER_AMOUNT } from '../../../../constants/contants';

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
    t: (key: string) => key, // Simple key-return mock
    i18n: {
      language: 'en'
    }
  })
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
    formatTimeMock.mockImplementation(
      ({ totalMinutes }) => `${totalMinutes} minutes`
    );
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
      screen.getByText('calculateMentalLayersCleansedResult1')
    ).toBeInTheDocument();
    expect(mockForm.getValues).toHaveBeenCalledTimes(2);
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
      screen.getByText('calculateMentalLayersCleansedResult2')
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

    expect(formatTime).toHaveBeenCalledWith({
      totalMinutes: 30,
      grammarCaseConfig: expect.anything(),
      t: expect.any(Function),
      language: 'en'
    });
    expect(
      screen.getByText('calculateMentalLayersCleansedResult1')
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
      screen.getByText('calculateMentalLayersCleansedResult1')
    ).toBeInTheDocument();
    expect(
      screen.getByText('calculateMentalLayersCleansedResult2')
    ).toBeInTheDocument();
    expect(WaterExposureWarningMock).toHaveBeenCalledWith(
      {
        temperature: 10,
        duration: 60
      },
      undefined
    );
  });

  it('shows overextending message when result > MENTAL_LAYER_AMOUNT', () => {
    const result = MENTAL_LAYER_AMOUNT + 1;

    render(
      <CalculateMentalLayersCleansedFormResult
        result={result}
        form={mockForm}
      />
    );

    expect(
      screen.getByText('calculateMentalLayersCleansedOverextending')
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
      screen.getByText('calculateMentalLayersCleansedResult1')
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
      screen.getByText('calculateMentalLayersCleansedResult1')
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
      screen.getByText('calculateMentalLayersCleansedResult1')
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
