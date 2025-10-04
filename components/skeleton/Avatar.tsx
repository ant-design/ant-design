import * as React from 'react';
import { clsx } from 'clsx';

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
    classNames,
    rootClassName,
    active,
    style,
    styles,
    shape = 'circle',
    size = 'default',
    ...rest
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);

  const cls = clsx(
    prefixCls,
    `${prefixCls}-element`,
    {
      [`${prefixCls}-active`]: active,
    },
    classNames?.root,
    className,
    rootClassName,
    hashId,
    cssVarCls,
  );

  return (
    <div className={cls} style={styles?.root}>
      <Element
        prefixCls={`${prefixCls}-avatar`}
        className={classNames?.content}
        style={{ ...styles?.content, ...style }}
        shape={shape}
        size={size}
        {...rest}
      />
    </div>
  );
};

export default SkeletonAvatar;
