import type { FC } from 'react';
import React from 'react';
import clsx from 'clsx';

import type { AggregationColor } from '../color';
import { generateColor } from '../util';

interface ColorClearProps {
  prefixCls: string;
  value?: AggregationColor;
  onChange?: (value: AggregationColor) => void;
  className?: string;
  style?: React.CSSProperties;
}

const ColorClear: FC<ColorClearProps> = ({ prefixCls, value, onChange, className, style }) => {
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
      role="button"
      aria-label="Clear color"
      tabIndex={0}
      className={clsx(`${prefixCls}-clear`, className)}
      style={style}
      onClick={onClick}
      onKeyDown={onKeyDown}
    />
  );
};

export default ColorClear;
