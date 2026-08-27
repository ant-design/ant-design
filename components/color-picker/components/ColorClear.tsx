import type { FC } from 'react';
import React from 'react';
import { clsx } from 'clsx';

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
  const canClear = !!onChange && !!value && !value.cleared;

  const onClick = () => {
    if (canClear) {
      const hsba = value.toHsb();
      hsba.a = 0;
      const genColor = generateColor(hsba);
      genColor.cleared = true;

      onChange(genColor);
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (canClear && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role={canClear ? 'button' : undefined}
      aria-label={canClear ? 'Clear color' : undefined}
      tabIndex={canClear ? 0 : undefined}
      className={clsx(`${prefixCls}-clear`, className)}
      style={style}
      onClick={onClick}
      onKeyDown={onKeyDown}
    />
  );
};

export default ColorClear;
