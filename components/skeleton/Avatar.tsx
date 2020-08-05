import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Element, { SkeletonElementProps } from './Element';

export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
  shape?: 'circle' | 'square';
}

const SkeletonAvatar = (props: AvatarProps) => {
  const renderSkeletonAvatar = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, active } = props;
    const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
    const otherProps = omit(props, ['prefixCls']);
    const cls = classNames(prefixCls, className, `${prefixCls}-element`, {
      [`${prefixCls}-active`]: active,
    });
    return (
      <div className={cls}>
        <Element prefixCls={`${prefixCls}-avatar`} {...otherProps} />
      </div>
    );
  };
  return <ConfigConsumer>{renderSkeletonAvatar}</ConfigConsumer>;
};

SkeletonAvatar.defaultProps = {
  size: 'default',
  shape: 'circle',
};

export default SkeletonAvatar;
