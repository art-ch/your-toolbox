import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateCleansingCyclesFormResult,
  CalculateCleansingCyclesFormResultProps
} from './CalculateCleansingCyclesFormResult';
import { formatTime, formatDays } from '@/utils/i18n';
import { getIsWalking } from '../../../../utils/dynamicExerciseUtils';
import { useMovementTranslation } from '../../../../hooks/useMovementTranslation';

// Mock formatTime and formatDays
jest.mock('@/utils/i18n', () => ({
  formatTime: jest
    .fn()
    .mockImplementation(({ totalMinutes }) => `${totalMinutes} minutes`),
  formatDays: jest.fn().mockImplementation((days) => `${days} days`)
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

const getIsWalkingMock = getIsWalking as jest.Mock;
const useMovementTranslationMock = useMovementTranslation as jest.Mock;

describe('CalculateCleansingCyclesFormResult', () => {
  const getValues = jest.fn().mockReturnValue({ speed: 5, duration: 30 });

  const mockForm = {
    getValues
  } as unknown as CalculateCleansingCyclesFormResultProps['form'];

  beforeEach(() => {
    jest.clearAllMocks();
    // Set default movement translations
    useMovementTranslationMock.mockImplementation((speed) => ({
      baseMovementTranslation: getIsWalking(speed) ? 'walk' : 'run',
      gerundMovementTranslation: getIsWalking(speed) ? 'walking' : 'running'
    }));
  });

  describe('Normal exercise scenario', () => {
    beforeEach(() => {
      getIsWalkingMock.mockReturnValue(true);
    });

    it('displays correct information when more exercise is needed for all cycles', () => {
      const result = {
        cycleTime: 1,
        completedCycles: 3,
        totalDistance: 2.5,
        minutesUntilNextCycle: 10,
        minutesTo5Cycles: 25,
        recommendedFrequencyDays: 2,
        recommendedExerciseMinutes: 45
      };

      render(
        <CalculateCleansingCyclesFormResult result={result} form={mockForm} />
      );

      expect(screen.getByText('movedForDuration')).toBeInTheDocument();
      expect(screen.getByText('movedForDurationResult')).toBeInTheDocument();

      expect(screen.getByText('okayToExerciseMore1')).toBeInTheDocument();
      expect(screen.getByText('okayToExerciseMore2')).toBeInTheDocument();

      expect(screen.getByText('recommendedExerciseTime')).toBeInTheDocument();

      expect(formatTime).toHaveBeenCalledWith({
        totalMinutes: 25,
        grammarCaseConfig: expect.anything(),
        t: expect.any(Function),
        language: 'en'
      });
      expect(formatDays).toHaveBeenCalledWith(2, expect.anything());
    });

    it('displays correct information when all mental layers are cleaned', () => {
      const result = {
        cycleTime: 1,
        completedCycles: 5,
        totalDistance: 4.0,
        minutesUntilNextCycle: 0,
        minutesTo5Cycles: 0,
        recommendedFrequencyDays: 3,
        recommendedExerciseMinutes: 60
      };

      render(
        <CalculateCleansingCyclesFormResult result={result} form={mockForm} />
      );

      expect(screen.getByText('movedForDuration')).toBeInTheDocument();
      expect(screen.getByText('movedForDurationResult')).toBeInTheDocument();
      expect(screen.getByText('recommendedExerciseTime')).toBeInTheDocument();
    });
  });

  describe('Running scenario', () => {
    beforeEach(() => {
      getIsWalkingMock.mockReturnValue(false); // Running
      getValues.mockReturnValue({
        speed: 10,
        duration: 20
      });
    });

    it('displays running-specific text', () => {
      const result = {
        cycleTime: 1,
        completedCycles: 4,
        totalDistance: 3.3,
        minutesUntilNextCycle: 5,
        minutesTo5Cycles: 5,
        recommendedFrequencyDays: 2,
        recommendedExerciseMinutes: 25
      };

      render(
        <CalculateCleansingCyclesFormResult result={result} form={mockForm} />
      );

      expect(screen.getByText('movedForDuration')).toBeInTheDocument();
      expect(screen.getByText('recommendedExerciseTime')).toBeInTheDocument();
      expect(screen.getByText('okayToExerciseMore1')).toBeInTheDocument();
      expect(screen.getByText('okayToExerciseMore2')).toBeInTheDocument();
    });
  });

  describe('Overextending scenario', () => {
    it('displays overextending warnings', () => {
      const result = {
        cycleTime: 1,
        completedCycles: 5,
        totalDistance: 5.0,
        minutesUntilNextCycle: 0,
        minutesTo5Cycles: -15,
        recommendedFrequencyDays: 4,
        recommendedExerciseMinutes: 45
      };

      getIsWalkingMock.mockReturnValue(true);
      getValues.mockReturnValue({
        speed: 5,
        duration: 75
      });

      render(
        <CalculateCleansingCyclesFormResult result={result} form={mockForm} />
      );

      expect(
        screen.getByText('recommendedExerciseTimeOverextended1')
      ).toBeInTheDocument();
      expect(
        screen.getByText('recommendedExerciseTimeOverextended2')
      ).toBeInTheDocument();
    });
  });
});
