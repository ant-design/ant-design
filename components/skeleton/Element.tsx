import * as React from 'react';
import { clsx } from 'clsx';

export type ElementSemanticType = {
  classNames?: {
    root?: string;
    content?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    content?: React.CSSProperties;
  };
};

export interface SkeletonElementProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  size?: 'large' | 'small' | 'default' | number;
  shape?: 'circle' | 'square' | 'round' | 'default';
  active?: boolean;
  classNames?: ElementSemanticType['classNames'];
  styles?: ElementSemanticType['styles'];
}

const Element: React.FC<SkeletonElementProps> = (props) => {
  const { prefixCls, className, style, size, shape } = props;

  const sizeCls = clsx({
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-sm`]: size === 'small',
  });

  const shapeCls = clsx({
    [`${prefixCls}-circle`]: shape === 'circle',
    [`${prefixCls}-square`]: shape === 'square',
    [`${prefixCls}-round`]: shape === 'round',
  });

  const sizeStyle = React.useMemo<React.CSSProperties>(
    () =>
      typeof size === 'number'
        ? {
            width: size,
            height: size,
            lineHeight: `${size}px`,
          }
        : {},
    [size],
  );

  return (
    <span
      className={clsx(prefixCls, sizeCls, shapeCls, className)}
      style={{ ...sizeStyle, ...style }}
    />
  );
};

export default Element;
