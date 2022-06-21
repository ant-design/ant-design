import * as React from 'react';
import type { MenuProps } from '.';

// Used for Dropdown only
export interface OverrideContextProps {
  prefixCls?: string;
  expandIcon?: React.ReactNode;
  mode?: MenuProps['mode'];
  selectable?: boolean;
  validator?: (menuProps: Pick<MenuProps, 'mode'>) => void;
  onClick?: () => void;
}

/** @private Internal Usage. Only used for Dropdown component. Do not use this in your production. */
const OverrideContext = React.createContext<OverrideContextProps | null>(null);

/** @private Internal Usage. Only used for Dropdown component. Do not use this in your production. */
export const OverrideProvider = ({
  children,
  ...restProps
}: OverrideContextProps & { children: React.ReactNode }) => {
  const override = React.useContext(OverrideContext);

  const context = React.useMemo(
    () => ({
      ...override,
      ...restProps,
    }),
    [
      override,
      restProps.prefixCls,
      // restProps.expandIcon, Not mark as deps since this is a ReactNode
      restProps.mode,
      restProps.selectable,
      // restProps.validator, Not mark as deps since this is a function
    ],
  );

  return <OverrideContext.Provider value={context}>{children}</OverrideContext.Provider>;
};

export default OverrideContext;
