import { useCallback, useMemo, useState } from 'react';
import { useClock } from '@/hooks/useClock';
import { getTimezonedDatetimeParts } from '@/utils';
import { DEFAULT_TIME_ZONE, WORLD_TIME_ZONES } from '../constants/constants';

const isSelectableZoneId = (id: string) =>
  WORLD_TIME_ZONES.some((z) => z.id === id);

const resolveInitialZoneId = (id: string): string => {
  if (id === DEFAULT_TIME_ZONE.id) return DEFAULT_TIME_ZONE.id;

  if (isSelectableZoneId(id)) return id;

  return DEFAULT_TIME_ZONE.id;
};

export function useWorldTime(
  initialSelectedZoneId: string = DEFAULT_TIME_ZONE.id
) {
  const clock = useClock();

  const [selectedZoneId, setSelectedZoneId] = useState(() =>
    resolveInitialZoneId(initialSelectedZoneId)
  );

  const timeZone = useMemo(() => {
    if (selectedZoneId === DEFAULT_TIME_ZONE.id) {
      return DEFAULT_TIME_ZONE.iana;
    }

    return (
      WORLD_TIME_ZONES.find((z) => z.id === selectedZoneId)?.iana ??
      DEFAULT_TIME_ZONE.iana
    );
  }, [selectedZoneId]);

  const datetimeParts = useMemo(
    () => getTimezonedDatetimeParts(clock, timeZone),
    [clock, timeZone]
  );

  const selectZone = useCallback((zoneId: string) => {
    if (zoneId === DEFAULT_TIME_ZONE.id) {
      setSelectedZoneId(DEFAULT_TIME_ZONE.id);
      return;
    }

    if (isSelectableZoneId(zoneId)) {
      setSelectedZoneId(zoneId);
    }
  }, []);

  return {
    datetimeParts,
    zoneIndex: selectedZoneId,
    timeZones: WORLD_TIME_ZONES,
    selectZone
  };
}
