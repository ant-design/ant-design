import * as React from 'react';
import { supportNodeRef, useComposeRef } from 'rc-util';

import { NoCompactStyle } from '../space/Compact';
import type { MenuProps } from './menu';

// Used for Dropdown only
export interface OverrideContextProps {
  prefixCls?: string;
  expandIcon?: React.ReactNode;
  mode?: MenuProps['mode'];
  selectable?: boolean;
  validator?: (menuProps: Pick<MenuProps, 'mode'>) => void;
  onClick?: () => void;
}

const OverrideContext = React.createContext<OverrideContextProps | null>(null);

/** @internal Only used for Dropdown component. Do not use this in your production. */
export const OverrideProvider = React.forwardRef<
  HTMLElement,
  OverrideContextProps & { children: React.ReactNode }
>((props, ref) => {
  const { children, ...restProps } = props;
  const override = React.useContext(OverrideContext);

  const context = React.useMemo<OverrideContextProps>(
    () => ({ ...override, ...restProps }),
    [
      override,
      restProps.prefixCls,
      // restProps.expandIcon, Not mark as deps since this is a ReactNode
      restProps.mode,
      restProps.selectable,
      // restProps.validator, Not mark as deps since this is a function
    ],
  );

  const canRef = supportNodeRef(children);
  const mergedRef = useComposeRef(ref, canRef ? (children as any).ref : null);

  return (
    <OverrideContext.Provider value={context}>
      <NoCompactStyle>
        {canRef ? React.cloneElement(children as React.ReactElement, { ref: mergedRef }) : children}
      </NoCompactStyle>
    </OverrideContext.Provider>
  );
});

/** @internal Only used for Dropdown component. Do not use this in your production. */
export default OverrideContext;
