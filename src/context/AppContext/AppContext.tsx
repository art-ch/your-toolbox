import { createContext, useContext } from 'react';
import { DrawerState, useDrawer } from './hooks/useDrawer/useDrawer';

type AppContextType = {
  drawer: DrawerState;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const drawer = useDrawer();

  return (
    <AppContext.Provider value={{ drawer }}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
