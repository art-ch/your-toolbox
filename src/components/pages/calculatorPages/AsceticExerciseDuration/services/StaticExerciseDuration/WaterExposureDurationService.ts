import { InterpolationUtils } from '@/utils/interpolationUtils';

/**
 * A calculator for mental layer cleansing through water exposure.
 *
 * This class provides methods to calculate various aspects of mental layer cleansing
 * through water exposure at different temperatures.
 */
export class WaterExposureDurationCalculator {
  /**
   * Data points representing the relationship between water temperature and exposure time for one mental layer.
   * These values are derived roughly from doctor's teachings.
   */
  private readonly dataPoints: Array<{
    /** Water temperature in degrees Celsius */
    temperature: number;
    /** Duration for one mental layer in minutes */
    minDuration: number;
  }> = [
    { temperature: 3.5, minDuration: 1 },
    { temperature: 10, minDuration: 3 },
    { temperature: 15, minDuration: 4 },
    { temperature: 20, minDuration: 6 },
    { temperature: 25, minDuration: 12 },
    { temperature: 30, minDuration: 16 },
    { temperature: 35, minDuration: 19 },
    { temperature: 40, minDuration: 20 }
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
    // Convert data points to format needed for interpolation
    const durationPoints = this.dataPoints.map((point) => ({
      x: point.temperature,
      y: point.minDuration
    }));

    // Find the required time for 1 mental layer at this temperature
    const timeForOneMentalLayer = InterpolationUtils.interpolateY(
      temperature,
      durationPoints
    );

    // Calculate mental layers cleansed
    const mentalLayers = exposureTime / timeForOneMentalLayer;

    return Math.floor(Math.round(mentalLayers * 100) / 100);
  }

  /**
   * Calculates the total water exposure time required for a given temperature and number of mental layers.
   *
   * @param {number} temperature - The water temperature in degrees Celsius.
   * @param {number} mentalLayers - The desired number of mental layers to cleanse.
   * @returns {object} An object containing the required time in minutes.
   */
  calculateTotalExposureTime(
    temperature: number,
    mentalLayers: number
  ): number {
    // Convert data points to format needed for interpolation
    const minDurationPoints = this.dataPoints.map((point) => ({
      x: point.temperature,
      y: point.minDuration
    }));

    // Find the required time for 1 mental layer at this temperature
    const timeForOneMentalLayer = InterpolationUtils.interpolateY(
      temperature,
      minDurationPoints,
      1
    );

    // Calculate total required time
    return Math.round(timeForOneMentalLayer * mentalLayers * 10) / 10;
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

    // Convert data points to format needed for interpolation
    const interpolationPoints = this.dataPoints.map((point) => ({
      x: point.temperature,
      y: point.minDuration
    }));

    return InterpolationUtils.interpolateX(
      timeForOneMentalLayer,
      interpolationPoints,
      1
    );
  }
}

export const waterExposureDurationCalculator =
  new WaterExposureDurationCalculator();
