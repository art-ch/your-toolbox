export type TimeSegments = {
  hours: number;
  minutes: number;
  seconds: number;
};

export function convertMinutesToHoursAndMinutes(
  totalMinutes: number
): TimeSegments {
  const hours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const minutes = Math.floor(remainingMinutes);
  const seconds = Math.round((remainingMinutes - minutes) * 60);

  return { hours, minutes, seconds };
}
