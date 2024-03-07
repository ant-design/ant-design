import type { FC } from 'react';
import React from 'react';
import type { Color } from '../color';
import type { ColorPickerBaseProps } from '../interface';
import { generateColor, isColorCleared } from '../util';

interface ColorClearProps extends Pick<ColorPickerBaseProps, 'prefixCls'> {
  value?: Color;
  onChange?: (value: Color) => void;
}

const ColorClear: FC<ColorClearProps> = ({ prefixCls, value, onChange }) => {
  const handleClick = () => {
    if (value && !isColorCleared(value)) {
      onChange?.(
        generateColor({
          r: 0,
          g: 0,
          b: 0,
          a: 0,
        }),
      );
    }
  };
  return <div className={`${prefixCls}-clear`} onClick={handleClick} />;
};

export default ColorClear;
