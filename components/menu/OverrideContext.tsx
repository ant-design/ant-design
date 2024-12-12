import * as React from 'react';
import { getNodeRef, supportNodeRef, useComposeRef } from 'rc-util/lib/ref';

import ContextIsolator from '../_util/ContextIsolator';
import type { MenuProps } from './menu';

// Used for Dropdown only
export interface OverrideContextProps {
  prefixCls?: string;
  expandIcon?: React.ReactNode;
  mode?: MenuProps['mode'];
  selectable?: boolean;
  validator?: (menuProps: Pick<MenuProps, 'mode'>) => void;
  onClick?: () => void;
  rootClassName?: string;
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
      restProps.rootClassName,
      // restProps.validator, Not mark as deps since this is a function
    ],
  );

  const canRef = supportNodeRef(children);
  const mergedRef = useComposeRef(ref, canRef ? getNodeRef(children) : null);

  return (
    <OverrideContext.Provider value={context}>
      <ContextIsolator space>
        {canRef
          ? React.cloneElement(
              children as React.ReactElement<{
                ref?: React.Ref<HTMLElement>;
              }>,
              { ref: mergedRef },
            )
          : children}
      </ContextIsolator>
    </OverrideContext.Provider>
  );
});

/** @internal Only used for Dropdown component. Do not use this in your production. */
export default OverrideContext;
