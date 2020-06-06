import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import Element, { SkeletonElementProps } from './Element';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface SkeletonImageProps
  extends Omit<SkeletonElementProps, 'size' | 'shape' | 'active'> {
  size?: 'large' | 'small' | 'default';
}

const SkeletonImage = (props: SkeletonImageProps) => {
  const renderSkeletonImage = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className } = props;
    const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
    const otherProps = omit(props, ['prefixCls']);
    const cls = classNames(prefixCls, className, `${prefixCls}-element`);
    return (
      <div className={cls}>
        <Element prefixCls={`${prefixCls}-image`} {...otherProps} />
      </div>
    );
  };
  return <ConfigConsumer>{renderSkeletonImage}</ConfigConsumer>;
};

SkeletonImage.defaultProps = {
  size: 'default',
};

export default SkeletonImage;
