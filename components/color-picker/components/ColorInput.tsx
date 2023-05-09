import type { FC } from 'react';
import React from 'react';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import Select from '../../select';
import type { ColorPickerBaseProps } from '../interface';
import { ColorFormat } from '../interface';
import type { Color } from '../color';
import ColorAlphaInput from './ColorAlphaInput';
import ColorHexInput from './ColorHexInput';
import ColorHsbInput from './ColorHsbInput';
import ColorRgbInput from './ColorRgbInput';

interface ColorInputProps
  extends Pick<ColorPickerBaseProps, 'prefixCls' | 'format' | 'onFormatChange'> {
  value?: Color;
  onChange?: (value: Color) => void;
}

const ColorInput: FC<ColorInputProps> = (props) => {
  const { prefixCls, format, onFormatChange, value, onChange } = props;
  const [colorFormat, setColorFormat] = useMergedState('hex', {
    value: format,
    onChange: onFormatChange,
  });

  const colorInputPrefixCls = `${prefixCls}-input`;

  const handleFormatChange = (newFormat: ColorFormat) => {
    setColorFormat(newFormat);
  };

  const steppersRender = () => {
    switch (colorFormat) {
      case ColorFormat.hsb:
        return <ColorHsbInput value={value} onChange={onChange} prefixCls={prefixCls} />;
      case ColorFormat.rgb:
        return <ColorRgbInput value={value} onChange={onChange} prefixCls={prefixCls} />;
      case ColorFormat.hex:
      default:
        return <ColorHexInput value={value} onChange={onChange} prefixCls={prefixCls} />;
    }
  };

  return (
    <div className={`${colorInputPrefixCls}-container`}>
      <Select
        value={colorFormat}
        bordered={false}
        getPopupContainer={(current) => current}
        popupMatchSelectWidth={68}
        placement="bottomRight"
        onChange={handleFormatChange}
        className={`${prefixCls}-format-select`}
        size="small"
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
      <div className={colorInputPrefixCls}>{steppersRender()}</div>
      <ColorAlphaInput prefixCls={prefixCls} value={value} onChange={onChange} />
    </div>
  );
};
export default ColorInput;
