import { renderHook, act } from '@testing-library/react';

import { useClock } from './useClock';

describe('useClock', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return initial time matching system time', () => {
    const mockDate = new Date('2023-01-01T12:00:00.000Z');
    jest.setSystemTime(mockDate);

    const { result } = renderHook(() => useClock());

    expect(result.current.getTime()).toBe(mockDate.getTime());
  });

  it('should update returned Date every second', () => {
    const initialDate = new Date('2023-01-01T12:00:00.000Z');
    jest.setSystemTime(initialDate);

    const { result } = renderHook(() => useClock());

    expect(result.current.getTime()).toBe(initialDate.getTime());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.getTime()).toBe(initialDate.getTime() + 1000);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.getTime()).toBe(initialDate.getTime() + 2000);
  });

  it('should clear interval on unmount', () => {
    jest.setSystemTime(new Date('2023-01-01T12:00:00.000Z'));

    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

    const { unmount } = renderHook(() => useClock());

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });
});
