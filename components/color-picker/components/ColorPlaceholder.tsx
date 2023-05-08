import classNames from 'classnames';
import type { CSSProperties, FC } from 'react';
import React, { useMemo } from 'react';
import type { ColorPickerBaseProps } from '../interface';
import ColorClear from './ColorClear';

interface ColorPlaceholderProps extends ColorPickerBaseProps {
  popupOpen?: boolean;
  className?: string;
  style?: CSSProperties;
}

const ColorPlaceholder: FC<ColorPlaceholderProps> = (props) => {
  const { color, prefixCls, popupOpen, clearColor, disabled, className, direction, ...resetProps } =
    props;
  const colorInputPrefixCls = `${prefixCls}-placeholder`;

  const containerRender = useMemo(
    () =>
      clearColor ? (
        <ColorClear {...props} />
      ) : (
        <div className={`${colorInputPrefixCls}-container`}>
          <div className={`${colorInputPrefixCls}-display`} />
          <div
            className={`${colorInputPrefixCls}-layer`}
            style={{
              backgroundColor: color?.toRgbString(),
            }}
          />
        </div>
      ),
    [color, clearColor, direction],
  );

  return (
    <div
      className={classNames(colorInputPrefixCls, className, {
        [`${colorInputPrefixCls}-active`]: popupOpen,
        [`${colorInputPrefixCls}-disabled`]: disabled,
      })}
      {...resetProps}
    >
      {containerRender}
    </div>
  );
};
export default ColorPlaceholder;
