'use client';

import { LuClock, LuExpand, LuShrink } from 'react-icons/lu';
import { ToolPageHeading } from '@/components/PageHeading/PageHeading';
import { useTranslation } from 'react-i18next';
import { Calendar } from 'react-calendar';
import { WorldTimeClock } from './WorldTimeClock';
import { YearDate } from './YearDate';
import { useAppContext } from '@/context/AppContext/AppContext';
import { Button } from '@/components/ui/button';
import { allertaStencil } from '@/app/fonts';
import { cn } from '@/lib/utils';
import { determineCalendarOffset } from './utils/determineCalendarOffset';
import { useBreakpoint } from '@/hooks/useBreakpoint/useBreakpoint';
import { useMemo } from 'react';
import { Controls } from './Controls';
import { useWorldTime } from './hooks/useWorldTime';
import { dateComponentsToLocalTimezoneMidnight } from '@/utils';

export const WorldTime = () => {
  const { t } = useTranslation(['worldTime', 'common']);
  const { fullScreenMode } = useAppContext();
  const breakpoint = useBreakpoint();
  const { datetimeParts, zoneIndex, selectZone } = useWorldTime();

  const localTimezoneMidnight = useMemo(
    () => dateComponentsToLocalTimezoneMidnight(datetimeParts),
    [datetimeParts]
  );

  const clockClassNames = cn(allertaStencil.className);

  const mainContentHeight = fullScreenMode.isFullScreen
    ? 'min-h-screen'
    : 'min-h-96';

  const calendarOffset = useMemo(
    () =>
      determineCalendarOffset(
        localTimezoneMidnight,
        breakpoint,
        fullScreenMode.isFullScreen
      ),
    [localTimezoneMidnight, breakpoint, fullScreenMode.isFullScreen]
  );

  return (
    <div>
      {!fullScreenMode.isFullScreen && (
        <ToolPageHeading
          icon={<LuClock />}
          title={t('worldTime:title')}
          subtitle={t('worldTime:subtitle')}
        />
      )}
      <div
        className={`flex flex-col justify-between py-2 xl:p-4 ${mainContentHeight}`}
      >
        <div className="flex flex-col gap-2 sm:gap-4">
          <YearDate
            datetimeParts={datetimeParts}
            classNames={{ calendarParts: clockClassNames }}
          />
          <div
            className="max-w-1/3 lg:max-w-1/4 text-[8px] sm:text-base lg:text-lg xl:text-xl"
            // Tailwind cannot detect template literal classes at build time and won't include them in the CSS bundle
            // We use style prop to as a workaround for this issue
            style={{ transform: `translateX(${calendarOffset}vw)` }}
          >
            <Calendar
              value={localTimezoneMidnight}
              showNavigation={false}
              formatShortWeekday={() => ''}
              showNeighboringMonth={false}
            />
          </div>
          <WorldTimeClock
            datetimeParts={datetimeParts}
            classNames={{ time: clockClassNames }}
          />
        </div>
        <div className="py-4">
          <Controls zoneIndex={zoneIndex} selectZone={selectZone} />
        </div>
        <div className="sticky bottom-6 flex justify-end pointer-events-none">
          <Button
            size="sm"
            className="cursor-pointer pointer-events-auto"
            onClick={fullScreenMode.toggleFullScreen}
          >
            {fullScreenMode.isFullScreen ? <LuShrink /> : <LuExpand />}
          </Button>
        </div>
      </div>
    </div>
  );
};
