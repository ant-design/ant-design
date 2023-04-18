import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import Input from '../../input';
import type { ColorPickerBaseProps } from '../interface';

interface ColorHexInputProps extends Omit<ColorPickerBaseProps, 'color'> {
  value?: string;
  onChange?: (value: string) => void;
}

const toHex = (value: string) => value.replace(/[^\w/]/gi, '').slice(0, 8);
const hexReg = /(^#[\da-f]{6}$)|(^#[\da-f]{8}$)/i;

const ColorHexInput: FC<ColorHexInputProps> = ({ prefixCls, value = '', onChange }) => {
  const ColorHexInputPrefixCls = `${prefixCls}-hexinput`;
  const [hexValue, sethexValue] = useState(toHex(value));

  // Update step value
  useEffect(() => {
    if (hexReg.test(value)) {
      sethexValue(toHex(value));
    }
  }, [value]);

  return (
    <div className={ColorHexInputPrefixCls}>
      <div className={`${ColorHexInputPrefixCls}-input`}>
        <Input
          value={hexValue.toUpperCase()}
          prefix="#"
          onChange={(e) => {
            const hex = toHex(e.target.value);
            const hexString = `#${hex}`;
            sethexValue(hex);
            if (hexReg.test(hexString)) {
              onChange?.(hexString);
            }
          }}
        />
      </div>
    </div>
  );
};

export default ColorHexInput;
