import * as React from 'react';
import { clsx } from 'clsx';

import { ConfigContext } from '../config-provider';
import type { SkeletonElementProps } from './Element';
import useStyle from './style';

export interface SkeletonNodeProps extends Omit<SkeletonElementProps, 'size' | 'shape'> {
  children?: React.ReactNode;
  internalClassName?: string;
}

const SkeletonNode: React.FC<SkeletonNodeProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    classNames: skeletonNodeClassNames,
    rootClassName,
    internalClassName,
    style,
    styles,
    active,
    children,
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);

  const cls = clsx(
    prefixCls,
    `${prefixCls}-element`,
    { [`${prefixCls}-active`]: active },
    hashId,
    skeletonNodeClassNames?.root,
    className,
    rootClassName,
    cssVarCls,
  );

  return (
    <div className={cls} style={styles?.root}>
      <div
        className={clsx(skeletonNodeClassNames?.content, internalClassName || `${prefixCls}-node`)}
        style={{ ...styles?.content, ...style }}
      >
        {children}
      </div>
    </div>
  );
};

export default SkeletonNode;
