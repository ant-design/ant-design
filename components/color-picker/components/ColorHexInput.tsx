import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import Input from '../../input';
import type { Color } from '../color';
import type { ColorPickerBaseProps } from '../interface';
import { generateColor } from '../util';

interface ColorHexInputProps extends Pick<ColorPickerBaseProps, 'prefixCls'> {
  value?: Color;
  onChange?: (value: Color) => void;
}

const toHex = (value: string) => value.replace(/[^\w/]/gi, '').slice(0, 8);
const hexReg = /(^#[\da-f]{6}$)|(^#[\da-f]{8}$)/i;

const ColorHexInput: FC<ColorHexInputProps> = ({ prefixCls, value, onChange }) => {
  const ColorHexInputPrefixCls = `${prefixCls}-hex-input`;
  const [hexValue, setHexValue] = useState(toHex(value?.toHexString() || ''));

  // Update step value
  useEffect(() => {
    const hex = toHex(value?.toHexString() || '');
    if (hexReg.test(`#${hex}`) && value) {
      setHexValue(hex);
    }
  }, [value]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = toHex(e.target.value);
    const hexString = `#${hex}`;
    setHexValue(hex);
    if (hexReg.test(hexString)) {
      if (value) {
        onChange?.(generateColor(hex));
      }
    }
  };

  return (
    <div className={ColorHexInputPrefixCls}>
      <Input
        className={`${ColorHexInputPrefixCls}-input`}
        value={hexValue.toUpperCase()}
        prefix="#"
        onChange={handleHexChange}
      />
    </div>
  );
};

export default ColorHexInput;
