import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateTotalTimeFormResult,
  CalculateTotalTimeFormResultProps
} from './CalculateTotalTimeFormResult';
import { getIsWalking } from '../../../../utils/dynamicExerciseUtils';
import { MENTAL_LAYER_AMOUNT } from '../../../../constants/contants';
import { formatTime } from '@/utils/i18n';
import { useMovementTranslation } from '../../../../hooks/useMovementTranslation';

// Mock formatTime
jest.mock('@/utils/i18n', () => ({
  formatTime: jest.fn()
}));

// Mock dynamicExerciseUtils
jest.mock('../../../../utils/dynamicExerciseUtils', () => ({
  getIsWalking: jest.fn()
}));

// Mock useMovementTranslation hook
jest.mock('../../../../hooks/useMovementTranslation', () => ({
  useMovementTranslation: jest.fn()
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
const getIsWalkingMock = getIsWalking as jest.Mock;
const useMovementTranslationMock = useMovementTranslation as jest.Mock;

describe('CalculateTotalTimeFormResult', () => {
  const getValues = jest.fn().mockImplementation(() => ({
    mentalLayers: 3,
    speed: 5
  }));

  const mockForm = {
    getValues
  } as unknown as CalculateTotalTimeFormResultProps['form'];

  beforeEach(() => {
    jest.clearAllMocks();
    formatTimeMock.mockImplementation(
      ({ totalMinutes }) => `${totalMinutes} minutes`
    );

    // Set default movement translations
    useMovementTranslationMock.mockImplementation((speed) => ({
      baseMovementTranslation: getIsWalking(speed) ? 'walk' : 'run',
      gerundMovementTranslation: getIsWalking(speed) ? 'walking' : 'running'
    }));
  });

  it('renders walking message when speed indicates walking', () => {
    getIsWalkingMock.mockReturnValue(true);
    const result = 45;

    render(<CalculateTotalTimeFormResult result={result} form={mockForm} />);

    expect(getIsWalking).toHaveBeenCalledWith(5);
    expect(formatTime).toHaveBeenCalledWith({
      totalMinutes: 45,
      grammarCaseConfig: expect.anything(),
      t: expect.any(Function),
      language: 'en'
    });
    expect(screen.getByText(/calculateTotalTimeResult/)).toBeInTheDocument();
  });

  it('renders running message when speed indicates running', () => {
    getIsWalkingMock.mockReturnValue(false);
    const result = 30;

    render(<CalculateTotalTimeFormResult result={result} form={mockForm} />);

    expect(getIsWalking).toHaveBeenCalledWith(5);
    expect(formatTime).toHaveBeenCalledWith({
      totalMinutes: 30,
      grammarCaseConfig: expect.anything(),
      t: expect.any(Function),
      language: 'en'
    });
    expect(screen.getByText(/calculateTotalTimeResult/)).toBeInTheDocument();
  });

  it('uses values from form correctly', () => {
    getIsWalkingMock.mockReturnValue(true);
    const result = 60;
    getValues.mockImplementation(() => ({
      mentalLayers: MENTAL_LAYER_AMOUNT,
      speed: 7
    }));

    render(<CalculateTotalTimeFormResult result={result} form={mockForm} />);

    expect(getIsWalking).toHaveBeenCalledWith(7);
    expect(formatTime).toHaveBeenCalledWith({
      totalMinutes: 60,
      grammarCaseConfig: expect.anything(),
      t: expect.any(Function),
      language: 'en'
    });
    expect(screen.getByText(/calculateTotalTimeResult/)).toBeInTheDocument();

    expect(mockForm.getValues).toHaveBeenCalledTimes(2);
  });
});
