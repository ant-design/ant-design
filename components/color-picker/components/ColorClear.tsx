import classNames from 'classnames';
import type { FC } from 'react';
import React from 'react';
import type { Color } from '../color';
import type { ColorPickerBaseProps } from '../interface';
import { generateColor } from '../util';

interface ColorClearProps extends Pick<ColorPickerBaseProps, 'prefixCls' | 'direction'> {
  value?: Color;
  onChange?: (value: Color) => void;
}

const ColorClear: FC<ColorClearProps> = ({ prefixCls, value, onChange, direction }) => {
  const handleClick = () => {
    if (value) {
      const hsba = value.toHsb();
      hsba.a = 0;
      const genColor = generateColor(hsba);
      onChange?.(genColor);
    }
  };

  return (
    <div
      className={classNames(`${prefixCls}-clear`, {
        [`${prefixCls}-clear-rtl`]: direction === 'rtl',
      })}
      onClick={handleClick}
    />
  );
};
export default ColorClear;
