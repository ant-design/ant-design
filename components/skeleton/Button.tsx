import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import Element, { SkeletonElementProps } from './Element';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

interface SkeletonButtonProps extends Omit<SkeletonElementProps, 'size'> {
  size?: 'large' | 'small' | 'default';
}

// eslint-disable-next-line react/prefer-stateless-function
class SkeletonButton extends React.Component<SkeletonButtonProps, any> {
  static defaultProps: Partial<SkeletonButtonProps> = {
    size: 'default',
  };

  renderSkeletonButton = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, active } = this.props;
    const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
    const otherProps = omit(this.props, ['prefixCls']);
    const cls = classNames(prefixCls, className, `${prefixCls}-element`, {
      [`${prefixCls}-active`]: active,
    });
    return (
      <div className={cls}>
        <Element prefixCls={`${prefixCls}-button`} {...otherProps} />
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderSkeletonButton}</ConfigConsumer>;
  }
}

export default SkeletonButton;
