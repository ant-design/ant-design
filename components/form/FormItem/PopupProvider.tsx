import * as React from 'react';

import { FormItemPopupContext } from '../context';

interface PopupProviderProps {
  children?: React.ReactNode;
}

export default function PopupProvider({ children }: PopupProviderProps) {
  const [popupOpen, setPopupOpen] = React.useState(false);

  const value = React.useMemo(
    () => ({
      popupOpen,
      setPopupOpen,
    }),
    [popupOpen],
  );

  return <FormItemPopupContext.Provider value={value}>{children}</FormItemPopupContext.Provider>;
}
