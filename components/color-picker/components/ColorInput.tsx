import type { FC } from 'react';
import React, { useMemo } from 'react';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import Select from '../../select';
import type { AggregationColor } from '../color';
import type { ColorFormatType } from '../interface';
import { ColorFormat } from '../interface';
import ColorAlphaInput from './ColorAlphaInput';
import ColorHexInput from './ColorHexInput';
import ColorHsbInput from './ColorHsbInput';
import ColorRgbInput from './ColorRgbInput';

interface ColorInputProps {
  prefixCls: string;
  format?: ColorFormatType;
  onFormatChange?: (format: ColorFormatType) => void;
  disabledAlpha?: boolean;
  value?: AggregationColor;
  onChange?: (value: AggregationColor) => void;
}

const selectOptions = [ColorFormat.hex, ColorFormat.hsb, ColorFormat.rgb].map((format) => ({
  value: format,
  label: format.toLocaleUpperCase(),
}));

const ColorInput: FC<ColorInputProps> = (props) => {
  const { prefixCls, format, value, disabledAlpha, onFormatChange, onChange } = props;
  const [colorFormat, setColorFormat] = useMergedState(ColorFormat.hex, {
    value: format,
    onChange: onFormatChange,
  });

  const colorInputPrefixCls = `${prefixCls}-input`;

  const handleFormatChange = (newFormat: ColorFormatType) => {
    setColorFormat(newFormat);
  };

  const steppersNode = useMemo<React.ReactNode>(() => {
    const inputProps = { value, prefixCls, onChange };
    switch (colorFormat) {
      case ColorFormat.hsb:
        return <ColorHsbInput {...inputProps} />;
      case ColorFormat.rgb:
        return <ColorRgbInput {...inputProps} />;
      // case ColorFormat.hex:
      default:
        return <ColorHexInput {...inputProps} />;
    }
  }, [colorFormat, prefixCls, value, onChange]);

  return (
    <div className={`${colorInputPrefixCls}-container`}>
      <Select
        value={colorFormat}
        variant="borderless"
        getPopupContainer={(current) => current}
        popupMatchSelectWidth={68}
        placement="bottomRight"
        onChange={handleFormatChange}
        className={`${prefixCls}-format-select`}
        size="small"
        options={selectOptions}
      />
      <div className={colorInputPrefixCls}>{steppersNode}</div>
      {!disabledAlpha && (
        <ColorAlphaInput prefixCls={prefixCls} value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default ColorInput;
