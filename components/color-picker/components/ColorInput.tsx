import type { FC } from 'react';
import React, { useState } from 'react';
import Select from '../../select';
import type { ColorPickerBaseProps } from '../interface';
import { ColorFormat } from '../interface';

import type { Color } from '../color';
import ColorAlphaInput from './ColorAlphaInput';
import ColorHexInput from './ColorHexInput';
import ColorHsbInput from './ColorHsbInput';
import ColorRgbInput from './ColorRgbInput';

interface ColorInputProps extends ColorPickerBaseProps {
  value?: Color;
  onChange?: (value: Color) => void;
}

const ColorInput: FC<ColorInputProps> = (props) => {
  const { value, prefixCls, format = 'hex', onFormatChange, onChange } = props;
  const [colorFormat, setColorFormat] = useState(ColorFormat[format]);

  const colorInputPrefixCls = `${prefixCls}-color-input`;

  const handleFormatChange = (value: ColorFormat) => {
    setColorFormat(value);
    onFormatChange?.(value);
  };

  const steppersRender = () => {
    /* eslint-disable default-case */
    switch (colorFormat) {
      case ColorFormat.hex:
        return <ColorHexInput value={value} onChange={onChange} prefixCls={prefixCls} />;
      case ColorFormat.hsb:
        return <ColorHsbInput value={value} onChange={onChange} prefixCls={prefixCls} />;
      case ColorFormat.rgb:
        return <ColorRgbInput value={value} onChange={onChange} prefixCls={prefixCls} />;
    }
  };

  return (
    <div className={colorInputPrefixCls}>
      <div className={`${colorInputPrefixCls}-container`}>
        <div className={`${colorInputPrefixCls}-select`}>
          <Select
            value={colorFormat}
            bordered={false}
            getPopupContainer={(currentEle: any) => currentEle}
            popupMatchSelectWidth={68}
            placement="bottomRight"
            onChange={handleFormatChange}
            options={[
              {
                label: ColorFormat.hex.toLocaleUpperCase(),
                value: ColorFormat.hex,
              },
              {
                label: ColorFormat.hsb.toLocaleUpperCase(),
                value: ColorFormat.hsb,
              },
              {
                label: ColorFormat.rgb.toLocaleUpperCase(),
                value: ColorFormat.rgb,
              },
            ]}
          />
        </div>
        <div className={`${colorInputPrefixCls}-picker`}>
          {steppersRender()}
          <ColorAlphaInput value={value} onChange={onChange} prefixCls={prefixCls} />
        </div>
      </div>
    </div>
  );
};
export default ColorInput;
