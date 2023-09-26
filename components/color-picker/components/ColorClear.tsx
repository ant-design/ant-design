import type { FC } from 'react';
import React from 'react';
import type { Color } from '../color';
import type { ColorPickerBaseProps } from '../interface';
import { generateColor } from '../util';

interface ColorClearProps extends Pick<ColorPickerBaseProps, 'prefixCls' | 'colorCleared'> {
  value?: Color;
  onChange?: (value: Color) => void;
}

const ColorClear: FC<ColorClearProps> = ({ prefixCls, value, colorCleared, onChange }) => {
  const handleClick = () => {
    if (value && !colorCleared) {
      const hsba = value.toHsb();
      hsba.a = 0;
      const genColor = generateColor(hsba);
      onChange?.(genColor);
    }
  };
  return <div className={`${prefixCls}-clear`} onClick={handleClick} />;
};

export default ColorClear;
