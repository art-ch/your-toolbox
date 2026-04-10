import { renderHook, act } from '@testing-library/react';
import { useWorldTime } from './useWorldTime';
import { useClock } from '@/hooks/useClock';
import { getTimezonedDatetimeParts } from '@/utils';
import { DEFAULT_TIME_ZONE, WORLD_TIME_ZONES } from '../constants/constants';

jest.mock('@/hooks/useClock');
jest.mock('@/utils');

const mockClock = new Date('2024-01-15T12:00:00.000Z');
const mockDatetimeParts = {
  year: '2024',
  month: 'January',
  day: '15',
  hours: '12',
  minutes: '00',
  seconds: '00'
};

const VALID_ZONE = WORLD_TIME_ZONES[0];
const ANOTHER_VALID_ZONE = WORLD_TIME_ZONES[1];

beforeEach(() => {
  jest.clearAllMocks();
  (useClock as jest.Mock).mockReturnValue(mockClock);
  (getTimezonedDatetimeParts as jest.Mock).mockReturnValue(mockDatetimeParts);
});

describe('useWorldTime', () => {
  describe('initial state', () => {
    it('should return default zone id when no argument is provided', () => {
      const { result } = renderHook(() => useWorldTime());

      expect(result.current.zoneIndex).toBe(DEFAULT_TIME_ZONE.id);
    });

    it('should return default zone id when called with default zone id explicitly', () => {
      const { result } = renderHook(() => useWorldTime(DEFAULT_TIME_ZONE.id));

      expect(result.current.zoneIndex).toBe(DEFAULT_TIME_ZONE.id);
    });

    it('should return provided zone id when a valid selectable zone id is given', () => {
      const { result } = renderHook(() => useWorldTime(VALID_ZONE.id));

      expect(result.current.zoneIndex).toBe(VALID_ZONE.id);
    });

    it('should fall back to default zone id when an unknown zone id is given', () => {
      const { result } = renderHook(() => useWorldTime('unknown/zone'));

      expect(result.current.zoneIndex).toBe(DEFAULT_TIME_ZONE.id);
    });

    it('should expose the full WORLD_TIME_ZONES list', () => {
      const { result } = renderHook(() => useWorldTime());

      expect(result.current.timeZones).toBe(WORLD_TIME_ZONES);
    });

    it('should return datetimeParts from getTimezonedDatetimeParts', () => {
      const { result } = renderHook(() => useWorldTime());

      expect(result.current.datetimeParts).toEqual(mockDatetimeParts);
    });
  });

  describe('IANA timezone resolution', () => {
    it('should call getTimezonedDatetimeParts with default IANA when default zone is selected', () => {
      renderHook(() => useWorldTime());

      expect(getTimezonedDatetimeParts).toHaveBeenCalledWith(
        mockClock,
        DEFAULT_TIME_ZONE.iana
      );
    });

    it('should call getTimezonedDatetimeParts with correct IANA for a valid zone', () => {
      renderHook(() => useWorldTime(VALID_ZONE.id));

      expect(getTimezonedDatetimeParts).toHaveBeenCalledWith(
        mockClock,
        VALID_ZONE.iana
      );
    });
  });

  describe('selectZone', () => {
    it('should update zoneIndex when a valid zone id is selected', () => {
      const { result } = renderHook(() => useWorldTime());

      act(() => {
        result.current.selectZone(VALID_ZONE.id);
      });

      expect(result.current.zoneIndex).toBe(VALID_ZONE.id);
    });

    it('should update zoneIndex to default when default zone id is selected', () => {
      const { result } = renderHook(() => useWorldTime(VALID_ZONE.id));

      act(() => {
        result.current.selectZone(DEFAULT_TIME_ZONE.id);
      });

      expect(result.current.zoneIndex).toBe(DEFAULT_TIME_ZONE.id);
    });

    it('should not update zoneIndex when an unknown zone id is provided', () => {
      const { result } = renderHook(() => useWorldTime(VALID_ZONE.id));

      act(() => {
        result.current.selectZone('invalid/zone');
      });

      expect(result.current.zoneIndex).toBe(VALID_ZONE.id);
    });

    it('should switch between two valid zones correctly', () => {
      const { result } = renderHook(() => useWorldTime(VALID_ZONE.id));

      act(() => {
        result.current.selectZone(ANOTHER_VALID_ZONE.id);
      });

      expect(result.current.zoneIndex).toBe(ANOTHER_VALID_ZONE.id);
    });

    it('should update datetimeParts after selecting a new zone', () => {
      const updatedParts = { ...mockDatetimeParts, hours: '14' };
      (getTimezonedDatetimeParts as jest.Mock).mockReturnValue(updatedParts);

      const { result } = renderHook(() => useWorldTime());

      act(() => {
        result.current.selectZone(VALID_ZONE.id);
      });

      expect(result.current.datetimeParts).toEqual(updatedParts);
    });

    it('should maintain a stable selectZone reference across renders', () => {
      const { result, rerender } = renderHook(() => useWorldTime());

      const firstRef = result.current.selectZone;

      rerender();

      expect(result.current.selectZone).toBe(firstRef);
    });
  });

  describe('clock updates', () => {
    it('should recompute datetimeParts when clock changes', () => {
      const updatedClock = new Date('2024-01-15T13:00:00.000Z');
      const updatedParts = { ...mockDatetimeParts, hours: '13' };

      const { rerender, result } = renderHook(() => useWorldTime());

      (useClock as jest.Mock).mockReturnValue(updatedClock);
      (getTimezonedDatetimeParts as jest.Mock).mockReturnValue(updatedParts);

      rerender();

      expect(getTimezonedDatetimeParts).toHaveBeenLastCalledWith(
        updatedClock,
        DEFAULT_TIME_ZONE.iana
      );
      expect(result.current.datetimeParts).toEqual(updatedParts);
    });
  });
});
