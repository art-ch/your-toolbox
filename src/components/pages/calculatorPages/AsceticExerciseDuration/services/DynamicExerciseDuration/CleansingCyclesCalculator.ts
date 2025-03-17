import { MENTAL_LAYER_AMOUNT } from '../../constants/DynamicExercise.constants';

export type CleansingCycleData = {
  cycleTime: number;
  totalTimeMinutes: number;
};

export type CalculateCleansingCyclesReturnType = {
  cycleTime: number;
  completedCycles: number;
  minutesUntilNextCycle: number;
  minutesTo5Cycles: number;
  recommendedExerciseMinutes: number;
  recommendedFrequencyDays: number;
};

export class CleansingCyclesCalculator {
  calculateAll(data: CleansingCycleData): CalculateCleansingCyclesReturnType {
    const completedCycles = this.calculateCompletedCycles(data);
    const minutesUntilNextCycle = this.calculateMinutesUntilNextCycle(data);
    const minutesTo5Cycles = this.calculateMinutesTo5Cycles(
      data,
      completedCycles
    );
    const recommendedExerciseMinutes = this.calculateRecommendedExerciseMinutes(
      data,
      minutesTo5Cycles
    );
    const recommendedFrequencyDays =
      this.calculateRecommendedFrequencyInDays(completedCycles);

    return {
      cycleTime: data.cycleTime,
      completedCycles,
      minutesUntilNextCycle,
      minutesTo5Cycles,
      recommendedExerciseMinutes,
      recommendedFrequencyDays
    };
  }

  private calculateCompletedCycles(data: CleansingCycleData): number {
    return Math.floor(data.totalTimeMinutes / data.cycleTime);
  }

  private calculateMinutesUntilNextCycle(data: CleansingCycleData): number {
    return data.cycleTime - (data.totalTimeMinutes % data.cycleTime);
  }

  private calculateMinutesTo5Cycles(
    data: CleansingCycleData,
    completedCycles: number
  ): number {
    const minutesUntilNextCycle = this.calculateMinutesUntilNextCycle(data);

    return Math.max(
      -1,
      (MENTAL_LAYER_AMOUNT - completedCycles) * data.cycleTime -
        (data.cycleTime - minutesUntilNextCycle)
    );
  }

  private calculateRecommendedExerciseMinutes(
    data: CleansingCycleData,
    minutesTo5Cycles: number
  ): number {
    if (minutesTo5Cycles === -1) return MENTAL_LAYER_AMOUNT * data.cycleTime;
    return data.totalTimeMinutes;
  }

  private calculateRecommendedFrequencyInDays(completedCycles: number): number {
    const MIN_FREQUENCY_DAYS = 1; // every day
    const MAX_FREQUENCY_DAYS = 7; // once per week
    const FREQUENCY_INCREASE_RATE = 1.5; // gradual progression from daily to weekly practice

    if (completedCycles >= MENTAL_LAYER_AMOUNT) return MAX_FREQUENCY_DAYS;
    if (completedCycles === 1) return MIN_FREQUENCY_DAYS;

    return Math.max(
      MIN_FREQUENCY_DAYS,
      Math.round(
        MIN_FREQUENCY_DAYS + (completedCycles - 1) * FREQUENCY_INCREASE_RATE
      )
    );
  }
}
