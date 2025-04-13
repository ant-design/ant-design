import type { FC } from 'react';
import React, { useMemo } from 'react';
import { ColorBlock, Color as RcColor } from '@rc-component/color-picker';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import type { CollapseProps } from '../../collapse';
import Collapse from '../../collapse';
import { useLocale } from '../../locale';
import { useToken } from '../../theme/internal';
import type { AggregationColor } from '../color';
import type { PresetsItem } from '../interface';
import { generateColor } from '../util';

interface ColorPresetsProps {
  prefixCls: string;
  presets: PresetsItem[];
  value?: AggregationColor;
  onChange?: (value: AggregationColor) => void;
}

const genPresetColor = (list: PresetsItem[]) =>
  list.map((value) => {
    value.colors = value.colors.map(generateColor);
    return value;
  });

export const isBright = (value: AggregationColor, bgColorToken: string) => {
  const { r, g, b, a } = value.toRgb();
  const hsv = new RcColor(value.toRgbString()).onBackground(bgColorToken).toHsv();
  if (a <= 0.5) {
    // Adapted to dark mode
    return hsv.v > 0.5;
  }
  return r * 0.299 + g * 0.587 + b * 0.114 > 192;
};

const genCollapsePanelKey = (preset: PresetsItem, index: number) => {
  const mergedKey = preset.key ?? index;
  return `panel-${mergedKey}`;
};

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
      presetsValue.reduce<string[]>((acc, preset, index) => {
        const { defaultOpen = true } = preset;
        if (defaultOpen) {
          acc.push(genCollapsePanelKey(preset, index));
        }
        return acc;
      }, []),
    [presetsValue],
  );

  const handleClick = (colorValue: AggregationColor) => {
    onChange?.(colorValue);
  };

  const items = presetsValue.map<NonNullable<CollapseProps['items']>[number]>((preset, index) => ({
    key: genCollapsePanelKey(preset, index),
    label: <div className={`${colorPresetsPrefixCls}-label`}>{preset?.label}</div>,
    children: (
      <div className={`${colorPresetsPrefixCls}-items`}>
        {Array.isArray(preset?.colors) && preset.colors?.length > 0 ? (
          (preset.colors as AggregationColor[]).map((presetColor, index) => (
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
