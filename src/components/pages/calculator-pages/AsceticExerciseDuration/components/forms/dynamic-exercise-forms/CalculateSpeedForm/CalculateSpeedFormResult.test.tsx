import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateSpeedFormResult,
  CalculateSpeedFormResultProps
} from './CalculateSpeedFormResult';
import { getIsWalking } from '../../../../utils/dynamicExerciseUtils';
import { formatTime } from '@/utils/i18n';
import { MENTAL_LAYER_AMOUNT } from '../../../../constants/contants';
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

describe('CalculateSpeedFormResult', () => {
  const getValues = jest.fn().mockImplementation(() => ({
    mentalLayers: 3,
    duration: 1800 // 30 minutes in seconds
  }));

  const mockForm = {
    getValues
  } as unknown as CalculateSpeedFormResultProps['form'];

  beforeEach(() => {
    jest.clearAllMocks();
    formatTimeMock.mockReturnValue('30 minutes');

    // Set default movement translations
    useMovementTranslationMock.mockImplementation((speed) => ({
      baseMovementTranslation: getIsWalking(speed) ? 'walk' : 'run',
      gerundMovementTranslation: getIsWalking(speed) ? 'walking' : 'running'
    }));
  });

  test('renders walking message when speed indicates walking', () => {
    getIsWalkingMock.mockReturnValue(true);
    const result = 5; // 5 km/h (walking speed)

    render(<CalculateSpeedFormResult result={result} form={mockForm} />);

    expect(screen.getByText(/calculateSpeedResult/)).toBeInTheDocument();

    expect(getIsWalking).toHaveBeenCalledWith(result);
    expect(formatTime).toHaveBeenCalledWith({
      totalMinutes: 1800,
      grammarCaseConfig: expect.anything(),
      t: expect.any(Function),
      language: 'en'
    });
  });

  test('renders running message when speed indicates running', () => {
    getIsWalkingMock.mockReturnValue(false);
    const result = 10; // 10 km/h (running speed)

    render(<CalculateSpeedFormResult result={result} form={mockForm} />);

    expect(screen.getByText(/calculateSpeedResult/)).toBeInTheDocument();

    expect(getIsWalking).toHaveBeenCalledWith(result);
  });

  test('does not show warning for achievable speeds', () => {
    getIsWalkingMock.mockReturnValue(false);
    const result = 15; // 15 km/h (achievable running speed)

    render(<CalculateSpeedFormResult result={result} form={mockForm} />);

    expect(screen.queryByText(/speedHardToAchieve/)).not.toBeInTheDocument();
  });

  test('shows warning for speeds that are hard to achieve', () => {
    getIsWalkingMock.mockReturnValue(false);
    const result = 50; // 50 km/h (unrealistic speed)

    render(<CalculateSpeedFormResult result={result} form={mockForm} />);

    expect(screen.getByText(/speedHardToAchieve/)).toBeInTheDocument();
  });

  test('uses correct form values in the message', () => {
    getIsWalkingMock.mockReturnValue(false);
    getValues.mockImplementation(() => ({
      mentalLayers: MENTAL_LAYER_AMOUNT,
      duration: 3600 // 1 hour in seconds
    }));
    formatTimeMock.mockReturnValue('1 hour');
    const result = 12;

    render(<CalculateSpeedFormResult result={result} form={mockForm} />);

    expect(screen.getByText(/calculateSpeedResult/)).toBeInTheDocument();
  });
});
