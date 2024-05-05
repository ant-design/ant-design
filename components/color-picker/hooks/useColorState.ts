import { useEffect, useRef, useState } from 'react';

import type { Color } from '../color';
import type { ColorValueType } from '../interface';
import { generateColor } from '../util';

const INIT_COLOR_REF = {} as ColorValueType;

function hasValue(value?: ColorValueType) {
  return value !== undefined;
}

const useColorState = (
  defaultStateValue: ColorValueType,
  option: { defaultValue?: ColorValueType; value?: ColorValueType },
) => {
  const { defaultValue, value } = option;
  const prevColor = useRef<Color>(generateColor(''));
  const [colorValue, _setColorValue] = useState<Color>(() => {
    let mergedState: ColorValueType | undefined;
    if (hasValue(value)) {
      mergedState = value;
    } else if (hasValue(defaultValue)) {
      mergedState = defaultValue;
    } else {
      mergedState = defaultStateValue;
    }
    const color = generateColor(mergedState || '');
    prevColor.current = color;
    return color;
  });

  const setColorValue = (color: Color) => {
    _setColorValue(color);
    prevColor.current = color;
  };

  const prevValue = useRef<ColorValueType | undefined>(INIT_COLOR_REF);
  useEffect(() => {
    // `useEffect` will be executed twice in strict mode even if the deps are the same
    // So we compare the value manually to avoid unnecessary update
    if (prevValue.current === value) {
      return;
    }
    prevValue.current = value;
    const newColor = generateColor(hasValue(value) ? value || '' : prevColor.current);
    if (prevColor.current.cleared === true) {
      newColor.cleared = 'controlled';
    }
    setColorValue(newColor);
  }, [value]);

  return [colorValue, setColorValue, prevColor] as const;
};

export default useColorState;
