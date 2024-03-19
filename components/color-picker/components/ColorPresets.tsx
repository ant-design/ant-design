import type { FC } from 'react';
import React, { useMemo } from 'react';
import { ColorBlock, Color as RcColor } from '@rc-component/color-picker';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import type { CollapseProps } from '../../collapse';
import Collapse from '../../collapse';
import { useLocale } from '../../locale';
import { useToken } from '../../theme/internal';
import type { Color } from '../color';
import type { ColorPickerBaseProps, PresetsItem } from '../interface';
import { generateColor } from '../util';

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

const isBright = (value: Color, bgColorToken: string) => {
  const { r, g, b, a } = value.toRgb();
  const hsv = new RcColor(value.toRgbString()).onBackground(bgColorToken).toHsv();
  if (a <= 0.5) {
    // Adapted to dark mode
    return hsv.v > 0.5;
  }
  return r * 0.299 + g * 0.587 + b * 0.114 > 192;
};

const genCollapsePanelKey = ({ label }: PresetsItem) => `panel-${label}`;

const ColorPresets: FC<ColorPresetsProps> = ({ prefixCls, presets, value: color, onChange }) => {
  const [locale] = useLocale('ColorPicker');
  const [, token] = useToken();
  const [presetsValue] = useMergedState(genPresetColor(presets), {
    value: genPresetColor(presets),
    postState: genPresetColor,
  });
  const colorPresetsPrefixCls = `${prefixCls}-presets`;

  const activeKeys = useMemo(
    () =>
      presetsValue.reduce<string[]>((acc, preset) => {
        const { defaultOpen = true } = preset;
        if (defaultOpen) acc.push(genCollapsePanelKey(preset));
        return acc;
      }, []),
    [presetsValue],
  );

  const handleClick = (colorValue: Color) => {
    onChange?.(colorValue);
  };

  const items: CollapseProps['items'] = presetsValue.map((preset) => ({
    key: genCollapsePanelKey(preset),
    label: <div className={`${colorPresetsPrefixCls}-label`}>{preset?.label}</div>,
    children: (
      <div className={`${colorPresetsPrefixCls}-items`}>
        {Array.isArray(preset?.colors) && preset.colors?.length > 0 ? (
          preset.colors.map((presetColor: Color, index: number) => (
            <ColorBlock
              // eslint-disable-next-line react/no-array-index-key
              key={`preset-${index}-${presetColor.toHexString()}`}
              color={generateColor(presetColor).toRgbString()}
              prefixCls={prefixCls}
              className={classNames(`${colorPresetsPrefixCls}-color`, {
                [`${colorPresetsPrefixCls}-color-checked`]:
                  presetColor.toHexString() === color?.toHexString(),
                [`${colorPresetsPrefixCls}-color-bright`]: isBright(
                  presetColor,
                  token.colorBgElevated,
                ),
              })}
              onClick={() => handleClick(presetColor)}
            />
          ))
        ) : (
          <span className={`${colorPresetsPrefixCls}-empty`}>{locale.presetEmpty}</span>
        )}
      </div>
    ),
  }));

  return (
    <div className={colorPresetsPrefixCls}>
      <Collapse defaultActiveKey={activeKeys} ghost items={items} />
    </div>
  );
};

export default ColorPresets;
