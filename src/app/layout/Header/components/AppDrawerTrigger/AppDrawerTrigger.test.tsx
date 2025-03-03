import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppDrawerTrigger } from './AppDrawerTrigger';
import { useAppContext } from '@/app/context/AppContext/AppContext';

jest.mock('@/app/context/AppContext/AppContext', () => ({
  useAppContext: jest.fn()
}));

const useAppContextMock = useAppContext as jest.Mock;

describe('AppDrawerTrigger', () => {
  const mockOpen = jest.fn();

  beforeEach(() => {
    useAppContextMock.mockImplementation(() => ({
      drawer: {
        open: mockOpen
      }
    }));

    mockOpen.mockClear();
  });

  it('renders the AlignJustify icon', () => {
    render(<AppDrawerTrigger />);

    const icon = screen.getByTestId('app-drawer-trigger');
    expect(icon).toBeInTheDocument();
  });

  it('calls drawer.open when clicked', () => {
    render(<AppDrawerTrigger />);

    const icon = screen.getByTestId('app-drawer-trigger');
    fireEvent.click(icon);

    expect(mockOpen).toHaveBeenCalledTimes(1);
  });
});
