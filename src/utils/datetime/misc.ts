import { DateComponents } from '@/types';

/**
 * Constructs a `Date` at local-timezone midnight for the given calendar date.
 *
 * The month in `calendarParts` is 1-based (1 = January), which is adjusted
 * internally to match the 0-based month expected by the `Date` constructor.
 *
 * @param calendarParts - The calendar date to convert, with a 1-based month
 * @returns A `Date` at midnight in the local timezone for the given calendar date
 *
 * @example
 * dateComponentsToLocalTimezoneMidnight({ year: 2024, month: 3, day: 15 })
 * // → Fri Mar 15 2024 00:00:00 (local timezone)
 */
export function dateComponentsToLocalTimezoneMidnight(
  calendarParts: DateComponents
): Date {
  const { year, month, day } = calendarParts;

  return new Date(year, month - 1, day);
}
