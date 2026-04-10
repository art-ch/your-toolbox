import { renderHook, act } from '@testing-library/react';
import { useFullScreenMode } from './useFullScreenMode';

describe('useFullScreenMode', () => {
  it('should toggle fullscreen mode when toggleFullscreenMode() is called', () => {
    const { result } = renderHook(() => useFullScreenMode());

    expect(result.current.isFullScreen).toBe(false);

    act(() => {
      result.current.toggleFullScreen();
    });

    expect(result.current.isFullScreen).toBe(true);

    act(() => {
      result.current.toggleFullScreen();
    });

    expect(result.current.isFullScreen).toBe(false);
  });
});
