import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import type { AggregationColor } from '../color';
import { generateColor, getColorAlpha } from '../util';
import ColorSteppers from './ColorSteppers';

interface ColorAlphaInputProps {
  prefixCls: string;
  value?: AggregationColor;
  onChange?: (value: AggregationColor) => void;
}

const ColorAlphaInput: FC<ColorAlphaInputProps> = ({ prefixCls, value, onChange }) => {
  const colorAlphaInputPrefixCls = `${prefixCls}-alpha-input`;
  const [alphaValue, setAlphaValue] = useState<AggregationColor>(generateColor(value || '#000'));

  // Update step value
  useEffect(() => {
    if (value) {
      setAlphaValue(value);
    }
  }, [value]);

  const handleAlphaChange = (step: number | null) => {
    const hsba = alphaValue.toHsb();
    hsba.a = (step || 0) / 100;
    const genColor = generateColor(hsba);
    if (!value) {
      setAlphaValue(genColor);
    }
    onChange?.(genColor);
  };

  return (
    <ColorSteppers
      value={getColorAlpha(alphaValue)}
      prefixCls={prefixCls}
      formatter={(step) => `${step}%`}
      className={colorAlphaInputPrefixCls}
      onChange={handleAlphaChange}
    />
  );
};

export default ColorAlphaInput;
