import { render, screen } from '@testing-library/react';
import { Tabs, TabsList } from '@/components/ui/tabs';
import { Trigger } from './Trigger';
import { ThemeColor } from '../../ExerciseTypeTabs.types';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key
  })
}));

describe('Trigger', () => {
  const mockIcon = <span data-testid="test-icon">🏃</span>;
  const defaultProps = {
    icon: mockIcon,
    color: ThemeColor.RED,
    value: 'test-exercise'
  };

  it('should render', () => {
    const { container } = render(
      <Tabs value="test-exercise">
        <TabsList>
          <Trigger {...defaultProps} />
        </TabsList>
      </Tabs>
    );

    expect(container).toMatchSnapshot();
  });

  it('should render with correct props', () => {
    render(
      <Tabs value="test-exercise">
        <TabsList>
          <Trigger {...defaultProps} />
        </TabsList>
      </Tabs>
    );

    expect(screen.getByText('test-exercise')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('should pass correct value to TabsTrigger', () => {
    const { container } = render(
      <Tabs value="custom-value">
        <TabsList>
          <Trigger {...defaultProps} value="custom-value" />
        </TabsList>
      </Tabs>
    );

    const trigger = container.querySelector('[data-state="active"]');
    expect(trigger).toBeInTheDocument();
    // The value is passed as a prop to TabsTrigger, not as an attribute
    expect(trigger).toHaveTextContent('custom-value');
  });

  it('should handle different icon types', () => {
    const customIcon = <div data-testid="custom-icon">Custom Icon</div>;

    render(
      <Tabs value="test-exercise">
        <TabsList>
          <Trigger {...defaultProps} icon={customIcon} />
        </TabsList>
      </Tabs>
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
  });

  it('should render with different values', () => {
    const { rerender } = render(
      <Tabs value="exercise1">
        <TabsList>
          <Trigger {...defaultProps} value="exercise1" />
        </TabsList>
      </Tabs>
    );

    expect(screen.getByText('exercise1')).toBeInTheDocument();

    rerender(
      <Tabs value="exercise2">
        <TabsList>
          <Trigger {...defaultProps} value="exercise2" />
        </TabsList>
      </Tabs>
    );

    expect(screen.getByText('exercise2')).toBeInTheDocument();
  });
});
