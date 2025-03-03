import { renderHook, act } from '@testing-library/react';
import { useDrawer } from './useDrawer';

describe('useDrawer', () => {
  it('should initialize with drawer closed', () => {
    const { result } = renderHook(() => useDrawer());

    expect(result.current.isOpen).toBe(false);
  });

  it('should open the drawer when open() is called', () => {
    const { result } = renderHook(() => useDrawer());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should close the drawer when close() is called', () => {
    const { result } = renderHook(() => useDrawer());

    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it('should maintain state between renders', () => {
    const { result, rerender } = renderHook(() => useDrawer());

    act(() => {
      result.current.open();
    });

    rerender();
    expect(result.current.isOpen).toBe(true);
  });
});
