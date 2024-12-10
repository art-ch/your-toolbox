import { CalculateCleansingCyclesReturnType } from './DynamicExerciseDurationService.types';

/**
 * A calculator for mental layer cleansing cycles through hiking, based on a methodology by O.G. Torsunov.
 *
 * This class provides methods to calculate various aspects of mental layer cleansing cycles,
 * including cycle time, speed, number of cycles, and total time.
 *
 * The calculations are based on the formula:
 * t = (d / v) * 3600
 *
 * Where:
 * t = Cleansing cycle time (s)
 * d = Distance per cleansing cycle (km)
 * v = Speed (km/h)
 * 3600 = Conversion factor from hours to seconds
 *
 * SI Units used:
 * - Distance: kilometers (km)
 * - Speed: kilometers per hour (km/h)
 * - Time: seconds (s) for internal calculations, minutes (min) for input/output
 *
 * @class
 */
export class DynamicExerciseDurationCalculator {
  /**
   * The distance covered in one mental layer cleansing cycle (in kilometers).
   *
   * This value is derived from the creator's video explanation of the concept:
   * https://youtube.com/shorts/7sSEtL0m6xs?si=0XslSeHvu4kvUbFB
   *
   * In the video, the creator (O.G. Torsunov) describes approximate times and speeds
   * for mental layer cleansing, providing 5 different proportions. By analyzing
   * these proportions and calculating their average, this constant of 4 km was
   * determined as a reliable basis for the cleansing cycle calculations.
   *
   * While the exact optimal distance may vary based on individual interpretation
   * of the creator's guidelines, 4 km has been chosen as a practical and
   * consistent measure for the purposes of this calculator. This value
   * serves as a standardized unit for mental layer cleansing cycles across
   * various speeds and durations.
   */
  private readonly distancePerCleansingCycle: number = 4;

  constructor() {}

  /**
   * Calculates the cleansing cycle time for a given speed.
   *
   * @param {number} speed - The speed in km/h.
   * @returns {number} The cleansing cycle time in minutes, rounded to the nearest integer.
   */
  private calculateCleansingCycleTime(speed: number): number {
    return Math.round((this.distancePerCleansingCycle / speed) * 60);
  }

  /**
   * Calculates the speed for a given cleansing cycle time.
   *
   * @param {number} cycleTime - The cleansing cycle time in minutes.
   * @returns {number} The speed in km/h, rounded to two decimal places.
   */
  private calculateSpeed(cycleTime: number): number {
    return (
      Math.round((this.distancePerCleansingCycle / (cycleTime / 60)) * 100) /
      100
    );
  }

  /**
   * Calculates the number of complete cleansing cycles and remaining time for a given speed and total time.
   *
   * @param {number} speed - The speed in km/h.
   * @param {number} totalTimeMinutes - The total time in minutes.
   * @returns {Object} An object containing cleansing cycle time, complete cycles, and remaining minutes.
   */
  calculateCleansingCycles(
    speed: number,
    totalTimeMinutes: number
  ): CalculateCleansingCyclesReturnType {
    const cycleTime = this.calculateCleansingCycleTime(speed);
    const completedCycles = Math.floor(totalTimeMinutes / cycleTime);
    const remainingMinutes = cycleTime - (totalTimeMinutes % cycleTime);

    return {
      cycleTime,
      completedCycles,
      remainingMinutes
    };
  }

  /**
   * Calculates the total time for a given speed and number of cleansing cycles.
   *
   * @param {number} speed - The speed in km/h.
   * @param {number} cycles - The number of cleansing cycles.
   * @returns {number} The total time in minutes.
   */
  calculateTotalTime(speed: number, cycles: number): number {
    const cycleTime = this.calculateCleansingCycleTime(speed);
    return cycles * cycleTime;
  }

  /**
   * Calculates the speed given the number of cleansing cycles and total time.
   *
   * @param {number} cycles - The number of cleansing cycles.
   * @param {number} totalTimeMinutes - The total time in minutes.
   * @returns {number} The speed in km/h, rounded to two decimal places.
   */
  calculateSpeedFromCyclesAndTime(
    cycles: number,
    totalTimeMinutes: number
  ): number {
    const averageCycleTime = totalTimeMinutes / cycles;
    return this.calculateSpeed(averageCycleTime);
  }
}

export const dynamicExerciseDurationCalculator =
  new DynamicExerciseDurationCalculator();
