import type { FC } from 'react';
import React, { useState } from 'react';

import type { AggregationColor } from '../color';
import { generateColor, getColorAlpha } from '../util';
import ColorSteppers from './ColorSteppers';

interface ColorAlphaInputProps {
  prefixCls: string;
  value?: AggregationColor;
  onChange?: (value: AggregationColor) => void;
  disabled?: boolean;
}

const ColorAlphaInput: FC<ColorAlphaInputProps> = ({ prefixCls, value, onChange, disabled }) => {
  const colorAlphaInputPrefixCls = `${prefixCls}-alpha-input`;
  const [internalValue, setInternalValue] = useState<AggregationColor>(() =>
    generateColor(value || '#000'),
  );

  const alphaValue = value || internalValue;

  const handleAlphaChange = (step: number | null) => {
    if (disabled) {
      return;
    }

    const hsba = alphaValue.toHsb();
    hsba.a = (step || 0) / 100;
    const genColor = generateColor(hsba);

    setInternalValue(genColor);

    onChange?.(genColor);
  };

  return (
    <ColorSteppers
      value={getColorAlpha(alphaValue)}
      prefixCls={prefixCls}
      formatter={(step) => `${step}%`}
      className={colorAlphaInputPrefixCls}
      disabled={disabled}
      onChange={handleAlphaChange}
    />
  );
};

export default ColorAlphaInput;
