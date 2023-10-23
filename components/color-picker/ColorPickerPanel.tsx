import type { HsbaColorType } from '@rc-component/color-picker';
import type { FC } from 'react';
import React from 'react';
import Divider from '../divider';
import type { Color } from './color';
import PanelPicker from './components/PanelPicker';
import PanelPresets from './components/PanelPresets';
import { PanelPickerProvider, PanelPresetsProvider } from './context';
import type { ColorPickerBaseProps } from './interface';

interface ColorPickerPanelProps extends ColorPickerBaseProps {
  onChange?: (value?: Color, type?: HsbaColorType, pickColor?: boolean) => void;
  onClear?: () => void;
}

const ColorPickerPanel: FC<ColorPickerPanelProps> = (props) => {
  const { prefixCls, presets, panelRender, color, onChange, onClear, ...injectProps } = props;
  const colorPickerPanelPrefixCls = `${prefixCls}-inner-content`;

  // ==== Inject props ===
  const panelPickerProps = {
    prefixCls,
    value: color,
    onChange,
    onClear,
    ...injectProps,
  };

  const panelPresetsProps = React.useMemo(
    () => ({
      prefixCls,
      value: color,
      presets,
      onChange,
    }),
    [prefixCls, color, presets, onChange],
  );

  // ====================== Render ======================
  const innerPanel = (
    <>
      <PanelPicker />
      {Array.isArray(presets) && <Divider className={`${colorPickerPanelPrefixCls}-divider`} />}
      <PanelPresets />
    </>
  );

  return (
    <PanelPickerProvider value={panelPickerProps}>
      <PanelPresetsProvider value={panelPresetsProps}>
        <div className={colorPickerPanelPrefixCls}>
          {typeof panelRender === 'function'
            ? panelRender(innerPanel, {
                components: {
                  Picker: PanelPicker,
                  Presets: PanelPresets,
                },
              })
            : innerPanel}
        </div>
      </PanelPresetsProvider>
    </PanelPickerProvider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  ColorPickerPanel.displayName = 'ColorPickerPanel';
}

export default ColorPickerPanel;
