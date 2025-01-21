import * as React from 'react';
import useEvent from 'rc-util/lib/hooks/useEvent';
import useMergedState from 'rc-util/lib/hooks/useMergedState';

import { useLocale } from '../../locale';
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
  const [locale] = useLocale('ColorPicker');

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

    const pushOption = (modeType: ModeType, localeTxt: string) => {
      if (modes.has(modeType)) {
        optionList.push({
          label: localeTxt,
          value: modeType,
        });
      }
    };

    pushOption('single', locale.singleColor);
    pushOption('gradient', locale.gradientColor);

    return [optionList, modes];
  }, [mode]);

  // ======================== Post ========================
  // We need align `mode` with `color` state

  // >>>>> Color
  const [cacheColor, setCacheColor] = React.useState<AggregationColor | null>(null);

  const setColor = useEvent((nextColor: AggregationColor) => {
    setCacheColor(nextColor);
    setMergedColor(nextColor);
  });

  const postColor = React.useMemo(() => {
    const colorObj = generateColor(mergedColor || '');

    // Use `cacheColor` in case the color is `cleared`
    return colorObj.equals(cacheColor) ? cacheColor! : colorObj;
  }, [mergedColor, cacheColor]);

  // >>>>> Mode
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
  return [postColor, setColor, postMode, setModeState, modeOptionList];
}
