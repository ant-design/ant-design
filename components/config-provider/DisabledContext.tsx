import * as React from 'react';

const DisabledContext = React.createContext<boolean>(false);

export interface DisabledContextProps {
  disabled?: boolean;
  children?: React.ReactNode;
}

export const DisabledContextProvider: React.FC<DisabledContextProps> = ({ children, disabled }) => {
  const originDisabled = React.useContext(DisabledContext);
  return (
    <DisabledContext.Provider value={disabled ?? originDisabled}>
      {children}
    </DisabledContext.Provider>
  );
};

export default DisabledContext;
