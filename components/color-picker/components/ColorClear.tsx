import type { FC } from 'react';
import React from 'react';

import type { AggregationColor } from '../color';
import { generateColor } from '../util';

interface ColorClearProps {
  prefixCls: string;
  value?: AggregationColor;
  onChange?: (value: AggregationColor) => void;
}

const ColorClear: FC<ColorClearProps> = ({ prefixCls, value, onChange }) => {
  const handleClick = () => {
    if (onChange && value && !value.cleared) {
      const hsba = value.toHsb();
      hsba.a = 0;
      const genColor = generateColor(hsba);
      genColor.cleared = true;

      onChange(genColor);
    }
  };
  return <div className={`${prefixCls}-clear`} onClick={handleClick} />;
};

export default ColorClear;
