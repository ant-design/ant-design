import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { SkeletonElementProps } from './Element';
import Element from './Element';

export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
  shape?: 'circle' | 'square';
}

const SkeletonAvatar = (props: AvatarProps) => {
  const { prefixCls: customizePrefixCls, className, active } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('skeleton', customizePrefixCls);

  const otherProps = omit(props, ['prefixCls', 'className']);
  const cls = classNames(
    prefixCls,
    `${prefixCls}-element`,
    {
      [`${prefixCls}-active`]: active,
    },
    className,
  );
  return (
    <div className={cls}>
      <Element prefixCls={`${prefixCls}-avatar`} {...otherProps} />
    </div>
  );
};

SkeletonAvatar.defaultProps = {
  size: 'default',
  shape: 'circle',
};

export default SkeletonAvatar;
