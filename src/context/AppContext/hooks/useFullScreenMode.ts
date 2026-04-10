import { useState } from 'react';

export type FullScreenModeState = {
  readonly isFullScreen: boolean;
  readonly toggleFullScreen: () => void;
};

export const useFullScreenMode = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return {
    isFullScreen,
    toggleFullScreen: () => setIsFullScreen(!isFullScreen)
  };
};
