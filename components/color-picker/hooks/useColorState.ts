import { useEffect, useRef, useState } from 'react';
import type { Color } from '../color';
import type { ColorValueType } from '../interface';
import { generateColor } from '../util';

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
    let mergeState: ColorValueType | undefined;
    if (hasValue(value)) {
      mergeState = value;
    } else if (hasValue(defaultValue)) {
      mergeState = defaultValue;
    } else {
      mergeState = defaultStateValue;
    }
    const color = generateColor(mergeState || '');
    prevColor.current = color;
    return color;
  });

  const setColorValue: typeof _setColorValue = (color: Color) => {
    _setColorValue(color);
    prevColor.current = color;
  };

  useEffect(() => {
    if (hasValue(value)) {
      const newColor = generateColor(value || '');
      if (prevColor.current.cleared === true) {
        newColor.cleared = 'controlled';
      }
      setColorValue(newColor);
    }
  }, [value]);

  return [colorValue, setColorValue, prevColor] as const;
};

export default useColorState;
