import {
  dynamicExerciseDurationCalculator,
  DynamicExerciseDurationCalculator
} from './DynamicExerciseDurationService';

jest.mock('./CleansingCyclesCalculator', () => ({
  CleansingCyclesCalculator: jest.fn().mockImplementation(() => ({
    calculateAll: jest
      .fn()
      .mockImplementation(({ cycleTime, totalTimeMinutes }) => ({
        cycleTime,
        completedCycles: Math.floor(totalTimeMinutes / cycleTime),
        minutesUntilNextCycle: totalTimeMinutes % cycleTime,
        minutesTo5Cycles:
          5 * cycleTime - totalTimeMinutes > 0
            ? 5 * cycleTime - totalTimeMinutes
            : 0,
        recommendedFrequencyDays: 7
      }))
  }))
}));

describe('DynamicExerciseDurationCalculator', () => {
  let calculator: DynamicExerciseDurationCalculator;

  beforeEach(() => {
    calculator = new DynamicExerciseDurationCalculator();
  });

  describe('exported singleton instance', () => {
    it('should be an instance of DynamicExerciseDurationCalculator', () => {
      expect(dynamicExerciseDurationCalculator).toBeInstanceOf(
        DynamicExerciseDurationCalculator
      );
    });

    it('should have the same behavior as a new instance', () => {
      // Test a method to ensure the singleton works correctly
      const singletonResult =
        dynamicExerciseDurationCalculator.calculateCleansingCycles(4, 60);
      const newInstanceResult = calculator.calculateCleansingCycles(4, 60);

      expect(singletonResult).toEqual(newInstanceResult);
    });
  });

  describe('calculateCleansingCycles', () => {
    it('should calculate cleansing cycles correctly', () => {
      // Given a speed of 4 km/h and 60 minutes total time
      // With distancePerCleansingCycle = 4, one cycle takes 60 minutes
      const result = calculator.calculateCleansingCycles(4, 60);

      // Verify the cycle time calculation
      expect(result.cycleTime).toBe(60); // 4km at 4km/h = 60 minutes

      expect(
        // @ts-expect-error Testing private method to verify that CleansingCyclesCalculator was called with correct parameters
        calculator.cleansingCyclesCalculator.calculateAll
      ).toHaveBeenCalledWith({
        cycleTime: 60,
        totalTimeMinutes: 60
      });
    });

    it('should handle different speeds', () => {
      // Given a speed of 8 km/h and 60 minutes total time
      // With distancePerCleansingCycle = 4, one cycle takes 30 minutes
      const result = calculator.calculateCleansingCycles(8, 60);

      expect(result.cycleTime).toBe(30); // 4km at 8km/h = 30 minutes
    });
  });

  describe('calculateTotalTime', () => {
    it('should calculate total time correctly', () => {
      // Given a speed of 4 km/h and 3 cycles
      // With distancePerCleansingCycle = 4, one cycle takes 60 minutes
      const totalTime = calculator.calculateTotalTime(4, 3);

      expect(totalTime).toBe(180); // 3 cycles * 60 minutes = 180 minutes
    });

    it('should handle different speeds and cycle counts', () => {
      // Given a speed of 8 km/h and 5 cycles
      // With distancePerCleansingCycle = 4, one cycle takes 30 minutes
      const totalTime = calculator.calculateTotalTime(8, 5);

      expect(totalTime).toBe(150); // 5 cycles * 30 minutes = 150 minutes
    });
  });

  describe('calculateSpeedFromCyclesAndTime', () => {
    it('should calculate speed correctly', () => {
      // Given 2 cycles in 120 minutes
      // With distancePerCleansingCycle = 4, each cycle is 60 minutes
      // So speed should be 4 km/h
      const speed = calculator.calculateSpeedFromCyclesAndTime(2, 120);

      expect(speed).toBe(4);
    });

    it('should handle different cycle counts and times', () => {
      // Given 3 cycles in 90 minutes
      // With distancePerCleansingCycle = 4, each cycle is 30 minutes
      // So speed should be 8 km/h
      const speed = calculator.calculateSpeedFromCyclesAndTime(3, 90);

      expect(speed).toBe(8);
    });

    it('should round speed to two decimal places', () => {
      // Given 3 cycles in 100 minutes
      // With distancePerCleansingCycle = 4, each cycle is 33.33 minutes
      // So speed should be approximately 7.2 km/h
      const speed = calculator.calculateSpeedFromCyclesAndTime(3, 100);

      expect(speed).toBe(7.2);
    });
  });
});
