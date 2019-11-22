import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import SkeletonElement, { SkeletonElementProps } from './SkeletonElement';

export interface AvatarProps extends Omit<SkeletonElementProps, 'shape'> {
  active?: boolean;
  shape?: 'circle' | 'square';
}

// eslint-disable-next-line react/prefer-stateless-function
class SkeletonAvatar extends React.Component<AvatarProps, any> {
  static defaultProps: Partial<AvatarProps> = {
    size: 'default',
    shape: 'circle',
  };

  renderSkeletonAvatar = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, active } = this.props;
    const prefixCls = getPrefixCls('skeleton', customizePrefixCls);
    const otherProps = omit(this.props, ['prefixCls']);
    const cls = classNames(prefixCls, className, `${prefixCls}-element`, {
      [`${prefixCls}-active`]: active,
    });
    return (
      <div className={cls}>
        <SkeletonElement prefixCls={`${prefixCls}-avatar`} {...otherProps} />
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderSkeletonAvatar}</ConfigConsumer>;
  }
}

export default SkeletonAvatar;
