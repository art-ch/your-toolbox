/**
 * A calculator for mental layer cleansing through water exposure.
 *
 * This class provides methods to calculate various aspects of mental layer cleansing
 * through water exposure at different temperatures, including:
 * - Number of mental layers cleansed given temperature and exposure time
 * - Required exposure time for a given temperature and desired mental layers
 * - Required temperature for a given exposure time and desired mental layers
 *
 * The calculations are based on interpolation between empirically determined data points
 * that represent the relationship between water temperature, exposure time, and mental layers.
 *
 * Units used:
 * - Temperature: degrees Celsius (°C)
 * - Time: minutes (min)
 * - Mental layers: dimensionless unit
 */
export class WaterExposureDurationCalculator {
  /**
   * Data points representing the relationship between water temperature, exposure time, and mental layers.
   * Each data point represents the time required at a specific temperature to cleanse 1 mental layer.
   * These values are derived roughly from doctor's teachings.
   */
  private readonly dataPoints: Array<{
    temperature: number;
    duration: number;
  }> = [
    { temperature: 3.5, duration: 1 },
    { temperature: 10, duration: 3 },
    { temperature: 15, duration: 4 },
    { temperature: 20, duration: 6 },
    { temperature: 25, duration: 12 },
    { temperature: 30, duration: 16 },
    { temperature: 35, duration: 19 },
    { temperature: 40, duration: 20 }
  ];

  /**
   * Calculates the number of mental layers cleansed for a given water temperature and exposure time.
   *
   * @param {number} temperature - The water temperature in degrees Celsius.
   * @param {number} exposureTime - The water exposure time in minutes.
   * @returns {number} The number of mental layers cleansed, rounded to two decimal places.
   */
  calculateMentalLayersCleansed(
    temperature: number,
    exposureTime: number
  ): number {
    // Find the required time for 1 mental layer at this temperature
    const timeForOneMentalLayer = this.interpolateDuration(temperature);

    // Calculate mental layers cleansed
    const mentalLayers = exposureTime / timeForOneMentalLayer;

    return Math.round(mentalLayers * 100) / 100;
  }

  /**
   * Calculates the total water exposure time required for a given temperature and number of mental layers.
   *
   * @param {number} temperature - The water temperature in degrees Celsius.
   * @param {number} mentalLayers - The desired number of mental layers to cleanse.
   * @returns {number} The required exposure time in minutes, rounded to one decimal place.
   */
  calculateTotalExposureTime(
    temperature: number,
    mentalLayers: number
  ): number {
    // Find the required time for 1 mental layer at this temperature
    const timeForOneMentalLayer = this.interpolateDuration(temperature);

    // Calculate total time
    const totalTime = timeForOneMentalLayer * mentalLayers;

    return Math.round(totalTime * 10) / 10;
  }

  /**
   * Calculates the required water temperature for a given exposure time and number of mental layers.
   *
   * @param {number} mentalLayers - The desired number of mental layers to cleanse.
   * @param {number} exposureTime - The available water exposure time in minutes.
   * @returns {number} The required temperature in degrees Celsius, rounded to one decimal place.
   */
  calculateRequiredTemperature(
    mentalLayers: number,
    exposureTime: number
  ): number {
    // Calculate time needed for one mental layer
    const timeForOneMentalLayer = exposureTime / mentalLayers;

    // Find the temperature that corresponds to this time
    const temperature = this.interpolateTemperature(timeForOneMentalLayer);

    return Math.round(temperature * 10) / 10;
  }

  /**
   * Interpolates the time required for one mental layer at a given water temperature.
   *
   * @param {number} temperature - The water temperature in degrees Celsius.
   * @returns {number} The time required for one mental layer in minutes.
   * @private
   */
  private interpolateDuration(temperature: number): number {
    // Handle edge cases
    if (temperature <= this.dataPoints[0].temperature) {
      return this.dataPoints[0].duration;
    }

    if (
      temperature >= this.dataPoints[this.dataPoints.length - 1].temperature
    ) {
      return this.dataPoints[this.dataPoints.length - 1].duration;
    }

    // Find the two data points to interpolate between
    let lowerPoint = this.dataPoints[0];
    let upperPoint = this.dataPoints[1];

    // Start from index 1 to compare each element with its predecessor
    // This allows us to find the two data points that bracket our target value
    for (let i = 1; i < this.dataPoints.length; i++) {
      if (temperature <= this.dataPoints[i].temperature) {
        lowerPoint = this.dataPoints[i - 1];
        upperPoint = this.dataPoints[i];
        break;
      }
    }

    // Linear interpolation
    const ratio =
      (temperature - lowerPoint.temperature) /
      (upperPoint.temperature - lowerPoint.temperature);

    return (
      lowerPoint.duration + ratio * (upperPoint.duration - lowerPoint.duration)
    );
  }

  /**
   * Interpolates the water temperature required for a given time per mental layer.
   *
   * @param {number} durationPerMentalLayer - The time per mental layer in minutes.
   * @returns {number} The required water temperature in degrees Celsius.
   * @private
   */
  private interpolateTemperature(durationPerMentalLayer: number): number {
    // Handle edge cases
    if (durationPerMentalLayer <= this.dataPoints[0].duration) {
      return this.dataPoints[0].temperature;
    }

    if (
      durationPerMentalLayer >=
      this.dataPoints[this.dataPoints.length - 1].duration
    ) {
      return this.dataPoints[this.dataPoints.length - 1].temperature;
    }

    // Find the two data points to interpolate between
    let lowerPoint = this.dataPoints[0];
    let upperPoint = this.dataPoints[1];

    // Start from index 1 to compare each element with its predecessor
    // This allows us to find the two data points that bracket our target value
    for (let i = 1; i < this.dataPoints.length; i++) {
      if (durationPerMentalLayer <= this.dataPoints[i].duration) {
        lowerPoint = this.dataPoints[i - 1];
        upperPoint = this.dataPoints[i];
        break;
      }
    }

    // Linear interpolation
    const ratio =
      (durationPerMentalLayer - lowerPoint.duration) /
      (upperPoint.duration - lowerPoint.duration);

    return (
      lowerPoint.temperature +
      ratio * (upperPoint.temperature - lowerPoint.temperature)
    );
  }
}
