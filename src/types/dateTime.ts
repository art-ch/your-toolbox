/**
 * POSITIONAL TYPES (Singular)
 * Used for: "When is it?" (e.g., Feb 1st, 2026, 14:05:00)
 */
export type DateComponents = {
  year: number;
  month: number;
  day: number;
};

export type TimeComponents = {
  hour: number;
  minute: number;
  second: number;
};

export type DateTimeComponents = DateComponents & TimeComponents;

/**
 * MAGNITUDE TYPES (Plural)
 * Used for: "How long is it?" (e.g., 2 years, 5 hours, 10 seconds)
 */
export type DateDuration = {
  years: number;
  months: number;
  days: number;
};

export type TimeDuration = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type DateTimeDuration = DateDuration & TimeDuration;

export type TimeZone = {
  id: string;
  label: string;

  /**
   * IANA stands for Internet Assigned Numbers Authority, it's a global registry of unique identifiers for various internet resources.
   * List of all IANA time zones:
   *  https://en.wikipedia.org/wiki/List_of_tz_database_time_zones for more information
   *
   * More info about IANA:
   * https://www.iana.org/about
   */
  iana: string;
};
