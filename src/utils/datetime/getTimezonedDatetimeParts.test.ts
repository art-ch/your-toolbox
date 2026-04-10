import { getTimezonedDatetimeParts } from './getTimezonedDatetimeParts';

describe('getTimezonedDatetimeParts', () => {
  it('should return the time components for the given date and time zone', () => {
    const date = new Date(2024, 3, 15, 14, 30, 45);

    const timeZone = 'Europe/Kyiv';

    const result = getTimezonedDatetimeParts(date, timeZone);

    expect(result).toEqual({
      year: 2024,
      // transformed from 0-based to 1-based month
      month: 4,
      day: 15,
      hour: 14,
      minute: 30,
      second: 45
    });
  });
});
