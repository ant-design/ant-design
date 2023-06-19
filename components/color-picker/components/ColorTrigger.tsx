import { ColorBlock } from '@rc-component/color-picker';
import classNames from 'classnames';
import type { CSSProperties, MouseEventHandler } from 'react';
import React, { forwardRef, useMemo } from 'react';
import type { ColorPickerProps } from '../ColorPicker';
import type { ColorPickerBaseProps } from '../interface';
import ColorClear from './ColorClear';

interface colorTriggerProps
  extends Pick<ColorPickerBaseProps, 'prefixCls' | 'colorCleared' | 'disabled'> {
  color: Exclude<ColorPickerBaseProps['color'], undefined>;
  open?: boolean;
  textRender?: ColorPickerProps['textRender'];
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const ColorTrigger = forwardRef<HTMLDivElement, colorTriggerProps>((props, ref) => {
  const { color, prefixCls, open, colorCleared, disabled, className, textRender, ...rest } = props;
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
      {typeof textRender === 'function' && (
        <div className={`${colorTriggerPrefixCls}-text`}>{textRender?.(color)}</div>
      )}
    </div>
  );
});

export default ColorTrigger;
