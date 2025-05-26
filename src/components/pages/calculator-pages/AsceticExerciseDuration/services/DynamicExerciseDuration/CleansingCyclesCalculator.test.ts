import { CleansingCyclesCalculator } from './CleansingCyclesCalculator';

describe('CleansingCyclesCalculator', () => {
  let calculator: CleansingCyclesCalculator;

  const DEFAULT_CYCLE_TIME = 48; // walking speed is 5km/h

  beforeEach(() => {
    calculator = new CleansingCyclesCalculator();
  });

  describe('calculateAll', () => {
    it('should calculate correctly for minimum valid input', () => {
      const result = calculator.calculateAll({
        cycleTime: 120, // walking speed is 2km/h
        totalTimeMinutes: 1
      });

      expect(result).toEqual({
        cycleTime: 120,
        completedCycles: 0,
        minutesTo5Cycles: 599,
        minutesUntilNextCycle: 119,
        recommendedExerciseMinutes: 1,
        recommendedFrequencyDays: 1
      });
    });

    it('should calculate correctly for partial cycle completion', () => {
      const result = calculator.calculateAll({
        cycleTime: DEFAULT_CYCLE_TIME,
        totalTimeMinutes: 25
      });

      expect(result).toEqual({
        cycleTime: DEFAULT_CYCLE_TIME,
        completedCycles: 0,
        minutesTo5Cycles: 215,
        minutesUntilNextCycle: 23,
        recommendedExerciseMinutes: 25,
        recommendedFrequencyDays: 1
      });
    });

    it('should calculate correctly for exact single cycle completion', () => {
      const result = calculator.calculateAll({
        cycleTime: DEFAULT_CYCLE_TIME,
        totalTimeMinutes: 48
      });

      expect(result).toEqual({
        cycleTime: DEFAULT_CYCLE_TIME,
        completedCycles: 1,
        minutesTo5Cycles: 192,
        minutesUntilNextCycle: 48,
        recommendedExerciseMinutes: 48,
        recommendedFrequencyDays: 1
      });
    });

    it('should calculate correctly for multiple partial cycles', () => {
      const result = calculator.calculateAll({
        cycleTime: DEFAULT_CYCLE_TIME,
        totalTimeMinutes: 130
      });

      expect(result).toEqual({
        cycleTime: DEFAULT_CYCLE_TIME,
        completedCycles: 2,
        minutesTo5Cycles: 110,
        minutesUntilNextCycle: 14,
        recommendedExerciseMinutes: 130,
        recommendedFrequencyDays: 3
      });
    });

    it('should calculate correctly for exact multiple cycles', () => {
      const result = calculator.calculateAll({
        cycleTime: DEFAULT_CYCLE_TIME,
        totalTimeMinutes: 144
      });

      expect(result).toEqual({
        cycleTime: DEFAULT_CYCLE_TIME,
        completedCycles: 3,
        minutesTo5Cycles: 96,
        minutesUntilNextCycle: 48,
        recommendedExerciseMinutes: 144,
        recommendedFrequencyDays: 4
      });
    });

    it('should calculate correctly for just before 5 cycles', () => {
      const result = calculator.calculateAll({
        cycleTime: DEFAULT_CYCLE_TIME,
        totalTimeMinutes: 239
      });

      expect(result).toEqual({
        cycleTime: DEFAULT_CYCLE_TIME,
        completedCycles: 4,
        minutesTo5Cycles: 1,
        minutesUntilNextCycle: 1,
        recommendedExerciseMinutes: 239,
        recommendedFrequencyDays: 6
      });
    });

    it('should calculate correctly for exactly 5 cycles', () => {
      const result = calculator.calculateAll({
        cycleTime: DEFAULT_CYCLE_TIME,
        totalTimeMinutes: 240
      });

      expect(result).toEqual({
        cycleTime: DEFAULT_CYCLE_TIME,
        completedCycles: 5,
        minutesTo5Cycles: 0,
        minutesUntilNextCycle: 48,
        recommendedExerciseMinutes: 240,
        recommendedFrequencyDays: 7
      });
    });

    it('should calculate correctly for beyond 5 cycles', () => {
      const result = calculator.calculateAll({
        cycleTime: DEFAULT_CYCLE_TIME,
        totalTimeMinutes: 380
      });

      expect(result).toEqual({
        cycleTime: DEFAULT_CYCLE_TIME,
        completedCycles: 7,
        minutesTo5Cycles: -1,
        minutesUntilNextCycle: 4,
        recommendedExerciseMinutes: 240,
        recommendedFrequencyDays: 7
      });
    });

    it('should calculate correctly for different cycle time', () => {
      const result = calculator.calculateAll({
        cycleTime: 20, // running at 12 km/h
        totalTimeMinutes: 45
      });

      expect(result).toEqual({
        cycleTime: 20,
        completedCycles: 2,
        minutesTo5Cycles: 55,
        minutesUntilNextCycle: 15,
        recommendedExerciseMinutes: 45,
        recommendedFrequencyDays: 3
      });
    });

    it('should calculate correctly for maximum valid input', () => {
      const result = calculator.calculateAll({
        cycleTime: 5,
        totalTimeMinutes: 10000
      });

      expect(result).toEqual({
        cycleTime: 5,
        completedCycles: 2000,
        minutesTo5Cycles: -1,
        minutesUntilNextCycle: 5,
        recommendedExerciseMinutes: 25,
        recommendedFrequencyDays: 7
      });
    });
  });
});
