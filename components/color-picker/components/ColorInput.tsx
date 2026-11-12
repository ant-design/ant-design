import type { FC } from 'react';
import React, { useMemo } from 'react';
import { useControlledState } from '@rc-component/util';

import Select from '../../select';
import type { DefaultOptionType } from '../../select';
import type { AggregationColor } from '../color';
import type { ColorFormatType } from '../interface';
import { FORMAT_HEX, FORMAT_HSB, FORMAT_RGB } from '../interface';
import ColorAlphaInput from './ColorAlphaInput';
import ColorHexInput from './ColorHexInput';
import ColorHsbInput from './ColorHsbInput';
import ColorRgbInput from './ColorRgbInput';

interface ColorInputProps {
  prefixCls: string;
  format?: ColorFormatType;
  onFormatChange?: (format: ColorFormatType) => void;
  disabled?: boolean;
  disabledAlpha?: boolean;
  value?: AggregationColor;
  onChange?: (value: AggregationColor) => void;
  disabledFormat?: boolean;
}

const selectOptions = [FORMAT_HEX, FORMAT_HSB, FORMAT_RGB].map<DefaultOptionType>((format) => ({
  value: format,
  label: format.toUpperCase(),
}));

const ColorInput: FC<ColorInputProps> = (props) => {
  const {
    prefixCls,
    format,
    value,
    disabled,
    disabledAlpha,
    onFormatChange,
    onChange,
    disabledFormat,
  } = props;
  const [colorFormat, setColorFormat] = useControlledState<ColorFormatType>(FORMAT_HEX, format);

  const colorInputPrefixCls = `${prefixCls}-input`;

  const triggerFormatChange = (newFormat: ColorFormatType) => {
    if (disabled) {
      return;
    }

    setColorFormat(newFormat);
    onFormatChange?.(newFormat);
  };

  const steppersNode = useMemo<React.ReactNode>(() => {
    const inputProps = { value, prefixCls, onChange, disabled };
    switch (colorFormat) {
      case FORMAT_HSB:
        return <ColorHsbInput {...inputProps} />;
      case FORMAT_RGB:
        return <ColorRgbInput {...inputProps} />;
      // case FORMAT_HEX:
      default:
        return <ColorHexInput {...inputProps} />;
    }
  }, [colorFormat, disabled, prefixCls, value, onChange]);

  return (
    <div className={`${colorInputPrefixCls}-container`}>
      {!disabledFormat && (
        <Select
          value={colorFormat}
          variant="borderless"
          getPopupContainer={(current) => current}
          popupMatchSelectWidth={68}
          placement="bottomRight"
          onChange={triggerFormatChange}
          className={`${prefixCls}-format-select`}
          disabled={disabled}
          size="small"
          options={selectOptions}
        />
      )}
      <div className={colorInputPrefixCls}>{steppersNode}</div>
      {!disabledAlpha && (
        <ColorAlphaInput
          prefixCls={prefixCls}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default ColorInput;
