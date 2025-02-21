'use client';

import { AppProvider } from './context/AppContext/AppContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
