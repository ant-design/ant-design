import React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import { useCompactItemContext } from './Compact';
import useStyle from './style/addon';

export interface SpaceCompactCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  prefixCls?: string;
}

const SpaceAddon = React.forwardRef<HTMLDivElement, SpaceCompactCellProps>((props, ref) => {
  const { className, children, style, prefixCls: customizePrefixCls, ...restProps } = props;
  const { getPrefixCls, direction: directionConfig } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('space-addon', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);
  const { compactItemClassnames, compactSize } = useCompactItemContext(prefixCls, directionConfig);

  const classes = classNames(
    prefixCls,
    hashId,
    compactItemClassnames,
    cssVarCls,
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

export default SpaceAddon;
