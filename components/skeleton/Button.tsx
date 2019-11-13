import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import Button, { ButtonProps } from '../button';
import SkeletonElement from './SkeletonElement';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

interface SkeletonButtonProps extends ButtonProps {
  loading?: boolean;
  active?: boolean;
}

// eslint-disable-next-line react/prefer-stateless-function
class SkeletonButton extends React.Component<SkeletonButtonProps, any> {
  static defaultProps: Partial<SkeletonButtonProps> = {
    size: 'default',
  };

  renderSkeletonButton = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, active, loading } = this.props;
    if (loading || !('loading' in this.props)) {
      const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
      const otherProps = omit(this.props, ['prefixCls']);
      const cls = classNames(prefixCls, className, {
        [`${prefixCls}-active`]: active,
      });
      return (
        <div className={cls}>
          <SkeletonElement prefixCls={`${prefixCls}-button`} {...otherProps} />
        </div>
      );
    }
    const otherProps = omit(this.props, ['active']);
    return <Button {...otherProps} />;
  };

  render() {
    return <ConfigConsumer>{this.renderSkeletonButton}</ConfigConsumer>;
  }
}

export default SkeletonButton;
