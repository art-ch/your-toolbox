import { formatWorldTime } from './formatWorldTime';

describe('formatWorldTime', () => {
  it('should format time with double-digit hours, minutes, and seconds', () => {
    const time = { hour: 14, minute: 30, second: 45 };
    expect(formatWorldTime(time)).toBe('14-30 45');
  });

  it('should format time with single-digit hours', () => {
    const time = { hour: 9, minute: 30, second: 45 };
    expect(formatWorldTime(time)).toBe('9-30 45');
  });

  it('should pad minutes with leading zero when single digit', () => {
    const time = { hour: 14, minute: 5, second: 45 };
    expect(formatWorldTime(time)).toBe('14-05 45');
  });

  it('should pad seconds with leading zero when single digit', () => {
    const time = { hour: 14, minute: 30, second: 5 };
    expect(formatWorldTime(time)).toBe('14-30 05');
  });

  it('should format midnight correctly', () => {
    const time = { hour: 0, minute: 0, second: 0 };
    expect(formatWorldTime(time)).toBe('0-00 00');
  });

  it('should format end of day correctly', () => {
    const time = { hour: 23, minute: 59, second: 59 };
    expect(formatWorldTime(time)).toBe('23-59 59');
  });

  it('should pad both minutes and seconds with leading zeros', () => {
    const time = { hour: 10, minute: 1, second: 1 };
    expect(formatWorldTime(time)).toBe('10-01 01');
  });

  it('should format noon correctly', () => {
    const time = { hour: 12, minute: 0, second: 0 };
    expect(formatWorldTime(time)).toBe('12-00 00');
  });
});
