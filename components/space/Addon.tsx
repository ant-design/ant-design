import React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import { useCompactItemContext } from './Compact';

export interface SpaceCompactCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  prefixCls?: string;
}

const SpaceCompactCell = React.forwardRef<HTMLDivElement, SpaceCompactCellProps>((props, ref) => {
  const { className, children, style, prefixCls: customizePrefixCls, ...restProps } = props;
  const { getPrefixCls, direction: directionConfig } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('space-compact-addon', customizePrefixCls);
  const { compactItemClassnames, compactSize } = useCompactItemContext(prefixCls, directionConfig);

  const classes = classNames(
    prefixCls,
    compactItemClassnames,
    {
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
