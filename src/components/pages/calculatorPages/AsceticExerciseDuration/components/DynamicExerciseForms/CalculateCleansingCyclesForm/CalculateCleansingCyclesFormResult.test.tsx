import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  CalculateCleansingCyclesFormResult,
  CalculateCleansingCyclesFormResultProps
} from './CalculateCleansingCyclesFormResult';
import { formatTime } from '@/utils/timeUtils';
import { getIsWalking } from '../../../hooks/useMovementTranslation';

jest.mock('@/utils/timeUtils', () => ({
  formatTime: jest.fn((minutes) => `${minutes} minutes`)
}));

jest.mock('../../../utils/dynamicExerciseUtils/utils', () => ({
  getIsWalking: jest.fn()
}));

const getIsWalkingMock = getIsWalking as jest.Mock;

describe('CalculateCleansingCyclesFormResult', () => {
  const getValues = jest.fn().mockReturnValue({ speed: 5, duration: 30 });

  const mockForm = {
    getValues
  } as unknown as CalculateCleansingCyclesFormResultProps['form'];

  beforeEach(() => {
    jest.clearAllMocks();
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

      expect(
        screen.getByText(/after walking for 30 minutes/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/you will have 3 mental layers cleaned/i)
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          /you have to walk 10 minutes more to clean 1 more mental layer/i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /you will have to walk 25 minutes more to clean all mental layers/i
        )
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          /it is recommended to do this exercise once every 2 days/i
        )
      ).toBeInTheDocument();

      expect(formatTime).toHaveBeenCalledWith(30);
      expect(formatTime).toHaveBeenCalledWith(25);
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

      expect(
        screen.getByText(/after walking for 30 minutes/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/you will have all 5 of your mental layers cleaned/i)
      ).toBeInTheDocument();

      expect(
        screen.queryByText(/you have to walk .* minutes more/i)
      ).not.toBeInTheDocument();

      expect(
        screen.getByText(
          /it is recommended to do this exercise once every 3 days/i
        )
      ).toBeInTheDocument();
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

      expect(
        screen.getByText(/after running for 20 minutes/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/you have to run 5 minutes more/i)
      ).toBeInTheDocument();
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
        screen.getByText(/after walking for 75 minutes/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/you will have all 5 of your mental layers cleaned/i)
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          /it is recommended to limit this exercise to 45 minutes/i
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /avoid overexertion, excessive exercising can be counterproductive/i
        )
      ).toBeInTheDocument();

      expect(
        screen.queryByText(/it is recommended to do this exercise once every/i)
      ).not.toBeInTheDocument();
    });
  });
});
