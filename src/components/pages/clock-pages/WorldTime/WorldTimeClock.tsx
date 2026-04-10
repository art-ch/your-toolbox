import React from 'react';

import { formatWorldTime } from './utils/formatWorldTime';
import { TimeComponents } from '@/types';
import { cn } from '@/lib/utils';

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
      <time className={cn(classNames.time, 'text-4xl md:text-5xl lg:text-6xl')}>
        {formattedTime}
      </time>
    </div>
  );
};
