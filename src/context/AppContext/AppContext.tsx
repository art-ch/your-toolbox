import { createContext, useContext } from 'react';
import { DrawerState, useDrawer } from './hooks/useDrawer';
import {
  FullScreenModeState,
  useFullScreenMode
} from './hooks/useFullScreenMode';

type AppContextType = {
  drawer: DrawerState;
  fullScreenMode: FullScreenModeState;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const drawer = useDrawer();
  const fullScreenMode = useFullScreenMode();

  return (
    <AppContext.Provider value={{ drawer, fullScreenMode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
