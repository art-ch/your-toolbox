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
