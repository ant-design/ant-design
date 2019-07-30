import * as React from 'react';
import classNames from 'classnames';

export interface SkeletonAvatarProps {
  prefixCls?: string;
  className?: string;
  style?: object;
  size?: 'large' | 'small' | 'default' | number;
  shape?: 'circle' | 'square';
}

class SkeletonAvatar extends React.Component<SkeletonAvatarProps, any> {
  static defaultProps: Partial<SkeletonAvatarProps> = {
    size: 'large',
  };

  render() {
    const { prefixCls, className, style, size, shape } = this.props;

    const sizeCls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
    });

    const shapeCls = classNames({
      [`${prefixCls}-circle`]: shape === 'circle',
      [`${prefixCls}-square`]: shape === 'square',
    });

    const sizeStyle: React.CSSProperties =
      typeof size === 'number'
        ? {
            width: size,
            height: size,
            lineHeight: `${size}px`,
          }
        : {};
    return (
      <span
        className={classNames(prefixCls, className, sizeCls, shapeCls)}
        style={{ ...sizeStyle, ...style }}
      />
    );
  }
}

export default SkeletonAvatar;
