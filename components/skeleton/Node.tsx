import * as React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import type { SkeletonElementProps } from './Element';
import useStyle from './style';

export interface SkeletonNodeProps extends Omit<SkeletonElementProps, 'size' | 'shape'> {
  fullSize?: boolean;
  children?: React.ReactNode;
}

const SkeletonNode: React.FC<SkeletonNodeProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    active,
    children,
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const cls = classNames(
    prefixCls,
    `${prefixCls}-element`,
    {
      [`${prefixCls}-active`]: active,
    },
    hashId,
    className,
    rootClassName,
    cssVarCls,
  );

  return wrapCSSVar(
    <div className={cls}>
      <div className={classNames(`${prefixCls}-image`, className)} style={style}>
        {children}
      </div>
    </div>,
  );
};

export default SkeletonNode;
