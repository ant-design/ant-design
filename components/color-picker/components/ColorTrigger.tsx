import classNames from 'classnames';
import type { CSSProperties, MouseEventHandler } from 'react';
import React, { forwardRef, useMemo } from 'react';
import { ColorBlock } from '@rc-component/color-picker';
import type { ColorPickerBaseProps } from '../interface';
import ColorClear from './ColorClear';

interface colorTriggerProps
  extends Pick<ColorPickerBaseProps, 'prefixCls' | 'clearColor' | 'disabled'> {
  color: Exclude<ColorPickerBaseProps['color'], undefined>;
  open?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
}

const ColorTrigger = forwardRef<HTMLDivElement, colorTriggerProps>((props, ref) => {
  const { color, prefixCls, open, clearColor, disabled, className, ...rest } = props;
  const colorTriggerPrefixCls = `${prefixCls}-trigger`;

  const containerRender = useMemo(
    () =>
      clearColor ? (
        <ColorClear prefixCls={prefixCls} />
      ) : (
        <ColorBlock color={color.toRgbString()} prefixCls={prefixCls} />
      ),
    [color, clearColor],
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
      {containerRender}
    </div>
  );
});
export default ColorTrigger;
