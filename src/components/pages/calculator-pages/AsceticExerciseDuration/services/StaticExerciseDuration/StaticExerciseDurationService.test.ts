import {
  staticExerciseDurationCalculator,
  StaticExerciseDurationCalculator
} from './StaticExerciseDurationService';

describe('StaticExerciseDurationCalculator', () => {
  let calculator: StaticExerciseDurationCalculator;

  beforeEach(() => {
    calculator = new StaticExerciseDurationCalculator();
  });

  describe('exported singleton instance', () => {
    it('should be an instance of DynamicExerciseDurationCalculator', () => {
      expect(staticExerciseDurationCalculator).toBeInstanceOf(
        StaticExerciseDurationCalculator
      );
    });

    it('should have the same behavior as a new instance', () => {
      // Test a method to ensure the singleton works correctly
      const singletonResult =
        staticExerciseDurationCalculator.calculateDurationFromLayers(1);
      const newInstanceResult = calculator.calculateDurationFromLayers(1);

      expect(singletonResult).toEqual(newInstanceResult);
    });
  });

  describe('calculateDurationFromLayers', () => {
    it('should calculate exact durations for known data points', () => {
      expect(calculator.calculateDurationFromLayers(1)).toBe(14);
      expect(calculator.calculateDurationFromLayers(2)).toBe(27);
      expect(calculator.calculateDurationFromLayers(3)).toBe(39);
      expect(calculator.calculateDurationFromLayers(4)).toBe(52);
      expect(calculator.calculateDurationFromLayers(5)).toBe(64);
    });
  });

  describe('calculateLayersFromDuration', () => {
    it('should calculate exact layers for known durations', () => {
      expect(calculator.calculateLayersFromDuration(14)).toBe(1);
      expect(calculator.calculateLayersFromDuration(27)).toBe(2);
      expect(calculator.calculateLayersFromDuration(39)).toBe(3);
      expect(calculator.calculateLayersFromDuration(52)).toBe(4);
      expect(calculator.calculateLayersFromDuration(64)).toBe(5);
    });

    it('should interpolate and floor layers for values between data points', () => {
      expect(calculator.calculateLayersFromDuration(20)).toBe(1); // ~1.46 -> floor to 1
      expect(calculator.calculateLayersFromDuration(30)).toBe(2); // ~2.23 -> floor to 2
      expect(calculator.calculateLayersFromDuration(45)).toBe(3); // ~3.46 -> floor to 3
      expect(calculator.calculateLayersFromDuration(60)).toBe(4); // ~4.62 -> floor to 4
    });

    it('should handle edge cases where interpolation is just below the next integer', () => {
      expect(calculator.calculateLayersFromDuration(26.9)).toBe(1); // Just below 2
      expect(calculator.calculateLayersFromDuration(38.9)).toBe(2); // Just below 3
      expect(calculator.calculateLayersFromDuration(51.9)).toBe(3); // Just below 4
      expect(calculator.calculateLayersFromDuration(63.9)).toBe(4); // Just below 5
    });

    it('should extrapolate for values outside the defined range', () => {
      // For values less than the minimum
      expect(calculator.calculateLayersFromDuration(7)).toBe(0); // Extrapolated to ~0.5, floored to 0

      // For values greater than the maximum
      expect(calculator.calculateLayersFromDuration(76)).toBe(5); // Extrapolated to ~6, floored to 5 (since we're using Math.floor)
      expect(calculator.calculateLayersFromDuration(90)).toBe(6); // Extrapolated to ~7, floored to 6
    });
  });
});
