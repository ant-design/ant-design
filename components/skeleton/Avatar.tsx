import * as React from 'react';
import classNames from 'classnames';

export interface SkeletonAvatarProps {
  prefixCls?: string;
  className?: string;
  style?: object;
  size?: 'large' | 'small' | 'default';
}

class Title extends React.Component<SkeletonAvatarProps, any> {
  static defaultProps: Partial<SkeletonAvatarProps> = {
    prefixCls: 'ant-skeleton-avatar',
    size: 'default',
  };

  render() {
    const { prefixCls, className, style, size } = this.props;

    const sizeCls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    });

    return (
      <span className={classNames(prefixCls, className, sizeCls)} style={style} />
    );
  }
}

export default Title;
