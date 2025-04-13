import type { FC } from 'react';
import React, { useMemo } from 'react';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

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
  const { prefixCls, format, value, disabledAlpha, onFormatChange, onChange, disabledFormat } =
    props;
  const [colorFormat, setColorFormat] = useMergedState(FORMAT_HEX, {
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
      case FORMAT_HSB:
        return <ColorHsbInput {...inputProps} />;
      case FORMAT_RGB:
        return <ColorRgbInput {...inputProps} />;
      // case FORMAT_HEX:
      default:
        return <ColorHexInput {...inputProps} />;
    }
  }, [colorFormat, prefixCls, value, onChange]);

  return (
    <div className={`${colorInputPrefixCls}-container`}>
      {!disabledFormat && (
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
      )}
      <div className={colorInputPrefixCls}>{steppersNode}</div>
      {!disabledAlpha && (
        <ColorAlphaInput prefixCls={prefixCls} value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default ColorInput;
