import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import Input from '../../input';
import type { Color } from '../color';
import { toHexFormat } from '../color';
import type { ColorPickerBaseProps } from '../interface';
import { generateColor } from '../util';

interface ColorHexInputProps extends Pick<ColorPickerBaseProps, 'prefixCls'> {
  value?: Color;
  onChange?: (value: Color) => void;
}

const hexReg = /(^#[\da-f]{6}$)|(^#[\da-f]{8}$)/i;
const isHexString = (hex?: string) => hexReg.test(`#${hex}`);

const ColorHexInput: FC<ColorHexInputProps> = ({ prefixCls, value, onChange }) => {
  const colorHexInputPrefixCls = `${prefixCls}-hex-input`;
  const [hexValue, setHexValue] = useState(value?.toHex());

  // Update step value
  useEffect(() => {
    const hex = value?.toHex();
    if (isHexString(hex) && value) {
      setHexValue(toHexFormat(hex));
    }
  }, [value]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const originValue = e.target.value;
    setHexValue(toHexFormat(originValue));
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
