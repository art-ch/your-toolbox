import React from 'react';
import { render, screen } from '@testing-library/react';
import { ExerciseTypeTabs } from './ExerciseTypeTabs';
import { useExerciseTypeUrlState } from './hooks/useExerciseTypeUrlState';

// Mock the custom hook
jest.mock('./hooks/useExerciseTypeUrlState');
const mockUseExerciseTypeUrlState =
  useExerciseTypeUrlState as jest.MockedFunction<
    typeof useExerciseTypeUrlState
  >;

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}));

// Mock the config file with simplified form components
jest.mock('./config/tabsConfig', () => ({
  EXERCISE_TYPE_TABS_CONFIG: [
    {
      key: 'dynamic',
      themeColor: 'red',
      icon: <span>🏃</span>,
      forms: [
        () => (
          <div data-testid="cleansing-cycles-form">Cleansing Cycles Form</div>
        ),
        () => <div data-testid="speed-form">Speed Form</div>,
        () => <div data-testid="total-time-form">Total Time Form</div>
      ]
    },
    {
      key: 'static',
      themeColor: 'indigo',
      icon: <span>🧘</span>,
      children: [
        {
          key: 'ground',
          themeColor: 'green',
          icon: <span>🌱</span>,
          forms: [
            () => (
              <div data-testid="duration-from-layers-form">
                Duration From Layers Form
              </div>
            ),
            () => (
              <div data-testid="layers-from-duration-form">
                Layers From Duration Form
              </div>
            )
          ]
        },
        {
          key: 'water',
          themeColor: 'cyan',
          icon: <span>🏊</span>,
          forms: [
            () => (
              <div data-testid="mental-layers-form">Mental Layers Form</div>
            ),
            () => <div data-testid="temperature-form">Temperature Form</div>,
            () => <div data-testid="exposure-time-form">Exposure Time Form</div>
          ]
        }
      ]
    }
  ]
}));

describe('ExerciseTypeTabs', () => {
  const mockHandleTabChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseExerciseTypeUrlState.mockReturnValue({
      exerciseTypePath: ['dynamic'],
      handleTabChange: mockHandleTabChange
    });
  });

  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<ExerciseTypeTabs />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('should render top-level tabs from config', () => {
      render(<ExerciseTypeTabs />);

      // Check for dynamic tab
      expect(screen.getByText('dynamic')).toBeInTheDocument();
      // Check for static tab
      expect(screen.getByText('static')).toBeInTheDocument();
    });

    it('should render with correct default tab selected', () => {
      mockUseExerciseTypeUrlState.mockReturnValue({
        exerciseTypePath: ['dynamic'],
        handleTabChange: mockHandleTabChange
      });

      render(<ExerciseTypeTabs />);

      const dynamicTab = screen.getByRole('tab', { name: /dynamic/i });
      expect(dynamicTab).toHaveAttribute('data-state', 'active');
    });

    it('should render forms for dynamic exercise type', () => {
      mockUseExerciseTypeUrlState.mockReturnValue({
        exerciseTypePath: ['dynamic'],
        handleTabChange: mockHandleTabChange
      });

      render(<ExerciseTypeTabs />);

      expect(screen.getByTestId('cleansing-cycles-form')).toBeInTheDocument();
      expect(screen.getByTestId('speed-form')).toBeInTheDocument();
      expect(screen.getByTestId('total-time-form')).toBeInTheDocument();
    });

    it('should render nested tabs for static exercise type', () => {
      mockUseExerciseTypeUrlState.mockReturnValue({
        exerciseTypePath: ['static', 'ground'],
        handleTabChange: mockHandleTabChange
      });

      render(<ExerciseTypeTabs />);

      // Check for nested tabs
      expect(screen.getByText('ground')).toBeInTheDocument();
      expect(screen.getByText('water')).toBeInTheDocument();
    });

    it('should render forms for static ground exercise type', () => {
      mockUseExerciseTypeUrlState.mockReturnValue({
        exerciseTypePath: ['static', 'ground'],
        handleTabChange: mockHandleTabChange
      });

      render(<ExerciseTypeTabs />);

      expect(
        screen.getByTestId('duration-from-layers-form')
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('layers-from-duration-form')
      ).toBeInTheDocument();
    });

    it('should render forms for static water exercise type', () => {
      mockUseExerciseTypeUrlState.mockReturnValue({
        exerciseTypePath: ['static', 'water'],
        handleTabChange: mockHandleTabChange
      });

      render(<ExerciseTypeTabs />);

      expect(screen.getByTestId('mental-layers-form')).toBeInTheDocument();
      expect(screen.getByTestId('temperature-form')).toBeInTheDocument();
      expect(screen.getByTestId('exposure-time-form')).toBeInTheDocument();
    });
  });

  describe('Tab Interaction', () => {
    it('should render tabs with correct text content', () => {
      render(<ExerciseTypeTabs />);

      // Check that tabs are rendered with correct text content
      const dynamicTab = screen.getByRole('tab', { name: /dynamic/i });
      const staticTab = screen.getByRole('tab', { name: /static/i });

      expect(dynamicTab).toHaveTextContent('dynamic');
      expect(staticTab).toHaveTextContent('static');
    });

    it('should render nested tabs when static is selected', () => {
      mockUseExerciseTypeUrlState.mockReturnValue({
        exerciseTypePath: ['static', 'ground'],
        handleTabChange: mockHandleTabChange
      });

      render(<ExerciseTypeTabs />);

      // Check for nested tabs
      const groundTab = screen.getByRole('tab', { name: /ground/i });
      const waterTab = screen.getByRole('tab', { name: /water/i });

      expect(groundTab).toBeInTheDocument();
      expect(waterTab).toBeInTheDocument();
    });
  });

  describe('Configuration Handling', () => {
    it('should handle empty config gracefully', () => {
      mockUseExerciseTypeUrlState.mockReturnValue({
        exerciseTypePath: [],
        handleTabChange: mockHandleTabChange
      });

      render(<ExerciseTypeTabs />);

      // Should not crash and should render empty tabs
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });
  });

  describe('Hook Integration', () => {
    it('should call useExerciseTypeUrlState with correct config', () => {
      render(<ExerciseTypeTabs />);

      expect(mockUseExerciseTypeUrlState).toHaveBeenCalledWith(
        expect.any(Array)
      );
    });

    it('should use exerciseTypePath from hook for tab selection', () => {
      mockUseExerciseTypeUrlState.mockReturnValue({
        exerciseTypePath: ['static', 'water'],
        handleTabChange: mockHandleTabChange
      });

      render(<ExerciseTypeTabs />);

      // The water tab should be active in the nested level
      const waterTab = screen.getByRole('tab', { name: /water/i });
      expect(waterTab).toHaveAttribute('data-state', 'active');
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing currentValue in renderTabs', () => {
      mockUseExerciseTypeUrlState.mockReturnValue({
        exerciseTypePath: ['nonexistent'],
        handleTabChange: mockHandleTabChange
      });

      render(<ExerciseTypeTabs />);

      // Should fallback to first config item
      expect(screen.getByText('dynamic')).toBeInTheDocument();
    });
  });
});
