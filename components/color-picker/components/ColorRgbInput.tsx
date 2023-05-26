import type { RGB } from '@rc-component/color-picker';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import type { Color } from '../color';
import type { ColorPickerBaseProps } from '../interface';
import { generateColor } from '../util';
import ColorSteppers from './ColorSteppers';

interface ColorRgbInputProps extends Pick<ColorPickerBaseProps, 'prefixCls'> {
  value?: Color;
  onChange?: (value: Color) => void;
}

const ColorRgbInput: FC<ColorRgbInputProps> = ({ prefixCls, value, onChange }) => {
  const colorRgbInputPrefixCls = `${prefixCls}-rgb-input`;
  const [rgbValue, setRgbValue] = useState<Color>(generateColor(value || '#000'));

  // Update step value
  useEffect(() => {
    if (value) {
      setRgbValue(value);
    }
  }, [value]);

  const handleRgbChange = (step: number | null, type: keyof RGB) => {
    const rgb = rgbValue.toRgb();
    rgb[type] = step || 0;
    const genColor = generateColor(rgb);
    if (!value) {
      setRgbValue(genColor);
    }
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
