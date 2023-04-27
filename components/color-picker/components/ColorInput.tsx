import type { FC } from 'react';
import React, { useState } from 'react';
import Select from '../../select';
import type { ColorPickerBaseProps } from '../interface';
import { ColorFormatEnum } from '../interface';

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
  const { prefixCls, format = 'hex', onFormatChange } = props;
  const [colorFormat, setColorFormat] = useState(ColorFormatEnum[format]);

  const ColorInputPrefixCls = `${prefixCls}-color-input`;

  const handleFormatChange = (value: ColorFormatEnum) => {
    setColorFormat(value);
    onFormatChange?.(value);
  };

  const steppersRender = () => {
    switch (colorFormat) {
      case ColorFormatEnum.hex:
        return <ColorHexInput {...props} />;
      case ColorFormatEnum.hsb:
        return <ColorHsbInput {...props} />;
      case ColorFormatEnum.rgb:
        return <ColorRgbInput {...props} />;
      default:
        return <ColorHsbInput {...props} />;
    }
  };

  return (
    <div className={ColorInputPrefixCls}>
      <div className={`${ColorInputPrefixCls}-container`}>
        <div className={`${ColorInputPrefixCls}-select`}>
          <Select
            value={colorFormat}
            bordered={false}
            getPopupContainer={(currentEle: any) => currentEle}
            popupMatchSelectWidth={68}
            placement="bottomRight"
            onChange={handleFormatChange}
            options={[
              {
                label: ColorFormatEnum.hex.toLocaleUpperCase(),
                value: ColorFormatEnum.hex,
              },
              {
                label: ColorFormatEnum.hsb.toLocaleUpperCase(),
                value: ColorFormatEnum.hsb,
              },
              {
                label: ColorFormatEnum.rgb.toLocaleUpperCase(),
                value: ColorFormatEnum.rgb,
              },
            ]}
          />
        </div>
        <div className={`${ColorInputPrefixCls}-picker`}>
          {steppersRender()}
          <ColorAlphaInput {...props} />
        </div>
      </div>
    </div>
  );
};
export default ColorInput;
