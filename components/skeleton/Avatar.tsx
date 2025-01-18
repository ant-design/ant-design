import * as React from 'react';
import omit from '@rc-component/util/lib/omit';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import type { SkeletonElementProps } from './Element';
import Element from './Element';
import useStyle from './style';

export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
  shape?: 'circle' | 'square';
}

const SkeletonAvatar: React.FC<AvatarProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    classNames: skeletonAvatarClassNames,
    rootClassName,
    active,
    style,
    styles,
    shape = 'circle',
    size = 'default',
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const otherProps = omit(props, ['prefixCls', 'className', 'classNames', 'style', 'styles']);
  const cls = classNames(
    prefixCls,
    `${prefixCls}-element`,
    {
      [`${prefixCls}-active`]: active,
    },
    skeletonAvatarClassNames?.root,
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  return wrapCSSVar(
    <div className={cls} style={styles?.root}>
      <Element
        prefixCls={`${prefixCls}-avatar`}
        className={skeletonAvatarClassNames?.avatar}
        style={{ ...styles?.avatar, ...style }}
        shape={shape}
        size={size}
        {...otherProps}
      />
    </div>,
  );
};

export default SkeletonAvatar;
