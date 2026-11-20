import type { FC } from 'react';
import React, { useMemo } from 'react';
import { ColorBlock } from '@rc-component/color-picker';
import { clsx } from 'clsx';

import type { CollapseProps } from '../../collapse';
import Collapse from '../../collapse';
import { useLocale } from '../../locale';
import { useToken } from '../../theme/internal';
import type { AggregationColor } from '../color';
import type { PresetsItem } from '../interface';
import { generateColor, isBright } from '../util';

interface ColorPresetsProps {
  prefixCls: string;
  presets: PresetsItem[];
  value?: AggregationColor;
  onChange?: (value: AggregationColor) => void;
}

const genPresetColor = (list: PresetsItem[]) =>
  list.map((value) => ({
    ...value,
    colors: value.colors.map(generateColor),
  }));

const genCollapsePanelKey = (preset: PresetsItem, index: number) => {
  const mergedKey = preset.key ?? index;
  return `panel-${mergedKey}`;
};

const ColorPresets: FC<ColorPresetsProps> = ({ prefixCls, presets, value: color, onChange }) => {
  const [locale] = useLocale('ColorPicker');
  const [, token] = useToken();
  const presetsValue = useMemo(() => genPresetColor(presets), [presets]);
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
          (preset.colors as AggregationColor[]).map((presetColor, index) => {
            const colorInst = generateColor(presetColor);

            return (
              <ColorBlock
                // eslint-disable-next-line react/no-array-index-key
                key={`preset-${index}-${presetColor.toHexString()}`}
                color={colorInst.toCssString()}
                prefixCls={prefixCls}
                className={clsx(`${colorPresetsPrefixCls}-color`, {
                  [`${colorPresetsPrefixCls}-color-checked`]:
                    presetColor.toCssString() === color?.toCssString(),
                  [`${colorPresetsPrefixCls}-color-bright`]: isBright(
                    presetColor,
                    token.colorBgElevated,
                  ),
                })}
                onClick={() => handleClick(presetColor)}
              />
            );
          })
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
