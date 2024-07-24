import type { CSSProperties, MouseEventHandler } from 'react';
import React, { forwardRef, useMemo } from 'react';
import { ColorBlock } from '@rc-component/color-picker';
import classNames from 'classnames';
import pickAttrs from 'rc-util/lib/pickAttrs';

import type { AggregationColor } from '../color';
import type { ColorFormatType, ColorPickerProps } from '../interface';
import { getColorAlpha } from '../util';
import ColorClear from './ColorClear';

export interface ColorTriggerProps {
  prefixCls: string;
  disabled?: boolean;
  format?: ColorFormatType;
  color: AggregationColor;
  open?: boolean;
  showText?: ColorPickerProps['showText'];
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const ColorTrigger = forwardRef<HTMLDivElement, ColorTriggerProps>((props, ref) => {
  const { color, prefixCls, open, disabled, format, className, showText, ...rest } = props;
  const colorTriggerPrefixCls = `${prefixCls}-trigger`;

  // ============================== Text ==============================
  const text = React.useMemo(() => {
    if (!showText) {
      return '';
    }

    if (typeof showText === 'function') {
      return showText(color);
    }

    if (color.isGradient()) {
      return color
        .getColors()
        .map((c) => `${c.color.toRgbString()} ${c.percent}%`)
        .join(', ');
    }

    const hexString = color.toHexString().toUpperCase();
    const alpha = getColorAlpha(color);
    switch (format) {
      case 'rgb':
        return color.toRgbString();
      case 'hsb':
        return color.toHsbString();
      // case 'hex':
      default:
        return alpha < 100 ? `${hexString.slice(0, 7)},${alpha}%` : hexString;
    }
  }, [color, format, showText]);

  // ============================= Render =============================
  const containerNode = useMemo<React.ReactNode>(
    () =>
      color.cleared ? (
        <ColorClear prefixCls={prefixCls} />
      ) : (
        <ColorBlock prefixCls={prefixCls} color={color.toCssString()} />
      ),
    [color, prefixCls],
  );

  return (
    <div
      ref={ref}
      className={classNames(colorTriggerPrefixCls, className, {
        [`${colorTriggerPrefixCls}-active`]: open,
        [`${colorTriggerPrefixCls}-disabled`]: disabled,
      })}
      {...pickAttrs(rest)}
    >
      {containerNode}
      {showText && <div className={`${colorTriggerPrefixCls}-text`}>{text}</div>}
    </div>
  );
});

export default ColorTrigger;
