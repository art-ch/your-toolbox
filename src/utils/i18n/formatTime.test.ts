import { formatDays, formatTime } from './formatTime';
import { TFunction } from 'i18next';
import { Language } from '@/lib/i18n/types';

// Mock translation function
const mockT = jest.fn((key: string, options?: { count?: number }) => {
  // Simplified implementation to match the test expectations
  if (key === 'time:hours') {
    return options?.count === 1 ? '1 hour' : `${options?.count} hours`;
  }
  if (key === 'time:minutes') {
    return options?.count === 1 ? '1 minute' : `${options?.count} minutes`;
  }
  if (key === 'time:seconds') {
    return options?.count === 1 ? '1 second' : `${options?.count} seconds`;
  }
  if (key === 'time:and') {
    return 'and';
  }
  if (key === 'time:everyday') {
    return 'everyday';
  }
  if (key === 'time:days') {
    return options?.count === 1 ? 'everyday' : `${options?.count} days`;
  }
  return key;
}) as unknown as TFunction;

describe('formatTime', () => {
  const defaultProps = {
    t: mockT,
    language: 'en' as Language
  };

  it('should format 0 minutes correctly', () => {
    expect(formatTime({ ...defaultProps, totalMinutes: 0 })).toBe('0 seconds');
  });

  it('should format 1 minute correctly', () => {
    expect(formatTime({ ...defaultProps, totalMinutes: 1 })).toBe('1 minute');
  });

  it('should format multiple minutes (less than 60) correctly', () => {
    expect(formatTime({ ...defaultProps, totalMinutes: 30 })).toBe(
      '30 minutes'
    );
    expect(formatTime({ ...defaultProps, totalMinutes: 59 })).toBe(
      '59 minutes'
    );
  });

  it('should format exactly 1 hour correctly', () => {
    expect(formatTime({ ...defaultProps, totalMinutes: 60 })).toBe('1 hour');
  });

  it('should format multiple hours with no minutes correctly', () => {
    expect(formatTime({ ...defaultProps, totalMinutes: 120 })).toBe('2 hours');
    expect(formatTime({ ...defaultProps, totalMinutes: 180 })).toBe('3 hours');
  });

  it('should format 1 hour with minutes correctly', () => {
    expect(formatTime({ ...defaultProps, totalMinutes: 61 })).toBe(
      '1 hour and 1 minute'
    );
    expect(formatTime({ ...defaultProps, totalMinutes: 90 })).toBe(
      '1 hour and 30 minutes'
    );
  });

  it('should format multiple hours with minutes correctly', () => {
    expect(formatTime({ ...defaultProps, totalMinutes: 121 })).toBe(
      '2 hours and 1 minute'
    );
    expect(formatTime({ ...defaultProps, totalMinutes: 150 })).toBe(
      '2 hours and 30 minutes'
    );
    expect(formatTime({ ...defaultProps, totalMinutes: 185 })).toBe(
      '3 hours and 5 minutes'
    );
  });

  it('handles large values correctly', () => {
    expect(formatTime({ ...defaultProps, totalMinutes: 1440 })).toBe(
      '24 hours'
    );
    expect(formatTime({ ...defaultProps, totalMinutes: 1441 })).toBe(
      '24 hours and 1 minute'
    );
    expect(formatTime({ ...defaultProps, totalMinutes: 1500 })).toBe(
      '25 hours'
    );
  });

  it('should format seconds only correctly', () => {
    expect(formatTime({ ...defaultProps, totalMinutes: 0.5 })).toBe(
      '30 seconds'
    );
    expect(formatTime({ ...defaultProps, totalMinutes: 0.6 })).toBe(
      '36 seconds'
    );
    expect(formatTime({ ...defaultProps, totalMinutes: 0.7 })).toBe(
      '42 seconds'
    );
  });

  it('should format minutes with seconds correctly', () => {
    expect(formatTime({ ...defaultProps, totalMinutes: 1.5 })).toBe(
      '1 minute and 30 seconds'
    );
    expect(formatTime({ ...defaultProps, totalMinutes: 30.25 })).toBe(
      '30 minutes and 15 seconds'
    );
  });

  it('should format hours, minutes, and seconds correctly', () => {
    expect(formatTime({ ...defaultProps, totalMinutes: 60.5 })).toBe(
      '1 hour and 30 seconds'
    );
    expect(formatTime({ ...defaultProps, totalMinutes: 90.75 })).toBe(
      '1 hour 30 minutes and 45 seconds'
    );
    expect(formatTime({ ...defaultProps, totalMinutes: 121.25 })).toBe(
      '2 hours 1 minute and 15 seconds'
    );
  });
});

describe('formatDays', () => {
  it('should format 1 day correctly', () => {
    expect(formatDays(1, mockT)).toBe('everyday');
  });

  it('should format multiple days correctly', () => {
    expect(formatDays(2, mockT)).toBe('2 days');
  });
});
