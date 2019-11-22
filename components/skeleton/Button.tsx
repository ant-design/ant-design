import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import SkeletonElement, { SkeletonElementProps } from './SkeletonElement';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

interface ButtonProps extends Omit<SkeletonElementProps, 'size'> {
  active?: boolean;
  size?: 'large' | 'small' | 'default';
}

// eslint-disable-next-line react/prefer-stateless-function
class SkeletonButton extends React.Component<ButtonProps, any> {
  static defaultProps: Partial<ButtonProps> = {
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
        <SkeletonElement prefixCls={`${prefixCls}-button`} {...otherProps} />
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderSkeletonButton}</ConfigConsumer>;
  }
}

export default SkeletonButton;
