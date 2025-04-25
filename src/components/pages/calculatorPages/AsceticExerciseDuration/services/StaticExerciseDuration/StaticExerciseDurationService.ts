/**
 * A calculator for mental layer cleansing cycles through static exercising, based on a methodology by O.G. Torsunov.
 *
 * Class for calculating static exercise duration based on mental layers using linear interpolation.
 * Based on the proportion: 1 layer = 14 minutes, 2 layers = 27 minutes, which is derived roughly from doctor's teachings
 */
export class StaticExerciseDurationCalculator {
  /**
   * Slope of the linear equation, calculated as (27-14)/(2-1) = 13
   */
  private readonly slope: number = 13;

  /**
   * Y-intercept of the linear equation, calculated as 14 - 13*1 = 1
   */
  private readonly yIntercept: number = 1;

  /**
   * Calculates the duration of exercising in minutes based on the number of mental layers
   *
   * @param {number} mentalLayers - The number of mental layers (typically between 1 and 5)
   * @returns {number} - The calculated duration in minutes
   */
  calculateDurationFromLayers(mentalLayers: number): number {
    // Using the line equation: duration = slope * mentalLayers + yIntercept
    return this.slope * mentalLayers + this.yIntercept;
  }

  /**
   * Calculates the number of mental layers based on the duration in minutes
   *
   * @param {number} duration - The duration in minutes
   * @returns {number} calculated number of mental layers
   */
  calculateLayersFromDuration(duration: number): number {
    // Inverse of the line equation: mentalLayers = (minutes - yIntercept) / slope
    return (duration - this.yIntercept) / this.slope;
  }
}

export const staticExerciseDurationCalculator =
  new StaticExerciseDurationCalculator();
