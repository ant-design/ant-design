import { ColorBlock } from '@rc-component/color-picker';
import classNames from 'classnames';
import type { CSSProperties, MouseEventHandler } from 'react';
import React, { forwardRef, useMemo } from 'react';
import type { ColorPickerBaseProps } from '../interface';
import { getAlphaColor } from '../util';
import ColorClear from './ColorClear';

interface colorTriggerProps
  extends Pick<ColorPickerBaseProps, 'prefixCls' | 'colorCleared' | 'disabled' | 'format'> {
  color: Exclude<ColorPickerBaseProps['color'], undefined>;
  open?: boolean;
  showValue?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const ColorTrigger = forwardRef<HTMLDivElement, colorTriggerProps>((props, ref) => {
  const { color, prefixCls, open, colorCleared, disabled, className, showValue, format, ...rest } =
    props;
  const colorTriggerPrefixCls = `${prefixCls}-trigger`;

  const containerNode = useMemo<React.ReactNode>(
    () =>
      colorCleared ? (
        <ColorClear prefixCls={prefixCls} />
      ) : (
        <ColorBlock prefixCls={prefixCls} color={color.toRgbString()} />
      ),
    [color, colorCleared, prefixCls],
  );

  const genColorString = () => {
    const hexString = color.toHexString().toUpperCase();
    const alpha = getAlphaColor(color);
    switch (format) {
      case 'rgb':
        return color.toRgbString();
      case 'hsb':
        return color.toHsbString();
      case 'hex':
      default:
        return alpha < 100 ? `${hexString.slice(0, 7)},${alpha}%` : hexString;
    }
  };

  return (
    <div
      ref={ref}
      className={classNames(colorTriggerPrefixCls, className, {
        [`${colorTriggerPrefixCls}-active`]: open,
        [`${colorTriggerPrefixCls}-disabled`]: disabled,
      })}
      {...rest}
    >
      {containerNode}
      {showValue && <div className={`${colorTriggerPrefixCls}-color-show`}>{genColorString()}</div>}
    </div>
  );
});

export default ColorTrigger;
