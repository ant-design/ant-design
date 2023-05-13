import { ColorBlock } from '@rc-component/color-picker';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import Collapse from '../../collapse';
import { useLocale } from '../../locale';
import type { Color } from '../color';
import type { ColorPickerBaseProps, PresetsItem } from '../interface';
import { generateColor } from '../util';

const { Panel } = Collapse;

interface ColorPresetsProps extends Pick<ColorPickerBaseProps, 'prefixCls'> {
  presets: PresetsItem[];
  value?: Color;
  onChange?: (value: Color) => void;
}

const genPresetColor = (list: PresetsItem[]) =>
  list.map((value) => {
    value.colors = value.colors.map(generateColor);
    return value;
  });

const isBright = (value: Color) => {
  const { r, g, b, a } = value.toRgb();
  if (a <= 0.5) {
    return true;
  }
  return r * 0.299 + g * 0.587 + b * 0.114 > 192;
};

const ColorPresets: FC<ColorPresetsProps> = ({ prefixCls, presets, value: color, onChange }) => {
  const [locale] = useLocale('ColorPicker');
  const [presetsValue] = useMergedState(genPresetColor(presets), {
    value: genPresetColor(presets),
    postState: genPresetColor,
  });
  const colorPresetsPrefixCls = `${prefixCls}-presets`;

  const activeKeys = useMemo<string[]>(
    () => presetsValue.map((preset) => `panel-${preset.label}`),
    [presetsValue],
  );

  const handleClick = (colorValue: Color) => {
    onChange?.(colorValue);
  };

  return (
    <div className={colorPresetsPrefixCls}>
      <Collapse defaultActiveKey={activeKeys} ghost>
        {presetsValue.map((preset) => (
          <Panel
            header={<div className={`${colorPresetsPrefixCls}-label`}>{preset?.label}</div>}
            key={`panel-${preset?.label}`}
          >
            <div className={`${colorPresetsPrefixCls}-items`}>
              {Array.isArray(preset?.colors) && preset.colors?.length > 0 ? (
                preset.colors.map((presetColor: Color) => (
                  <ColorBlock
                    key={`preset-${presetColor.toHexString()}`}
                    color={generateColor(presetColor).toRgbString()}
                    prefixCls={prefixCls}
                    className={classNames(`${colorPresetsPrefixCls}-color`, {
                      [`${colorPresetsPrefixCls}-color-checked`]:
                        presetColor.toHexString() === color?.toHexString(),
                      [`${colorPresetsPrefixCls}-color-bright`]: isBright(presetColor),
                    })}
                    onClick={() => handleClick(presetColor)}
                  />
                ))
              ) : (
                <span className={`${colorPresetsPrefixCls}-empty`}>{locale.presetEmpty}</span>
              )}
            </div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default ColorPresets;
