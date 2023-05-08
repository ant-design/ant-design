import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import Input from '../../input';
import type { Color } from '../color';
import type { ColorPickerBaseProps } from '../interface';
import { generateColor, toHexFormat } from '../util';

interface ColorHexInputProps extends Pick<ColorPickerBaseProps, 'prefixCls'> {
  value?: Color;
  onChange?: (value: Color) => void;
}

const hexReg = /(^#[\da-f]{6}$)|(^#[\da-f]{8}$)/i;

const ColorHexInput: FC<ColorHexInputProps> = ({ prefixCls, value, onChange }) => {
  const colorHexInputPrefixCls = `${prefixCls}-hex-input`;
  const [hexValue, setHexValue] = useState(value?.toHex());

  // Update step value
  useEffect(() => {
    const hex = value?.toHex();
    if (hexReg.test(`#${hex}`) && value) {
      setHexValue(hex);
    }
  }, [value]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = toHexFormat(e.target.value);
    const hexString = `#${hex}`;
    setHexValue(hex);
    if (hexReg.test(hexString)) {
      onChange?.(generateColor(hex));
    }
  };

  return (
    <div className={colorHexInputPrefixCls}>
      <Input
        className={`${colorHexInputPrefixCls}-input`}
        value={hexValue?.toUpperCase()}
        prefix="#"
        onChange={handleHexChange}
      />
    </div>
  );
};

export default ColorHexInput;
