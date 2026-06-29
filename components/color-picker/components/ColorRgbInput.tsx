import type { FC } from 'react';
import React, { useState } from 'react';
import type { RGB } from '@rc-component/color-picker';

import type { AggregationColor } from '../color';
import { generateColor } from '../util';
import ColorSteppers from './ColorSteppers';

interface ColorRgbInputProps {
  prefixCls: string;
  value?: AggregationColor;
  onChange?: (value: AggregationColor) => void;
}

const ColorRgbInput: FC<ColorRgbInputProps> = ({ prefixCls, value, onChange }) => {
  const colorRgbInputPrefixCls = `${prefixCls}-rgb-input`;
  const [internalValue, setInternalValue] = useState<AggregationColor>(() =>
    generateColor(value || '#000'),
  );

  const rgbValue = value || internalValue;

  const handleRgbChange = (step: number | null, type: keyof RGB) => {
    const rgb = rgbValue.toRgb();
    rgb[type] = step || 0;
    const genColor = generateColor(rgb);

    setInternalValue(genColor);

    onChange?.(genColor);
  };

  return (
    <div className={colorRgbInputPrefixCls}>
      <ColorSteppers
        max={255}
        min={0}
        value={Number(rgbValue.toRgb().r)}
        prefixCls={prefixCls}
        className={colorRgbInputPrefixCls}
        onChange={(step) => handleRgbChange(Number(step), 'r')}
      />
      <ColorSteppers
        max={255}
        min={0}
        value={Number(rgbValue.toRgb().g)}
        prefixCls={prefixCls}
        className={colorRgbInputPrefixCls}
        onChange={(step) => handleRgbChange(Number(step), 'g')}
      />
      <ColorSteppers
        max={255}
        min={0}
        value={Number(rgbValue.toRgb().b)}
        prefixCls={prefixCls}
        className={colorRgbInputPrefixCls}
        onChange={(step) => handleRgbChange(Number(step), 'b')}
      />
    </div>
  );
};

export default ColorRgbInput;
