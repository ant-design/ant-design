import * as React from 'react';
import type { MenuProps } from '.';

// Used for Dropdown only
export interface OverrideContextProps {
  prefixCls?: string;
  expandIcon?: React.ReactNode;
  mode?: MenuProps['mode'];
  selectable?: boolean;
  validator?: (menuProps: Pick<MenuProps, 'mode'>) => void;
}

/** @private Internal Usage. Only used for Dropdown component. Do not use this in your production. */
const OverrideContext = React.createContext<OverrideContextProps | null>(null);

export default OverrideContext;
