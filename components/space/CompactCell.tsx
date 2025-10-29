import React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import { useCompactItemContext } from './Compact';

export interface SpaceCompactCellProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  children: React.ReactNode;
  prefixCls?: string;
}

const SpaceCompactCell = React.forwardRef<HTMLDivElement, SpaceCompactCellProps>((props, ref) => {
  const {
    className,
    vertical,
    children,
    style,
    prefixCls: customizePrefixCls,
    ...restProps
  } = props;
  const { getPrefixCls, direction: directionConfig } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('space-compact-cell', customizePrefixCls);
  const { compactItemClassnames, compactSize, compactDirection } = useCompactItemContext(
    prefixCls,
    directionConfig,
  );

  const classes = classNames(
    prefixCls,
    compactItemClassnames,
    {
      [`${prefixCls}-vertical`]: compactDirection === 'vertical' || vertical,
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

export default SpaceCompactCell;
