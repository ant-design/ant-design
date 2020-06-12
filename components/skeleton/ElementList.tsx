import * as React from 'react';
import classNames from 'classnames';
import Skeleton from './Skeleton';

export interface SkeletonElementProps {
  prefixCls?: string;
  className?: string;
  style?: object;
  size?: 'large' | 'small' | 'default' | number;
  active?: boolean;
}

const ElementList = (props: SkeletonElementProps) => {
  const { prefixCls, className, style, size } = props;

  const sizeCls = classNames({
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-sm`]: size === 'small',
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
    <Skeleton>
      <span
        className={classNames(prefixCls, className, sizeCls)}
        style={{ ...sizeStyle, ...style }}
      />
    </Skeleton>
  );
};

export default ElementList;
