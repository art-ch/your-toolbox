import { renderHook } from '@testing-library/react';
import { useMovementTranslation } from './useMovementTranslation';
import { getIsWalking } from '../utils/dynamicExerciseUtils';
import { RUNNING_SPEED } from '../constants/DynamicExercise.constants';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key // Simple key-return mock
  })
}));

// Mock the getIsWalking utility
jest.mock('../utils/dynamicExerciseUtils', () => ({
  getIsWalking: jest.fn()
}));

const getIsWalkingMock = getIsWalking as jest.Mock;

describe('useMovementTranslation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return walking translations when speed indicates walking', () => {
    getIsWalkingMock.mockReturnValue(true);

    const { result } = renderHook(() =>
      useMovementTranslation(RUNNING_SPEED - 1)
    );

    expect(getIsWalking).toHaveBeenCalledWith(RUNNING_SPEED - 1);
    expect(result.current).toEqual({
      baseMovementTranslation: 'walk',
      gerundMovementTranslation: 'walking'
    });
  });

  it('should return running translations when speed indicates running', () => {
    getIsWalkingMock.mockReturnValue(false);

    const { result } = renderHook(() =>
      useMovementTranslation(RUNNING_SPEED + 1)
    );

    expect(getIsWalking).toHaveBeenCalledWith(RUNNING_SPEED + 1);
    expect(result.current).toEqual({
      baseMovementTranslation: 'run',
      gerundMovementTranslation: 'running'
    });
  });

  it('should return running translations when speed is exactly at the running threshold', () => {
    getIsWalkingMock.mockReturnValue(false);

    const { result } = renderHook(() => useMovementTranslation(RUNNING_SPEED));

    expect(getIsWalking).toHaveBeenCalledWith(RUNNING_SPEED);
    expect(result.current).toEqual({
      baseMovementTranslation: 'run',
      gerundMovementTranslation: 'running'
    });
  });

  it('should handle different translations from i18n correctly', () => {
    getIsWalkingMock.mockReturnValue(true);

    const { result } = renderHook(() => useMovementTranslation(5));

    expect(getIsWalking).toHaveBeenCalledWith(5);
    expect(result.current.baseMovementTranslation).toBeDefined();
    expect(result.current.gerundMovementTranslation).toBeDefined();
  });

  it('should work with extreme speed values', () => {
    // Test with very low speed
    getIsWalkingMock.mockReturnValue(true);

    const { result: lowSpeedResult } = renderHook(() =>
      useMovementTranslation(2)
    );

    expect(getIsWalking).toHaveBeenCalledWith(2);
    expect(lowSpeedResult.current).toEqual({
      baseMovementTranslation: 'walk',
      gerundMovementTranslation: 'walking'
    });

    // Test with very high speed
    getIsWalkingMock.mockReturnValue(false);

    const { result: highSpeedResult } = renderHook(() =>
      useMovementTranslation(45)
    );

    expect(getIsWalking).toHaveBeenCalledWith(45);
    expect(highSpeedResult.current).toEqual({
      baseMovementTranslation: 'run',
      gerundMovementTranslation: 'running'
    });
  });
});
