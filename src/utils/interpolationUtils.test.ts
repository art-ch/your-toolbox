import { InterpolationUtils } from './interpolationUtils';

describe('InterpolationUtils', () => {
  describe('interpolateY', () => {
    const dataPoints = [
      { x: 0, y: 0 },
      { x: 10, y: 20 },
      { x: 20, y: 30 },
      { x: 30, y: 50 }
    ];

    it('should interpolate y value at exact data point', () => {
      expect(InterpolationUtils.interpolateY(10, dataPoints)).toBe(20);
      expect(InterpolationUtils.interpolateY(20, dataPoints)).toBe(30);
    });

    it('should interpolate y value between data points', () => {
      expect(InterpolationUtils.interpolateY(5, dataPoints)).toBe(10);
      expect(InterpolationUtils.interpolateY(15, dataPoints)).toBe(25);
      expect(InterpolationUtils.interpolateY(25, dataPoints)).toBe(40);
    });

    it('should handle x value below the range', () => {
      expect(InterpolationUtils.interpolateY(-5, dataPoints)).toBe(-10);
    });

    it('should handle x value above the range', () => {
      expect(InterpolationUtils.interpolateY(35, dataPoints)).toBe(70);
    });

    it('should respect precision parameter', () => {
      const complexDataPoints = [
        { x: 0, y: 0 },
        { x: 10, y: 33.333 }
      ];

      expect(InterpolationUtils.interpolateY(5, complexDataPoints, 0)).toBe(17);
      expect(InterpolationUtils.interpolateY(5, complexDataPoints, 1)).toBe(
        16.7
      );
      expect(InterpolationUtils.interpolateY(5, complexDataPoints, 3)).toBe(
        16.667
      );
    });

    it('should handle single data point', () => {
      const singlePoint = [{ x: 5, y: 10 }];
      expect(() => InterpolationUtils.interpolateY(7, singlePoint)).toThrow();
    });
  });

  describe('interpolateX', () => {
    const dataPoints = [
      { x: 0, y: 0 },
      { x: 10, y: 20 },
      { x: 20, y: 30 },
      { x: 30, y: 50 }
    ];

    it('should interpolate x value at exact data point', () => {
      expect(InterpolationUtils.interpolateX(20, dataPoints)).toBe(10);
      expect(InterpolationUtils.interpolateX(30, dataPoints)).toBe(20);
    });

    it('should interpolate x value between data points', () => {
      expect(InterpolationUtils.interpolateX(10, dataPoints)).toBe(5);
      expect(InterpolationUtils.interpolateX(25, dataPoints)).toBe(15);
      expect(InterpolationUtils.interpolateX(40, dataPoints)).toBe(25);
    });

    it('should handle y value below the range', () => {
      expect(InterpolationUtils.interpolateX(-10, dataPoints)).toBe(-5);
    });

    it('should handle y value above the range', () => {
      expect(InterpolationUtils.interpolateX(60, dataPoints)).toBe(30);
    });

    it('should respect precision parameter', () => {
      const complexDataPoints = [
        { x: 0, y: 0 },
        { x: 33.333, y: 10 }
      ];

      expect(InterpolationUtils.interpolateX(5, complexDataPoints, 0)).toBe(17);
      expect(InterpolationUtils.interpolateX(5, complexDataPoints, 1)).toBe(
        16.7
      );
      expect(InterpolationUtils.interpolateX(5, complexDataPoints, 3)).toBe(
        16.667
      );
    });

    it('should handle single data point', () => {
      const singlePoint = [{ x: 5, y: 10 }];
      expect(() => InterpolationUtils.interpolateX(7, singlePoint)).toThrow();
    });

    it('should handle non-monotonic y values', () => {
      const nonMonotonicPoints = [
        { x: 0, y: 0 },
        { x: 10, y: 20 },
        { x: 20, y: 10 },
        { x: 30, y: 30 }
      ];

      // This should find the first occurrence where y <= 10
      expect(InterpolationUtils.interpolateX(10, nonMonotonicPoints)).toBe(5);
    });
  });
});
