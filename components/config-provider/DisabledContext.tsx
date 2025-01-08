import * as React from 'react';

const DisabledContext = React.createContext<boolean>(false);

export interface DisabledContextProps {
  disabled?: boolean;
  children?: React.ReactNode;
}

export const DisabledContextProvider: React.FC<DisabledContextProps> = ({ children, disabled }) => {
  const originDisabled = React.useContext(DisabledContext);
  const value = React.useMemo(() => disabled ?? originDisabled, [disabled, originDisabled]);
  return <DisabledContext.Provider value={value}>{children}</DisabledContext.Provider>;
};

export default DisabledContext;
