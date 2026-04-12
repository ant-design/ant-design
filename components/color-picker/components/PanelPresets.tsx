import type { FC } from 'react';
import React, { useContext } from 'react';

import { PanelPresetsContext } from '../context';
import ColorPresets from './ColorPresets';

const PanelPresets: FC = () => {
  const { prefixCls, value, presets, onChange, disabled } = useContext(PanelPresetsContext);
  return Array.isArray(presets) ? (
    <ColorPresets
      value={value}
      presets={presets}
      prefixCls={prefixCls}
      onChange={onChange}
      disabled={disabled}
    />
  ) : null;
};

export default PanelPresets;
