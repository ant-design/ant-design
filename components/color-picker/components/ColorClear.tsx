import type { FC } from 'react';
import React from 'react';
import clsx from 'clsx';

import type { AggregationColor } from '../color';
import { generateColor } from '../util';

interface ColorClearProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'onChange'> {
  prefixCls: string;
  value?: AggregationColor;
  onChange?: (value: AggregationColor) => void;
}

const ColorClear: FC<ColorClearProps> = ({ prefixCls, value, onChange, className, ...props }) => {
  const onClick = () => {
    if (onChange && value && !value.cleared) {
      const hsba = value.toHsb();
      hsba.a = 0;
      const genColor = generateColor(hsba);
      genColor.cleared = true;

      onChange(genColor);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      {...props}
      className={clsx(`${prefixCls}-clear`, className)}
      onClick={onClick}
      onKeyDown={onKeyDown}
    />
  );
};

export default ColorClear;
