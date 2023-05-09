import classNames from 'classnames';
import type { CSSProperties, MouseEventHandler } from 'react';
import React, { forwardRef, useMemo } from 'react';
import type { ColorPickerBaseProps } from '../interface';
import ColorClear from './ColorClear';

interface colorTriggerProps
  extends Pick<ColorPickerBaseProps, 'color' | 'prefixCls' | 'clearColor' | 'disabled'> {
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
        <div className={`${colorTriggerPrefixCls}-container`}>
          <div
            className={`${colorTriggerPrefixCls}-layer`}
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
