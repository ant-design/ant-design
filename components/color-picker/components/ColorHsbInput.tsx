import type { HSB } from '@rc-component/color-picker';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import type { Color } from '../color';
import type { ColorPickerBaseProps } from '../interface';
import { generateColor, getRoundNumber } from '../util';
import ColorSteppers from './ColorSteppers';

interface ColorHsbInputProps extends Pick<ColorPickerBaseProps, 'prefixCls'> {
  value?: Color;
  onChange?: (value: Color) => void;
}

const ColorHsbInput: FC<ColorHsbInputProps> = ({ prefixCls, value, onChange }) => {
  const colorHsbInputPrefixCls = `${prefixCls}-hsb-input`;
  const [hsbValue, setHsbValue] = useState<Color>(generateColor(value || '#000'));

  // Update step value
  useEffect(() => {
    if (value) {
      setHsbValue(value);
    }
  }, [value]);

  const handleHsbChange = (step: number, type: keyof HSB) => {
    const hsb = hsbValue.toHsb();
    hsb[type] = type === 'h' ? step : (step || 0) / 100;
    const genColor = generateColor(hsb);
    if (!value) {
      setHsbValue(genColor);
    }
    onChange?.(genColor);
  };

  return (
    <div className={colorHsbInputPrefixCls}>
      <ColorSteppers
        max={360}
        min={0}
        value={Number(hsbValue.toHsb().h)}
        prefixCls={prefixCls}
        className={colorHsbInputPrefixCls}
        formatter={(step) => getRoundNumber(step || 0).toString()}
        onChange={(step) => handleHsbChange(Number(step), 'h')}
      />
      <ColorSteppers
        max={100}
        min={0}
        value={Number(hsbValue.toHsb().s) * 100}
        prefixCls={prefixCls}
        className={colorHsbInputPrefixCls}
        formatter={(step) => `${getRoundNumber(step || 0)}%`}
        onChange={(step) => handleHsbChange(Number(step), 's')}
      />
      <ColorSteppers
        max={100}
        min={0}
        value={Number(hsbValue.toHsb().b) * 100}
        prefixCls={prefixCls}
        className={colorHsbInputPrefixCls}
        formatter={(step) => `${getRoundNumber(step || 0)}%`}
        onChange={(step) => handleHsbChange(Number(step), 'b')}
      />
    </div>
  );
};

export default ColorHsbInput;
