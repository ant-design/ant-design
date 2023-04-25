import type { FC } from 'react';
import React, { useState } from 'react';
import Select from '../../select';
import { ColorFormatEnum } from '../enum';
import type { ColorPickerBaseProps } from '../interface';

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
          >
            <Select.Option value={ColorFormatEnum.hex}>
              {ColorFormatEnum.hex.toLocaleUpperCase()}
            </Select.Option>
            <Select.Option value={ColorFormatEnum.hsb}>
              {ColorFormatEnum.hsb.toLocaleUpperCase()}
            </Select.Option>
            <Select.Option value={ColorFormatEnum.rgb}>
              {ColorFormatEnum.rgb.toLocaleUpperCase()}
            </Select.Option>
          </Select>
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
