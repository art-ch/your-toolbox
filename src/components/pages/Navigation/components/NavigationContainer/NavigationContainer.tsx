import React from 'react';

export type NavigationContainerProps = { children: React.ReactNode };

export const NavigationContainer = ({ children }: NavigationContainerProps) => {
  return (
    <nav className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 pt-1 pb-4 md:py-5">
      {children}
    </nav>
  );
};
