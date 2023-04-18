import type { FC } from 'react';
import React from 'react';
import type { ColorPickerBaseProps } from '../interface';
import { generateColor } from '../util';

interface ColorClearProps extends ColorPickerBaseProps {}

const ColorClear: FC<ColorClearProps> = ({ prefixCls, color, updateColor, updateClearColor }) => {
  const handleClick = () => {
    const hsba = color.toHsb();
    hsba.a = 0;
    updateColor?.(generateColor(hsba));
    updateClearColor?.(true);
  };

  return <div className={`${prefixCls}-clear`} onClick={handleClick} />;
};
export default ColorClear;
