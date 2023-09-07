import type { HsbaColorType } from '@rc-component/color-picker';
import RcColorPicker from '@rc-component/color-picker';
import type { FC } from 'react';
import React, { useContext } from 'react';
import type { Color } from '../color';
import { PanelPickerContext } from '../context';
import type { ColorPickerBaseProps } from '../interface';
import ColorClear from './ColorClear';
import ColorInput from './ColorInput';

export interface PanelPickerProps
  extends Pick<
    ColorPickerBaseProps,
    'prefixCls' | 'colorCleared' | 'allowClear' | 'disabledAlpha' | 'onChangeComplete'
  > {
  value?: Color;
  onChange?: (value?: Color, type?: HsbaColorType, pickColor?: boolean) => void;
  onClear?: () => void;
}

const PanelPicker: FC = () => {
  const {
    prefixCls,
    colorCleared,
    allowClear,
    value,
    disabledAlpha,
    onChange,
    onClear,
    onChangeComplete,
    ...injectProps
  } = useContext(PanelPickerContext);
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
      <RcColorPicker
        prefixCls={prefixCls}
        value={value?.toHsb()}
        disabledAlpha={disabledAlpha}
        onChange={(colorValue, type) => onChange?.(colorValue, type, true)}
        onChangeComplete={onChangeComplete}
      />
      <ColorInput
        value={value}
        onChange={onChange}
        prefixCls={prefixCls}
        disabledAlpha={disabledAlpha}
        {...injectProps}
      />
    </>
  );
};
export default PanelPicker;
