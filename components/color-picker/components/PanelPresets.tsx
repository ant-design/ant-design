import type { FC } from 'react';
import React, { useContext } from 'react';
import type { Color } from '../color';
import { PanelPresetsContext } from '../context';
import type { ColorPickerBaseProps } from '../interface';
import ColorPresets from './ColorPresets';

export interface PanelPresetsProps extends Pick<ColorPickerBaseProps, 'prefixCls' | 'presets'> {
  value?: Color;
  onChange?: (value: Color) => void;
}

const PanelPresets: FC = () => {
  const { prefixCls, value, presets, onChange } = useContext(PanelPresetsContext);
  return Array.isArray(presets) ? (
    <ColorPresets value={value} presets={presets} prefixCls={prefixCls} onChange={onChange} />
  ) : null;
};

export default PanelPresets;
