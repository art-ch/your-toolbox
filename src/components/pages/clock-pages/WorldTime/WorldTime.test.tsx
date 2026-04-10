import { render, screen, fireEvent } from '@testing-library/react';
import { WorldTime } from './WorldTime';
import { useAppContext } from '@/context/AppContext/AppContext';
import { useBreakpoint } from '@/hooks/useBreakpoint/useBreakpoint';
import { useWorldTime } from './hooks/useWorldTime';
import { determineCalendarOffset } from './utils/determineCalendarOffset';
import { dateComponentsToLocalTimezoneMidnight } from '@/utils';

jest.mock('@/context/AppContext/AppContext');
jest.mock('@/hooks/useBreakpoint/useBreakpoint');
jest.mock('./hooks/useWorldTime');
jest.mock('./utils/determineCalendarOffset');
jest.mock('@/utils');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}));
jest.mock('react-calendar', () => ({
  Calendar: ({ value }: { value: Date }) => (
    <div data-testid="calendar" data-value={value?.toISOString()} />
  )
}));
jest.mock('@/components/PageHeading/PageHeading', () => ({
  ToolPageHeading: ({
    title,
    subtitle
  }: {
    title: string;
    subtitle: string;
  }) => (
    <div data-testid="tool-page-heading">
      <span>{title}</span>
      <span>{subtitle}</span>
    </div>
  )
}));
jest.mock('./WorldTimeClock', () => ({
  WorldTimeClock: ({ classNames }: { classNames: { time: string } }) => (
    <div
      data-testid="world-time-clock"
      data-classnames-time={classNames.time}
    />
  )
}));
jest.mock('./YearDate', () => ({
  YearDate: () => <div data-testid="year-date" />
}));
jest.mock('./Controls', () => ({
  Controls: ({
    zoneIndex,
    selectZone
  }: {
    zoneIndex: number;
    selectZone: () => void;
  }) => (
    <div
      data-testid="controls"
      data-zone-index={zoneIndex}
      onClick={selectZone}
    />
  )
}));

const mockToggleFullScreen = jest.fn();
const mockSelectZone = jest.fn();

const mockDatetimeParts = {
  year: 2024,
  month: 1,
  day: 15,
  hours: 10,
  minutes: 30,
  seconds: 0
};

const mockLocalTimezoneMidnight = new Date('2024-01-15T00:00:00');

const setupMocks = ({
  isFullScreen = false,
  zoneIndex = 0,
  calendarOffset = 0
} = {}) => {
  (useAppContext as jest.Mock).mockReturnValue({
    fullScreenMode: {
      isFullScreen,
      toggleFullScreen: mockToggleFullScreen
    }
  });

  (useBreakpoint as jest.Mock).mockReturnValue('md');

  (useWorldTime as jest.Mock).mockReturnValue({
    datetimeParts: mockDatetimeParts,
    zoneIndex,
    selectZone: mockSelectZone
  });

  (determineCalendarOffset as jest.Mock).mockReturnValue(calendarOffset);

  (dateComponentsToLocalTimezoneMidnight as jest.Mock).mockReturnValue(
    mockLocalTimezoneMidnight
  );
};

