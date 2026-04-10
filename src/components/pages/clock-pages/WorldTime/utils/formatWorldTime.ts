import { TimeComponents } from '@/types';

export const formatWorldTime = (calendarParts: TimeComponents) => {
  const { hour, minute, second } = calendarParts;

  const hours = String(hour);
  const minutes = String(minute).padStart(2, '0');
  const seconds = String(second).padStart(2, '0');

  return `${hours}-${minutes} ${seconds}`;
};
