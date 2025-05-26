import { formatTime } from './formatTime';

describe('formatTime', () => {
  it('should format 0 minutes correctly', () => {
    expect(formatTime(0)).toBe('0 minutes');
  });

  it('should format 1 minute correctly', () => {
    expect(formatTime(1)).toBe('1 minute');
  });

  it('should format multiple minutes (less than 60) correctly', () => {
    expect(formatTime(30)).toBe('30 minutes');
    expect(formatTime(59)).toBe('59 minutes');
  });

  it('should format exactly 1 hour correctly', () => {
    expect(formatTime(60)).toBe('1 hour');
  });

  it('should format multiple hours with no minutes correctly', () => {
    expect(formatTime(120)).toBe('2 hours');
    expect(formatTime(180)).toBe('3 hours');
  });

  it('should format 1 hour with minutes correctly', () => {
    expect(formatTime(61)).toBe('1 hour and 1 minute');
    expect(formatTime(90)).toBe('1 hour and 30 minutes');
  });

  it('should format multiple hours with minutes correctly', () => {
    expect(formatTime(121)).toBe('2 hours and 1 minute');
    expect(formatTime(150)).toBe('2 hours and 30 minutes');
    expect(formatTime(185)).toBe('3 hours and 5 minutes');
  });

  it('handles large values correctly', () => {
    expect(formatTime(1440)).toBe('24 hours');
    expect(formatTime(1441)).toBe('24 hours and 1 minute');
    expect(formatTime(1500)).toBe('25 hours');
  });
});
