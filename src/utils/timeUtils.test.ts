import { convertMinutesToHoursAndMinutes } from './timeUtils'; // adjust import path as needed

describe('convertMinutesToHoursAndMinutes', () => {
  it('should convert 0 minutes to 0 hours and 0 minutes', () => {
    expect(convertMinutesToHoursAndMinutes(0)).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
  });

  it('should convert minutes less than 60 to 0 hours and correct minutes', () => {
    expect(convertMinutesToHoursAndMinutes(30)).toEqual({
      hours: 0,
      minutes: 30,
      seconds: 0
    });
    expect(convertMinutesToHoursAndMinutes(59)).toEqual({
      hours: 0,
      minutes: 59,
      seconds: 0
    });
  });

  it('should convert exactly 60 minutes to 1 hour and 0 minutes', () => {
    expect(convertMinutesToHoursAndMinutes(60)).toEqual({
      hours: 1,
      minutes: 0,
      seconds: 0
    });
  });

  it('should convert minutes between 60 and 120 to 1 hour and correct minutes', () => {
    expect(convertMinutesToHoursAndMinutes(90)).toEqual({
      hours: 1,
      minutes: 30,
      seconds: 0
    });
    expect(convertMinutesToHoursAndMinutes(119)).toEqual({
      hours: 1,
      minutes: 59,
      seconds: 0
    });
  });

  it('should convert large number of minutes correctly', () => {
    expect(convertMinutesToHoursAndMinutes(150)).toEqual({
      hours: 2,
      minutes: 30,
      seconds: 0
    });
    expect(convertMinutesToHoursAndMinutes(600)).toEqual({
      hours: 10,
      minutes: 0,
      seconds: 0
    });
    expect(convertMinutesToHoursAndMinutes(1234)).toEqual({
      hours: 20,
      minutes: 34,
      seconds: 0
    });
  });

  it('should handle fractional minutes and convert to seconds', () => {
    expect(convertMinutesToHoursAndMinutes(0.6)).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 36
    });
    expect(convertMinutesToHoursAndMinutes(1.5)).toEqual({
      hours: 0,
      minutes: 1,
      seconds: 30
    });
    expect(convertMinutesToHoursAndMinutes(60.25)).toEqual({
      hours: 1,
      minutes: 0,
      seconds: 15
    });
    expect(convertMinutesToHoursAndMinutes(90.75)).toEqual({
      hours: 1,
      minutes: 30,
      seconds: 45
    });
  });
});
