import React from 'react';

import { formatWorldTime } from './utils/formatWorldTime';
import { TimeComponents } from '@/types';

type WorldTimeClockProps = {
  datetimeParts: TimeComponents;
  classNames: { time: string };
};
export const WorldTimeClock = ({
  datetimeParts,
  classNames
}: WorldTimeClockProps) => {
  const formattedTime = formatWorldTime(datetimeParts);

  return (
    <div
      className="flex justify-center items-center"
      data-testid="world-time-clock"
    >
      <time className={classNames.time}>{formattedTime}</time>
    </div>
  );
};
