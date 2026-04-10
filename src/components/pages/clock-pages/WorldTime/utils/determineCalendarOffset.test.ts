import { determineCalendarOffset } from './determineCalendarOffset';
import {
  Breakpoint,
  BreakpointState
} from '@/hooks/useBreakpoint/useBreakpoint';

const createBreakpointState = (
  activeBreakpoint: Breakpoint
): BreakpointState => ({
  [Breakpoint.XXL]: activeBreakpoint === Breakpoint.XXL,
  [Breakpoint.XL]: activeBreakpoint === Breakpoint.XL,
  [Breakpoint.LG]: activeBreakpoint === Breakpoint.LG,
  [Breakpoint.MD]: activeBreakpoint === Breakpoint.MD,
  [Breakpoint.SM]: activeBreakpoint === Breakpoint.SM
});

/*
 * Date day mapping (Monday-based index):
 * 2024-01-01 = Monday    => index 0
 * 2024-04-01 = Monday    => index 0
 * 2024-07-01 = Monday    => index 0
 * 2024-09-01 = Sunday    => index 6
 * 2024-02-01 = Thursday  => index 3
 * 2024-03-01 = Friday    => index 4
 * 2024-05-01 = Wednesday => index 2
 */

describe('determineCalendarOffset', () => {
  describe('breakpoint config selection', () => {
    it.each([
      {
        breakpointName: 'XXL',
        breakpoint: Breakpoint.XXL,
        isFullScreen: false,
        date: new Date('2024-01-01'), // Monday => index 0
        expected: 0 // XXL values[0]
      },
      {
        breakpointName: 'XXL fullscreen',
        breakpoint: Breakpoint.XXL,
        isFullScreen: true,
        date: new Date('2024-01-01'), // Monday => index 0
        expected: 3 // XXL fullscreenValues[0]
      },
      {
        breakpointName: 'XL',
        breakpoint: Breakpoint.XL,
        isFullScreen: false,
        date: new Date('2024-01-01'), // Monday => index 0
        expected: 3 // LGXLTranslationValues[0]
      },
      {
        breakpointName: 'LG',
        breakpoint: Breakpoint.LG,
        isFullScreen: false,
        date: new Date('2024-01-01'), // Monday => index 0
        expected: 3 // LGXLTranslationValues[0]
      },
      {
        breakpointName: 'MD',
        breakpoint: Breakpoint.MD,
        isFullScreen: false,
        date: new Date('2024-01-01'), // Monday => index 0
        expected: 0 // defaultTranslationValues[0]
      },
      {
        breakpointName: 'SM',
        breakpoint: Breakpoint.SM,
        isFullScreen: false,
        date: new Date('2024-01-01'), // Monday => index 0
        expected: 0 // defaultTranslationValues[0]
      }
    ])(
      'returns correct offset for $breakpointName breakpoint',
      ({ breakpoint, isFullScreen, date, expected }) => {
        const breakpointState = createBreakpointState(breakpoint);

        const result = determineCalendarOffset(
          date,
          breakpointState,
          isFullScreen
        );

        expect(result).toBe(expected);
      }
    );
  });

  describe('day of week offset calculation', () => {
    it.each([
      {
        description: 'Monday (index 0)',
        date: new Date('2024-01-01'),
        expectedIndex: 0
      },
      {
        description: 'Tuesday (index 1)',
        date: new Date('2024-10-01'),
        expectedIndex: 1
      },
      {
        description: 'Wednesday (index 2)',
        date: new Date('2024-05-01'),
        expectedIndex: 2
      },
      {
        description: 'Thursday (index 3)',
        date: new Date('2024-02-01'),
        expectedIndex: 3
      },
      {
        description: 'Friday (index 4)',
        date: new Date('2024-03-01'),
        expectedIndex: 4
      },
      {
        description: 'Saturday (index 5)',
        date: new Date('2024-06-01'),
        expectedIndex: 5
      },
      {
        description: 'Sunday (index 6)',
        date: new Date('2024-09-01'),
        expectedIndex: 6
      }
    ])(
      'correctly maps $description to the right translation value',
      ({ date, expectedIndex }) => {
        const LGXLTranslationValues = [3, 12, 23, 35, 45, 58, 68];
        const breakpointState = createBreakpointState(Breakpoint.XL);

        const result = determineCalendarOffset(date, breakpointState, false);

        expect(result).toBe(LGXLTranslationValues[expectedIndex]);
      }
    );
  });

  describe('fallback to default values', () => {
    it('returns default translation value when no breakpoint matches', () => {
      const defaultTranslationValues = [0, 8, 15, 28, 40, 50, 59];
      const noMatchBreakpointState = {
        [Breakpoint.XXL]: false,
        [Breakpoint.XL]: false,
        [Breakpoint.LG]: false,
        [Breakpoint.MD]: false,
        [Breakpoint.SM]: false
      } as BreakpointState;
      const date = new Date('2024-01-01'); // Monday => index 0

      const result = determineCalendarOffset(
        date,
        noMatchBreakpointState,
        false
      );

      expect(result).toBe(defaultTranslationValues[0]);
    });

    it('ignores fullscreen flag when no fullscreenValues defined for breakpoint', () => {
      const LGXLTranslationValues = [3, 12, 23, 35, 45, 58, 68];
      const breakpointState = createBreakpointState(Breakpoint.LG);
      const date = new Date('2024-01-01'); // Monday => index 0

      const result = determineCalendarOffset(date, breakpointState, true);

      expect(result).toBe(LGXLTranslationValues[0]);
    });
  });

  describe('fullscreen vs non-fullscreen', () => {
    it.each([
      {
        description: 'Monday',
        date: new Date('2024-01-01'),
        index: 0,
        normalExpected: 0,
        fullscreenExpected: 3
      },
      {
        description: 'Thursday',
        date: new Date('2024-02-01'),
        index: 3,
        normalExpected: 25,
        fullscreenExpected: 40
      },
      {
        description: 'Sunday',
        date: new Date('2024-09-01'),
        index: 6,
        normalExpected: 55,
        fullscreenExpected: 70
      }
    ])(
      'returns different values for fullscreen vs normal on $description',
      ({ date, normalExpected, fullscreenExpected }) => {
        const breakpointState = createBreakpointState(Breakpoint.XXL);

        expect(determineCalendarOffset(date, breakpointState, false)).toBe(
          normalExpected
        );
        expect(determineCalendarOffset(date, breakpointState, true)).toBe(
          fullscreenExpected
        );
      }
    );
  });
});
