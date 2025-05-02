import { useState } from 'react';

export type DrawerState = {
  readonly isOpen: boolean;
  readonly open: () => void;
  readonly close: () => void;
};

export const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close
  };
};
