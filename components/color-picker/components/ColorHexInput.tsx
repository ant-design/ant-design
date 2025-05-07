import type { FC } from 'react';
import React, { useState } from 'react';

import Input from '../../input/Input';
import type { AggregationColor } from '../color';
import { toHexFormat } from '../color';
import { generateColor } from '../util';

interface ColorHexInputProps {
  prefixCls: string;
  value?: AggregationColor;
  onChange?: (value: AggregationColor) => void;
}

const hexReg = /(^#[\da-f]{6}$)|(^#[\da-f]{8}$)/i;
const isHexString = (hex?: string) => hexReg.test(`#${hex}`);

const ColorHexInput: FC<ColorHexInputProps> = ({ prefixCls, value, onChange }) => {
  const colorHexInputPrefixCls = `${prefixCls}-hex-input`;
  const [internalValue, setInternalValue] = useState('');

  const hexValue = value ? toHexFormat(value.toHexString()) : internalValue;

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const originValue = e.target.value;
    setInternalValue(toHexFormat(originValue));

    if (isHexString(toHexFormat(originValue, true))) {
      onChange?.(generateColor(originValue));
    }
  };

  return (
    <Input
      className={colorHexInputPrefixCls}
      value={hexValue}
      prefix="#"
      onChange={handleHexChange}
      size="small"
    />
  );
};

export default ColorHexInput;
