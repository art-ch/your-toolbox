import { TFunction } from 'i18next';

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

export function formatTime(totalMinutes: number, t: TFunction): string {
  const { hours, minutes } = convertMinutesToHoursAndMinutes(totalMinutes);

  const hourPart = hours > 0 ? t('common:time.hours', { count: hours }) : '';

  const minutePart =
    minutes > 0 || hours === 0
      ? t('common:time.minutes', { count: minutes })
      : '';

  const connector = hours > 0 && minutes > 0 ? t('common:time.and') : '';

  return `${hourPart} ${connector} ${minutePart}`.trim();
}
