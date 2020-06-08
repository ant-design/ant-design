import * as React from 'react';
import classNames from 'classnames';

export interface SkeletonElementProps {
  prefixCls?: string;
  className?: string;
  style?: object;
  size?: 'large' | 'small' | 'default' | number;
  shape?: 'circle' | 'square' | 'round';
  active?: boolean;
}

const Element = (props: SkeletonElementProps) => {
  const { prefixCls, className, style, size, shape } = props;

  const sizeCls = classNames({
    [`${prefixCls}-lg`]: size === 'large',
    [`${prefixCls}-sm`]: size === 'small',
  });

  const shapeCls = classNames({
    [`${prefixCls}-circle`]: shape === 'circle',
    [`${prefixCls}-square`]: shape === 'square',
    [`${prefixCls}-round`]: shape === 'round',
  });

  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          lineHeight: `${size}px`,
        }
      : {};

  let renderImage;
  if (prefixCls?.includes('image')) {
    const path =
      'M984.615385 196.923077c0-43.323077-35.446154-78.769231-78.769231-78.769231H118.153846c-43.323077 0-78.769231 35.446154-78.769231 78.769231v630.153846c0 43.323077 35.446154 78.769231 78.769231 78.769231h787.692308c43.323077 0 78.769231-35.446154 78.769231-78.769231V196.923077zM779.815385 748.307692h-571.076923c-23.630769 0-37.415385-25.6-25.6-45.292307l173.292307-301.292308c7.876923-13.784615 25.6-13.784615 33.476923 0l104.369231 179.2c7.876923 11.815385 25.6 13.784615 33.476923 1.969231l84.676923-122.092308c7.876923-11.815385 25.6-11.815385 33.476923 0L801.476923 708.923077c11.815385 17.723077 0 39.384615-21.661538 39.384615zM728.615385 393.846154c-43.323077 0-78.769231-35.446154-78.769231-78.769231s35.446154-78.769231 78.769231-78.769231 78.769231 35.446154 78.76923 78.769231-35.446154 78.769231-78.76923 78.769231z';
    renderImage = (
      <svg
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        className={`${prefixCls}-svg`}
      >
        <path d={path} className={`${prefixCls}-path`} />
      </svg>
    );
  }

  return renderImage ? (
    <span className={classNames(prefixCls, className, sizeCls, shapeCls)}>{renderImage}</span>
  ) : (
    <span
      className={classNames(prefixCls, className, sizeCls, shapeCls)}
      style={{ ...sizeStyle, ...style }}
    />
  );
};

export default Element;
