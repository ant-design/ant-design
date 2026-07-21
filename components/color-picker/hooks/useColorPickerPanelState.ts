import React, { useCallback, useMemo } from 'react';
import { useControlledState } from '@rc-component/util';

import { devUseWarning } from '../../_util/warning';
import { AggregationColor } from '../color';
import type { PanelPickerContextProps } from '../context';
import type { ColorPickerProps } from '../interface';
import { genAlphaColor, generateColor, getColorAlpha } from '../util';
import useModeColor from './useModeColor';

type ColorPickerPanelStateProps = Pick<
  ColorPickerProps,
  | 'defaultFormat'
  | 'defaultValue'
  | 'disabledAlpha'
  | 'format'
  | 'mode'
  | 'onChange'
  | 'onChangeComplete'
  | 'onFormatChange'
  | 'value'
>;

export type ColorPickerPanelState = Pick<
  PanelPickerContextProps,
  | 'activeIndex'
  | 'format'
  | 'gradientDragging'
  | 'mode'
  | 'modeOptions'
  | 'onActive'
  | 'onChange'
  | 'onChangeComplete'
  | 'onFormatChange'
  | 'onGradientDragging'
  | 'onModeChange'
  | 'value'
>;

export default function useColorPickerPanelState(
  props: ColorPickerPanelStateProps,
  componentName: 'ColorPicker' | 'ColorPicker.Panel',
  skipWarning = false,
): ColorPickerPanelState {
  const {
    mode,
    value,
    defaultValue,
    format,
    defaultFormat,
    disabledAlpha = false,
    onFormatChange,
    onChange,
    onChangeComplete,
  } = props;

  const [formatValue, setFormatValue] = useControlledState(defaultFormat, format);

  const triggerFormatChange = useCallback(
    (newFormat?: ColorPickerPanelState['format']) => {
      setFormatValue(newFormat);
      if (formatValue !== newFormat) {
        onFormatChange?.(newFormat);
      }
    },
    [formatValue, onFormatChange, setFormatValue],
  );

  const [mergedColor, setColor, modeState, setModeState, modeOptions] = useModeColor(
    defaultValue,
    value,
    mode,
  );

  const isAlphaColor = useMemo(() => getColorAlpha(mergedColor) < 100, [mergedColor]);

  const [cachedGradientColor, setCachedGradientColor] = React.useState<AggregationColor | null>(
    null,
  );

  const onInternalChangeComplete: ColorPickerProps['onChangeComplete'] = useCallback(
    (color) => {
      if (onChangeComplete) {
        let changeColor = generateColor(color);

        if (disabledAlpha && isAlphaColor) {
          changeColor = genAlphaColor(color);
        }

        onChangeComplete(changeColor);
      }
    },
    [disabledAlpha, isAlphaColor, onChangeComplete],
  );

  const onInternalChange: PanelPickerContextProps['onChange'] = useCallback(
    (data, changeFromPickerDrag) => {
      let color: AggregationColor = generateColor(data as AggregationColor);

      if (disabledAlpha && isAlphaColor) {
        color = genAlphaColor(color);
      }

      setColor(color);
      setCachedGradientColor(null);

      onChange?.(color, color.toCssString());

      if (!changeFromPickerDrag) {
        onInternalChangeComplete(color);
      }
    },
    [disabledAlpha, isAlphaColor, onChange, onInternalChangeComplete, setColor],
  );

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [gradientDragging, setGradientDragging] = React.useState(false);

  const onInternalModeChange = useCallback(
    (newMode: ColorPickerPanelState['mode']) => {
      setModeState(newMode);

      if (newMode === 'single' && mergedColor.isGradient()) {
        setActiveIndex(0);
        onInternalChange(new AggregationColor(mergedColor.getColors()[0].color));
        setCachedGradientColor(mergedColor);
      } else if (newMode === 'gradient' && !mergedColor.isGradient()) {
        const baseColor = isAlphaColor ? genAlphaColor(mergedColor) : mergedColor;

        onInternalChange(
          new AggregationColor(
            cachedGradientColor || [
              {
                percent: 0,
                color: baseColor,
              },
              {
                percent: 100,
                color: baseColor,
              },
            ],
          ),
        );
      }
    },
    [cachedGradientColor, isAlphaColor, mergedColor, onInternalChange, setModeState],
  );

  if (process.env.NODE_ENV !== 'production' && !skipWarning) {
    const warning = devUseWarning(componentName);

    warning(
      !(disabledAlpha && isAlphaColor),
      'usage',
      '`disabledAlpha` will make the alpha to be 100% when use alpha color.',
    );
  }

  return useMemo(
    () => ({
      activeIndex,
      format: formatValue,
      gradientDragging,
      mode: modeState,
      modeOptions,
      onActive: setActiveIndex,
      onChange: onInternalChange,
      onChangeComplete: onInternalChangeComplete,
      onFormatChange: triggerFormatChange,
      onGradientDragging: setGradientDragging,
      onModeChange: onInternalModeChange,
      value: mergedColor,
    }),
    [
      activeIndex,
      formatValue,
      gradientDragging,
      mergedColor,
      modeOptions,
      modeState,
      onInternalChange,
      onInternalChangeComplete,
      onInternalModeChange,
      triggerFormatChange,
    ],
  );
}
