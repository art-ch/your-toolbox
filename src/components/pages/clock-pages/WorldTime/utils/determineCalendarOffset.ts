import {
  Breakpoint,
  BreakpointState
} from '@/hooks/useBreakpoint/useBreakpoint';

/* there are 7 days in a week, so array with values must have 7 elements */
type TranslationValues = number[] & { length: 7 };

const LGXLTranslationValues: TranslationValues = [3, 12, 23, 35, 45, 58, 68];

const defaultTranslationValues: TranslationValues = [0, 8, 15, 28, 40, 50, 59];

const translationConfig: Array<{
  breakpoint: Breakpoint;
  values: TranslationValues;
  fullscreenValues?: TranslationValues;
}> = [
  {
    breakpoint: Breakpoint.XXL,
    values: [0, 10, 15, 25, 35, 45, 55],
    fullscreenValues: [3, 12, 23, 40, 50, 60, 70]
  },
  {
    breakpoint: Breakpoint.XL,
    values: LGXLTranslationValues
  },
  { breakpoint: Breakpoint.LG, values: LGXLTranslationValues },
  { breakpoint: Breakpoint.MD, values: defaultTranslationValues },
  { breakpoint: Breakpoint.SM, values: defaultTranslationValues }
];

export const determineCalendarOffset = (
  time: Date,
  breakpoint: BreakpointState,
  isFullScreen: boolean
) => {
  const year = time.getFullYear();
  const month = time.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const sundayBasedDay = firstDayOfMonth.getDay();

  // Convert Sunday-based (0=Sun) to Monday-based (0=Mon)
  const firstDayOfMonthDayOfTheWeek = (sundayBasedDay + 6) % 7;

  const configEntry = translationConfig.find(
    (config) => breakpoint[config.breakpoint]
  );

  if (!configEntry) {
    return defaultTranslationValues[firstDayOfMonthDayOfTheWeek];
  }

  const selectedConfig =
    isFullScreen && configEntry.fullscreenValues
      ? configEntry.fullscreenValues
      : configEntry.values;

  return selectedConfig[firstDayOfMonthDayOfTheWeek];
};
