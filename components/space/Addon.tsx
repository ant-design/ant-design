import React from 'react';
import { clsx } from 'clsx';

import { getStatusClassNames } from '../_util/statusUtils';
import type { InputStatus } from '../_util/statusUtils';
import { ConfigContext } from '../config-provider';
import type { Variant } from '../config-provider';
import { useCompactItemContext } from './Compact';
import useStyle from './style/addon';

export interface SpaceCompactCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  prefixCls?: string;
  variant?: Variant;
  disabled?: boolean;
  status?: InputStatus;
}

const SpaceAddon = React.forwardRef<HTMLDivElement, SpaceCompactCellProps>((props, ref) => {
  const {
    className,
    children,
    style,
    prefixCls: customizePrefixCls,
    variant = 'outlined',
    disabled,
    status,
    ...restProps
  } = props;
  const { getPrefixCls, direction: directionConfig } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('space-addon', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);
  const { compactItemClassnames, compactSize } = useCompactItemContext(prefixCls, directionConfig);

  const statusCls = getStatusClassNames(prefixCls, status);

  const classes = clsx(
    prefixCls,
    hashId,
    compactItemClassnames,
    cssVarCls,
    `${prefixCls}-variant-${variant}`,
    statusCls,
    {
      [`${prefixCls}-${compactSize}`]: compactSize,
      [`${prefixCls}-disabled`]: disabled,
    },
    className,
  );

  return (
    <div ref={ref} className={classes} style={style} {...restProps}>
      {children}
    </div>
  );
});

export default SpaceAddon;
