/**
 * Utility class for performing linear interpolation between data points.
 */
export class InterpolationUtils {
  /**
   * Performs linear interpolation to find y-value for a given x-value.
   *
   * @param {number} x - The input x-value to interpolate for
   * @param {Array<{x: number, y: number}>} dataPoints - Array of data points sorted by x-value
   * @param {number} [precision=2] - Number of decimal places to round the result to
   * @returns {number} - The interpolated y-value
   */
  static interpolateY(
    x: number,
    dataPoints: Array<{ x: number; y: number }>,
    precision: number = 2
  ): number {
    // Find the two data points to interpolate between
    let lowerPoint = dataPoints[0];
    let upperPoint = dataPoints[1];

    for (let i = 1; i < dataPoints.length; i++) {
      if (x <= dataPoints[i].x) {
        lowerPoint = dataPoints[i - 1];
        upperPoint = dataPoints[i];
        break;
      }
    }

    // Linear interpolation
    const ratio = (x - lowerPoint.x) / (upperPoint.x - lowerPoint.x);
    const y = lowerPoint.y + ratio * (upperPoint.y - lowerPoint.y);

    // Round to specified precision
    const factor = Math.pow(10, precision);
    return Math.round(y * factor) / factor;
  }

  /**
   * Performs linear interpolation to find x-value for a given y-value.
   *
   * @param {number} y - The input y-value to interpolate for
   * @param {Array<{x: number, y: number}>} dataPoints - Array of data points sorted by x-value
   * @param {number} [precision=2] - Number of decimal places to round the result to
   * @returns {number} - The interpolated x-value
   */
  static interpolateX(
    y: number,
    dataPoints: Array<{ x: number; y: number }>,
    precision: number = 2
  ): number {
    // Find the two data points to interpolate between
    let lowerPoint = dataPoints[0];
    let upperPoint = dataPoints[1];

    for (let i = 1; i < dataPoints.length; i++) {
      if (y <= dataPoints[i].y) {
        lowerPoint = dataPoints[i - 1];
        upperPoint = dataPoints[i];
        break;
      }
    }

    // Linear interpolation
    const ratio = (y - lowerPoint.y) / (upperPoint.y - lowerPoint.y);
    const x = lowerPoint.x + ratio * (upperPoint.x - lowerPoint.x);

    // Round to specified precision
    const factor = Math.pow(10, precision);
    return Math.round(x * factor) / factor;
  }
}
