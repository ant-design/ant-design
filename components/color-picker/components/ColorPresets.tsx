import type { FC } from 'react';
import React, { useMemo, useState } from 'react';
import { ColorBlock, Color as RcColor } from '@rc-component/color-picker';
import { clsx } from 'clsx';

import { isString } from '../../_util/is';
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

interface ColorPresetItemsProps {
  prefixCls: string;
  label?: React.ReactNode;
  colors: AggregationColor[];
  value?: AggregationColor;
  emptyText: React.ReactNode;
  onChange?: (value: AggregationColor) => void;
}

const ColorPresetItems: FC<ColorPresetItemsProps> = ({
  prefixCls,
  label,
  colors,
  value,
  emptyText,
  onChange,
}) => {
  const [, token] = useToken();
  const colorPresetsPrefixCls = `${prefixCls}-presets`;

  const selectedIndex = colors.findIndex(
    (presetColor) => presetColor.toCssString() === value?.toCssString(),
  );
  // Roving tabindex: a single swatch is tabbable so that Tab moves between presets,
  // while Arrow keys move focus within the current preset.
  const [activeIndex, setActiveIndex] = useState(() => (selectedIndex >= 0 ? selectedIndex : 0));

  // Handler lives on each focusable option (roving tabindex), not the listbox container.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, index: number) => {
    const count = colors.length;
    let next = index;
    switch (e.key) {
      case 'ArrowRight':
        next = (index + 1) % count;
        break;
      case 'ArrowLeft':
        next = (index - 1 + count) % count;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onChange?.(colors[index]);
        return;
      default:
        return;
    }
    e.preventDefault();
    setActiveIndex(next);
    const listbox = e.currentTarget.closest(`[role="listbox"]`);
    const options = listbox?.querySelectorAll<HTMLElement>('[role="option"]');
    options?.[next]?.focus();
  };

  return (
    <div
      role="listbox"
      aria-label={isString(label) ? label : undefined}
      className={`${colorPresetsPrefixCls}-items`}
    >
      {colors.length > 0 ? (
        colors.map((presetColor, index) => {
          const isSelected = index === selectedIndex;
          return (
            <ColorBlock
              // eslint-disable-next-line react/no-array-index-key
              key={`preset-${index}-${presetColor.toHexString()}`}
              role="option"
              tabIndex={index === activeIndex ? 0 : -1}
              aria-label={presetColor.toHexString()}
              aria-selected={isSelected}
              color={presetColor.toCssString()}
              prefixCls={prefixCls}
              className={clsx(`${colorPresetsPrefixCls}-color`, {
                [`${colorPresetsPrefixCls}-color-checked`]: isSelected,
                [`${colorPresetsPrefixCls}-color-bright`]: isBright(
                  presetColor,
                  token.colorBgElevated,
                ),
              })}
              onClick={() => {
                setActiveIndex(index);
                onChange?.(presetColor);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          );
        })
      ) : (
        <span className={`${colorPresetsPrefixCls}-empty`}>{emptyText}</span>
      )}
    </div>
  );
};

const ColorPresets: FC<ColorPresetsProps> = ({ prefixCls, presets, value: color, onChange }) => {
  const [locale] = useLocale('ColorPicker');
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

  const items = presetsValue.map<NonNullable<CollapseProps['items']>[number]>((preset, index) => ({
    key: genCollapsePanelKey(preset, index),
    label: <div className={`${colorPresetsPrefixCls}-label`}>{preset?.label}</div>,
    children: (
      <ColorPresetItems
        prefixCls={prefixCls}
        label={preset?.label}
        colors={Array.isArray(preset?.colors) ? (preset.colors as AggregationColor[]) : []}
        value={color}
        emptyText={locale.presetEmpty}
        onChange={onChange}
      />
    ),
  }));

  return (
    <div className={colorPresetsPrefixCls}>
      <Collapse defaultActiveKey={activeKeys} ghost items={items} />
    </div>
  );
};

export default ColorPresets;
