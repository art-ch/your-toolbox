import React from 'react';

import { DateTimeComponents } from '@/types';
import { cn } from '@/lib/utils';

type YearDateProps = {
  datetimeParts: DateTimeComponents;
  classNames: { calendarParts: string };
};

export const YearDate = ({ datetimeParts, classNames }: YearDateProps) => {
  const calendarPartsClassName = cn(
    classNames.calendarParts,
    'text-[22px] sm:text-2xl md:text-3xl lg:text-4xl'
  );

  return (
    <div className="flex justify-between w-full" data-testid="year-date">
      <div className={calendarPartsClassName}>{datetimeParts.year}</div>
      <div>
        <div className={calendarPartsClassName}>
          {datetimeParts.month.toString().padStart(2, '0')}/
          {datetimeParts.day.toString().padStart(2, '0')}
        </div>
        <div className="flex justify-around text-[8px] sm:text-[10px] gap-2 md:gap-4">
          <div>Month</div>
          <div>Date</div>
        </div>
      </div>
    </div>
  );
};
