import classNames from 'classnames';
import type { CSSProperties, FC } from 'react';
import React, { useMemo } from 'react';
import type { ColorPickerBaseProps } from '../interface';
import ColorClear from './ColorClear';

interface ColorPlaceholderProps extends ColorPickerBaseProps {
  popupOpen?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

const ColorPlaceholder: FC<ColorPlaceholderProps> = (props) => {
  const {
    color,
    prefixCls,
    popupOpen,
    clearColor,
    disabled,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;
  const eventProps = { onClick, onMouseEnter, onMouseLeave };
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
    [color, clearColor],
  );

  return (
    <div
      className={classNames(colorInputPrefixCls, className, {
        [`${colorInputPrefixCls}-active`]: popupOpen,
        [`${colorInputPrefixCls}-disabled`]: disabled,
      })}
      {...eventProps}
    >
      {containerRender}
    </div>
  );
};
export default ColorPlaceholder;
