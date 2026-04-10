import { convertMinutesToTimeDuration } from './convertMinutesToTimeDuration'; // adjust import path as needed

describe('convertMinutesToHoursAndMinutes', () => {
  it('should convert 0 minutes to 0 hours and 0 minutes', () => {
    expect(convertMinutesToTimeDuration(0)).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
  });

  it('should convert minutes less than 60 to 0 hours and correct minutes', () => {
    expect(convertMinutesToTimeDuration(30)).toEqual({
      hours: 0,
      minutes: 30,
      seconds: 0
    });
    expect(convertMinutesToTimeDuration(59)).toEqual({
      hours: 0,
      minutes: 59,
      seconds: 0
    });
  });

  it('should convert exactly 60 minutes to 1 hour and 0 minutes', () => {
    expect(convertMinutesToTimeDuration(60)).toEqual({
      hours: 1,
      minutes: 0,
      seconds: 0
    });
  });

  it('should convert minutes between 60 and 120 to 1 hour and correct minutes', () => {
    expect(convertMinutesToTimeDuration(90)).toEqual({
      hours: 1,
      minutes: 30,
      seconds: 0
    });
    expect(convertMinutesToTimeDuration(119)).toEqual({
      hours: 1,
      minutes: 59,
      seconds: 0
    });
  });

  it('should convert large number of minutes correctly', () => {
    expect(convertMinutesToTimeDuration(150)).toEqual({
      hours: 2,
      minutes: 30,
      seconds: 0
    });
    expect(convertMinutesToTimeDuration(600)).toEqual({
      hours: 10,
      minutes: 0,
      seconds: 0
    });
    expect(convertMinutesToTimeDuration(1234)).toEqual({
      hours: 20,
      minutes: 34,
      seconds: 0
    });
  });

  it('should handle fractional minutes and convert to seconds', () => {
    expect(convertMinutesToTimeDuration(0.6)).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 36
    });
    expect(convertMinutesToTimeDuration(1.5)).toEqual({
      hours: 0,
      minutes: 1,
      seconds: 30
    });
    expect(convertMinutesToTimeDuration(60.25)).toEqual({
      hours: 1,
      minutes: 0,
      seconds: 15
    });
    expect(convertMinutesToTimeDuration(90.75)).toEqual({
      hours: 1,
      minutes: 30,
      seconds: 45
    });
  });
});
