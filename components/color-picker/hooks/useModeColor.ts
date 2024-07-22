import * as React from 'react';
import { useMergedState } from 'rc-util';

import type { AggregationColor } from '../color';
import type { ColorPickerProps, ColorValueType, ModeType } from '../interface';
import { generateColor } from '../util';

export type ModeOptions = {
  label: React.ReactNode;
  value: ModeType;
}[];

/**
 * Combine the `color` and `mode` to make sure sync of state.
 */
export default function useModeColor(
  defaultValue?: ColorValueType,
  value?: ColorValueType,
  mode?: ColorPickerProps['mode'],
): [
  color: AggregationColor,
  setColor: (color: AggregationColor) => void,
  mode: ModeType,
  setMode: (mode: ModeType) => void,
  modeOptionList: ModeOptions,
] {
  // ======================== Base ========================
  // Color
  const [mergedColor, setMergedColor] = useMergedState(defaultValue, { value });

  // Mode
  const [modeState, setModeState] = React.useState<ModeType>('single');

  const [modeOptionList, modeSet] = React.useMemo(() => {
    const list = (Array.isArray(mode) ? mode : [mode]).filter((m) => m);
    if (!list.length) {
      list.push('single');
    }

    const modes = new Set(list);
    const optionList: ModeOptions = [];

    const pushOption = (modeType: ModeType) => {
      if (modes.has(modeType)) {
        optionList.push({
          label: modeType,
          value: modeType,
        });
      }
    };

    pushOption('single');
    pushOption('gradient');

    return [optionList, modes];
  }, [mode]);

  // ======================== Post ========================
  // We need align `mode` with `color` state

  // Color
  const postColor = React.useMemo(() => generateColor(mergedColor || ''), [mergedColor]);

  // Mode
  const postMode = React.useMemo(() => {
    if (modeSet.has(modeState)) {
      return modeState;
    }

    return modeOptionList[0]?.value;
  }, [modeSet, modeState, modeOptionList]);

  // ======================= Effect =======================
  // Dynamic update mode when color change
  React.useEffect(() => {
    setModeState(postColor.isGradient() ? 'gradient' : 'single');
  }, [postColor]);

  // ======================= Return =======================
  return [postColor, setMergedColor, postMode, setModeState, modeOptionList];
}
