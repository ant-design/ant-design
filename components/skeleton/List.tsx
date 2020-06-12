import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import ElementList, { SkeletonElementProps } from './ElementList';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface SkeletonListProps extends Omit<SkeletonElementProps, 'size'> {
  size?: 'large' | 'small' | 'default';
}

const SkeletonList = (props: SkeletonListProps) => {
  const renderSkeletonList = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, active } = props;
    const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
    const otherProps = omit(props, ['prefixCls']);
    const cls = classNames(prefixCls, className, `${prefixCls}-element`, {
      [`${prefixCls}-active`]: active,
    });
    return (
      <div className={cls}>
        <ElementList prefixCls={`${prefixCls}-list`} {...otherProps} />
      </div>
    );
  };
  return <ConfigConsumer>{renderSkeletonList}</ConfigConsumer>;
};

SkeletonList.defaultProps = {
  size: 'default',
};

export default SkeletonList;
