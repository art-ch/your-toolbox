import { InterpolationUtils } from '@/utils/interpolationUtils';

/**
 * A calculator for mental layer cleansing cycles through static exercising, based on a methodology by O.G. Torsunov.
 *
 * Class for calculating static exercise duration based on mental layers using interpolation between data points.
 * Based on empirical data: 1 layer = 14 minutes, 2 layers = 27 minutes, 3 layers = 39 minutes,
 * 4 layers = 52 minutes, 5 layers = 64 minutes. This proportion is derived roughly from doctor's teachings
 */
export class StaticExerciseDurationCalculator {
  /**
   * Data points representing the relationship between mental layers and required exercise duration.
   */
  private readonly dataPoints: Array<{
    mentalLayers: number;
    duration: number;
  }> = [
    { mentalLayers: 1, duration: 14 },
    { mentalLayers: 2, duration: 27 },
    { mentalLayers: 3, duration: 39 },
    { mentalLayers: 4, duration: 52 },
    { mentalLayers: 5, duration: 64 }
  ];

  /**
   * Calculates the duration of exercising in minutes based on the number of mental layers
   *
   * @param {number} mentalLayers - The number of mental layers
   * @returns {number} - The calculated duration in minutes, rounded to one decimal place
   */
  calculateDurationFromLayers(mentalLayers: number): number {
    // Convert data points to format needed for interpolation
    const interpolationPoints = this.dataPoints.map((point) => ({
      x: point.mentalLayers,
      y: point.duration
    }));

    return InterpolationUtils.interpolateY(
      mentalLayers,
      interpolationPoints,
      1
    );
  }

  /**
   * Calculates the number of mental layers based on the duration in minutes
   *
   * @param {number} duration - The duration in minutes
   * @returns {number} calculated number of mental layers
   */
  calculateLayersFromDuration(duration: number): number {
    // Convert data points to format needed for interpolation
    const interpolationPoints = this.dataPoints.map((point) => ({
      x: point.mentalLayers,
      y: point.duration
    }));

    /**  Use interpolateX to find the x-value (mentalLayers) for a given y-value (duration) */
    const interpolatedValue = InterpolationUtils.interpolateX(
      duration,
      interpolationPoints
    );

    // Strip decimal points, we cannot have 1.5 layers
    return Math.floor(interpolatedValue);
  }
}

export const staticExerciseDurationCalculator =
  new StaticExerciseDurationCalculator();
