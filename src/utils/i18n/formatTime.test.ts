import { formatTime } from './formatTime';
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
  if (key === 'time:and') {
    return 'and';
  }
  return key;
}) as unknown as TFunction;

describe('formatTime', () => {
  const defaultProps = {
    t: mockT,
    language: 'en' as Language
  };

  it('should format 0 minutes correctly', () => {
    expect(formatTime({ ...defaultProps, totalMinutes: 0 })).toBe('0 minutes');
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
});
