import type { FC } from 'react';
import React, { useContext } from 'react';
import type { Color } from '../color';
import { PanelPickerContext } from '../context';
import type { ColorPickerBaseProps } from '../interface';
import ColorClear from './ColorClear';
import ColorInput from './ColorInput';

export interface PanelPickerProps
  extends Pick<ColorPickerBaseProps, 'prefixCls' | 'colorCleared' | 'allowClear'> {
  value?: Color;
  panel?: React.ReactNode;
  onChange?: (value: Color) => void;
  onClear?: () => void;
}

const PanelPicker: FC = () => {
  const { prefixCls, colorCleared, allowClear, value, panel, onChange, onClear, ...injectProps } =
    useContext(PanelPickerContext);
  return (
    <>
      {allowClear && (
        <ColorClear
          prefixCls={prefixCls}
          value={value}
          colorCleared={colorCleared}
          onChange={(clearColor) => {
            onChange?.(clearColor);
            onClear?.();
          }}
          {...injectProps}
        />
      )}
      {panel}
      <ColorInput value={value} onChange={onChange} prefixCls={prefixCls} {...injectProps} />
    </>
  );
};
export default PanelPicker;
