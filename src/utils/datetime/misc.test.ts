import { dateComponentsToLocalTimezoneMidnight } from './misc';

describe('dateComponentsToLocalTimezoneMidnight', () => {
  it('should return a Date object at midnight in the local timezone for the given calendar date', () => {
    const calendarParts = { year: 2024, month: 3, day: 15 };

    const result = dateComponentsToLocalTimezoneMidnight(calendarParts);

    expect(result).toBeInstanceOf(Date);

    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
  });
});
