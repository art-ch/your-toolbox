export type TimeSegments = {
  hours: number;
  minutes: number;
};

export function convertMinutesToHoursAndMinutes(
  totalMinutes: number
): TimeSegments {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}

export function formatTime(totalMinutes: number): string {
  const { hours, minutes } = convertMinutesToHoursAndMinutes(totalMinutes);

  const hourPart =
    hours > 0 ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : '';

  const minutePart =
    minutes > 0 || hours === 0
      ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`
      : '';

  const connector = hours > 0 && minutes > 0 ? 'and' : '';

  return `${hourPart} ${connector} ${minutePart}`.trim();
}
