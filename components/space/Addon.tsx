import React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import { useCompactItemContext } from './Compact';

export interface SpaceAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  block?: boolean;
  children: React.ReactNode;
  prefixCls?: string;
}

const SpaceAddon = React.forwardRef<HTMLDivElement, SpaceAddonProps>((props, ref) => {
  const {
    className,
    vertical,
    block,
    children,
    style,
    prefixCls: customizePrefixCls,
    ...restProps
  } = props;
  const { getPrefixCls, direction: directionConfig } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('space-addon', customizePrefixCls);
  const { compactItemClassnames, compactSize, compactDirection } = useCompactItemContext(
    prefixCls,
    directionConfig,
  );

  const classes = classNames(
    prefixCls,
    compactItemClassnames,
    {
      [`${prefixCls}-vertical`]: compactDirection === 'vertical' || vertical,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-${compactSize}`]: compactSize,
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
