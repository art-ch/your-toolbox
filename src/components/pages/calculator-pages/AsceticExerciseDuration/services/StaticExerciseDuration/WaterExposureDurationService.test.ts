import {
  waterExposureDurationCalculator,
  WaterExposureDurationCalculator
} from './WaterExposureDurationService';

describe('WaterExposureDurationCalculator', () => {
  let calculator: WaterExposureDurationCalculator;

  beforeEach(() => {
    calculator = new WaterExposureDurationCalculator();
  });

  describe('exported singleton instance', () => {
    it('should be an instance of DynamicExerciseDurationCalculator', () => {
      expect(waterExposureDurationCalculator).toBeInstanceOf(
        WaterExposureDurationCalculator
      );
    });

    it('should have the same behavior as a new instance', () => {
      // Test a method to ensure the singleton works correctly
      const singletonResult =
        waterExposureDurationCalculator.calculateMentalLayersCleansed(10, 3);
      const newInstanceResult = calculator.calculateMentalLayersCleansed(10, 3);

      expect(singletonResult).toEqual(newInstanceResult);
    });
  });

  describe('calculateMentalLayersCleansed', () => {
    it('should calculate mental layers cleansed correctly for exact data points', () => {
      // At 10°C, 3 minutes cleanses 1 mental layer
      expect(calculator.calculateMentalLayersCleansed(10, 3)).toBe(1);

      // At 10°C, 6 minutes cleanses 2 mental layers
      expect(calculator.calculateMentalLayersCleansed(10, 6)).toBe(2);

      // At 20°C, 6 minutes cleanses 1 mental layer
      expect(calculator.calculateMentalLayersCleansed(20, 6)).toBe(1);

      // At 20°C, 12 minutes cleanses 2 mental layers
      expect(calculator.calculateMentalLayersCleansed(20, 12)).toBe(2);
    });

    it('should handle interpolated temperatures', () => {
      // At 12.5°C (between 10°C and 15°C), the time for one layer should be between 3 and 4 minutes
      // Let's say it's 3.5 minutes, so 7 minutes should cleanse 2 layers
      expect(calculator.calculateMentalLayersCleansed(12.5, 7)).toBe(2);

      // At 17.5°C (between 15°C and 20°C), the time for one layer should be between 4 and 6 minutes
      // Let's say it's 5 minutes, so 7.5 minutes should cleanse 1 layer
      expect(calculator.calculateMentalLayersCleansed(17.5, 7.5)).toBe(1);
    });

    it('should handle temperatures at the edges of the data range', () => {
      // At 3.5°C (minimum temperature in data), 1 minute cleanses 1 mental layer
      expect(calculator.calculateMentalLayersCleansed(3.5, 1)).toBe(1);

      // At 40°C (maximum temperature in data), 20 minutes cleanses 1 mental layer
      expect(calculator.calculateMentalLayersCleansed(40, 20)).toBe(1);
    });
  });

  describe('calculateTotalExposureTime', () => {
    it('should calculate exposure time correctly for exact data points', () => {
      // At 10°C, 1 mental layer takes 3 minutes
      expect(calculator.calculateTotalExposureTime(10, 1)).toBe(3);

      // At 10°C, 2 mental layers take 6 minutes
      expect(calculator.calculateTotalExposureTime(10, 2)).toBe(6);

      // At 20°C, 1 mental layer takes 6 minutes
      expect(calculator.calculateTotalExposureTime(20, 1)).toBe(6);

      // At 20°C, 2 mental layers take 12 minutes
      expect(calculator.calculateTotalExposureTime(20, 2)).toBe(12);
    });

    it('should handle interpolated temperatures', () => {
      // At 12.5°C (between 10°C and 15°C), the time for one layer should be between 3 and 4 minutes
      const timeAt12_5 = calculator.calculateTotalExposureTime(12.5, 1);
      expect(timeAt12_5).toBeGreaterThan(3);
      expect(timeAt12_5).toBeLessThan(4);

      // At 17.5°C (between 15°C and 20°C), the time for one layer should be between 4 and 6 minutes
      const timeAt17_5 = calculator.calculateTotalExposureTime(17.5, 1);
      expect(timeAt17_5).toBeGreaterThan(4);
      expect(timeAt17_5).toBeLessThan(6);
    });

    it('should handle temperatures at the edges of the data range', () => {
      // At 3.5°C (minimum temperature in data), 1 mental layer takes 1 minute
      expect(calculator.calculateTotalExposureTime(3.5, 1)).toBe(1);

      // At 40°C (maximum temperature in data), 1 mental layer takes 20 minutes
      expect(calculator.calculateTotalExposureTime(40, 1)).toBe(20);
    });
  });

  describe('calculateRequiredTemperature', () => {
    it('should calculate required temperature correctly for exact data points', () => {
      // For 1 mental layer in 3 minutes, temperature should be 10°C
      expect(calculator.calculateRequiredTemperature(1, 3)).toBe(10);

      // For 1 mental layer in 6 minutes, temperature should be 20°C
      expect(calculator.calculateRequiredTemperature(1, 6)).toBe(20);

      // For 1 mental layer in 16 minutes, temperature should be 30°C
      expect(calculator.calculateRequiredTemperature(1, 16)).toBe(30);
    });

    it('should handle interpolated durations', () => {
      // For 1 mental layer in 3.5 minutes (between 3 and 4 minutes),
      // temperature should be between 10°C and 15°C
      const tempFor3_5min = calculator.calculateRequiredTemperature(1, 3.5);
      expect(tempFor3_5min).toBeGreaterThan(10);
      expect(tempFor3_5min).toBeLessThan(15);

      // For 1 mental layer in 5 minutes (between 4 and 6 minutes),
      // temperature should be between 15°C and 20°C
      const tempFor5min = calculator.calculateRequiredTemperature(1, 5);
      expect(tempFor5min).toBeGreaterThan(15);
      expect(tempFor5min).toBeLessThan(20);
    });

    it('should handle multiple mental layers', () => {
      // For 2 mental layers in 6 minutes (3 min per layer), temperature should be 10°C
      expect(calculator.calculateRequiredTemperature(2, 6)).toBe(10);

      // For 3 mental layers in 18 minutes (6 min per layer), temperature should be 20°C
      expect(calculator.calculateRequiredTemperature(3, 18)).toBe(20);
    });

    it('should handle edge cases', () => {
      // For very short exposure times that might be at the edge of the data range
      const tempForShortTime = calculator.calculateRequiredTemperature(1, 1);
      expect(tempForShortTime).toBe(3.5); // Should be the lowest temperature in the data

      // For very long exposure times that might be at the edge of the data range
      const tempForLongTime = calculator.calculateRequiredTemperature(1, 20);
      expect(tempForLongTime).toBe(40); // Should be the highest temperature in the data
    });
  });
});
