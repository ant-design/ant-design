import * as React from 'react';
import omit from '@rc-component/util/lib/omit';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import type { SkeletonElementProps } from './Element';
import Element from './Element';
import useStyle from './style';

export interface SkeletonButtonProps extends Omit<SkeletonElementProps, 'size'> {
  size?: 'large' | 'small' | 'default';
  block?: boolean;
}

const SkeletonButton: React.FC<SkeletonButtonProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    classNames: skeletonButtonClassNames,
    active,
    style,
    styles,
    block = false,
    size = 'default',
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const otherProps = omit(props, ['prefixCls', 'className', 'classNames', 'style', 'styles']);
  const cls = classNames(
    prefixCls,
    `${prefixCls}-with-element`,
    {
      [`${prefixCls}-active`]: active,
      [`${prefixCls}-block`]: block,
    },
    skeletonButtonClassNames?.root,
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  return wrapCSSVar(
    <div className={cls} style={styles?.root}>
      <Element
        prefixCls={`${prefixCls}-button`}
        className={skeletonButtonClassNames?.button}
        style={{ ...styles?.button, ...style }}
        size={size}
        {...otherProps}
      />
    </div>,
  );
};

export default SkeletonButton;
