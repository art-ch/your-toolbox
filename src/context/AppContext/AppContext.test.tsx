import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppProvider, useAppContext } from './AppContext';
import { useDrawer } from './hooks/useDrawer/useDrawer';

jest.mock('./hooks/useDrawer/useDrawer', () => ({
  useDrawer: jest.fn()
}));

describe('useAppContext', () => {
  const mockDrawerState = {
    isOpen: false,
    open: jest.fn(),
    close: jest.fn(),
    toggle: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDrawer as jest.Mock).mockReturnValue(mockDrawerState);
  });

  it('provides access to drawer state when used within AppProvider', () => {
    const TestConsumer = () => {
      const { drawer } = useAppContext();
      return <div data-testid="drawer-open">{String(drawer.isOpen)}</div>;
    };

    render(
      <AppProvider>
        <TestConsumer />
      </AppProvider>
    );

    expect(screen.getByTestId('drawer-open')).toHaveTextContent('false');
  });

  it('throws error when used outside of AppProvider', () => {
    const TestMissingProvider = () => {
      useAppContext();

      return null;
    };

    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestMissingProvider />);
    }).toThrow('useAppContext must be used within an AppProvider');

    console.error = originalError;
  });
});
