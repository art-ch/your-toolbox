import React from 'react';

import { DateTimeComponents } from '@/types';

type YearDateProps = {
  datetimeParts: DateTimeComponents;
  classNames: { calendarParts: string };
};

export const YearDate = ({ datetimeParts, classNames }: YearDateProps) => (
  <div className="flex justify-between w-full" data-testid="year-date">
    <div className={classNames.calendarParts}>{datetimeParts.year}</div>
    <div>
      <div className={classNames.calendarParts}>
        {datetimeParts.month.toString().padStart(2, '0')}/
        {datetimeParts.day.toString().padStart(2, '0')}
      </div>
      <div className="flex justify-around text-[8px] md:text-xs gap-2 md:gap-4">
        <div>Month</div>
        <div>Date</div>
      </div>
    </div>
  </div>
);