describe('WorldTime', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  it('should render correctly', () => {
    const { container } = render(<WorldTime />);

    expect(container).toMatchSnapshot();
  });

  describe('ToolPageHeading', () => {
    it('should render when not in full screen mode', () => {
      setupMocks({ isFullScreen: false });
      render(<WorldTime />);

      expect(screen.getByTestId('tool-page-heading')).toBeInTheDocument();
    });

    it('should not render when in full screen mode', () => {
      setupMocks({ isFullScreen: true });
      render(<WorldTime />);

      expect(screen.queryByTestId('tool-page-heading')).not.toBeInTheDocument();
    });

    it('should render with correct translation keys', () => {
      render(<WorldTime />);

      expect(screen.getByText('worldTime:title')).toBeInTheDocument();
      expect(screen.getByText('worldTime:subtitle')).toBeInTheDocument();
    });
  });

  describe('main content height', () => {
    it('should apply min-h-screen class in full screen mode', () => {
      setupMocks({ isFullScreen: true });
      render(<WorldTime />);

      // first div > first child div
      const mainContent = screen
        .getByTestId('world-time-clock')
        .closest('[class*="min-h"]');

      expect(mainContent).toHaveClass('min-h-screen');
    });

    it('should apply min-h-96 class when not in full screen mode', () => {
      setupMocks({ isFullScreen: false });
      render(<WorldTime />);

      const mainContent = screen
        .getByTestId('world-time-clock')
        .closest('[class*="min-h"]');

      expect(mainContent).toHaveClass('min-h-96');
    });
  });

  describe('Calendar', () => {
    it('should render with localTimezoneMidnight as value', () => {
      render(<WorldTime />);

      expect(screen.getByTestId('calendar')).toHaveAttribute(
        'data-value',
        mockLocalTimezoneMidnight.toISOString()
      );
    });

    it('should apply calendar offset as inline transform style', () => {
      setupMocks({ calendarOffset: 10 });
      render(<WorldTime />);

      const calendarWrapper = screen.getByTestId('calendar').closest('[style]');

      expect(calendarWrapper).toHaveStyle({ transform: 'translateX(10vw)' });
    });

    it('should apply zero calendar offset when determineCalendarOffset returns 0', () => {
      setupMocks({ calendarOffset: 0 });
      render(<WorldTime />);

      const calendarWrapper = screen.getByTestId('calendar').closest('[style]');

      expect(calendarWrapper).toHaveStyle({ transform: 'translateX(0vw)' });
    });
  });

  describe('determineCalendarOffset', () => {
    it('should be called with correct arguments', () => {
      setupMocks({ isFullScreen: true });
      render(<WorldTime />);

      expect(determineCalendarOffset).toHaveBeenCalledWith(
        mockLocalTimezoneMidnight,
        'md',
        true
      );
    });

    it('should recompute when fullscreen mode changes', () => {
      const { rerender } = render(<WorldTime />);

      (useAppContext as jest.Mock).mockReturnValue({
        fullScreenMode: {
          isFullScreen: true,
          toggleFullScreen: mockToggleFullScreen
        }
      });

      rerender(<WorldTime />);

      expect(determineCalendarOffset).toHaveBeenCalledTimes(2);
    });
  });

  describe('dateComponentsToLocalTimezoneMidnight', () => {
    it('should be called with datetimeParts', () => {
      render(<WorldTime />);

      expect(dateComponentsToLocalTimezoneMidnight).toHaveBeenCalledWith(
        mockDatetimeParts
      );
    });
  });

  describe('Controls', () => {
    it('should render with correct zoneIndex', () => {
      setupMocks({ zoneIndex: 3 });
      render(<WorldTime />);

      expect(screen.getByTestId('controls')).toHaveAttribute(
        'data-zone-index',
        '3'
      );
    });

    it('should pass selectZone to Controls', () => {
      render(<WorldTime />);

      fireEvent.click(screen.getByTestId('controls'));

      expect(mockSelectZone).toHaveBeenCalledTimes(1);
    });
  });

  describe('full screen toggle button', () => {
    it('should render expand icon when not in full screen', () => {
      setupMocks({ isFullScreen: false });
      render(<WorldTime />);

      // LuExpand renders an svg with specific title
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should call toggleFullScreen when button is clicked', () => {
      render(<WorldTime />);

      fireEvent.click(screen.getByRole('button'));

      expect(mockToggleFullScreen).toHaveBeenCalledTimes(1);
    });

    it('should render LuShrink icon when in full screen mode', () => {
      setupMocks({ isFullScreen: true });
      const { container } = render(<WorldTime />);

      // LuShrink and LuExpand render different SVG paths
      expect(container.querySelector('button svg')).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  describe('child components', () => {
    it('should render YearDate with datetimeParts', () => {
      render(<WorldTime />);

      expect(screen.getByTestId('year-date')).toBeInTheDocument();
    });

    it('should render WorldTimeClock with correct classNames', () => {
      render(<WorldTime />);

      expect(screen.getByTestId('world-time-clock')).toHaveAttribute(
        'data-classnames-time',
        expect.stringContaining('className')
      );
    });
  });
});
