import { useEffect, useState } from 'react';
import type { Color } from '../color';
import { generateColor } from '../util';

function hasValue(value: Color | string | undefined) {
  return value !== undefined;
}

const useColorState = (
  defaultStateValue: Color | string,
  option: {
    defaultValue?: Color | string;
    value?: Color | string;
  },
): [Color, React.Dispatch<React.SetStateAction<Color>>] => {
  const { defaultValue, value } = option;
  const [colorValue, setColorValue] = useState(() => {
    let mergeState;
    if (hasValue(value)) {
      mergeState = value;
    } else if (hasValue(defaultValue)) {
      mergeState = defaultValue;
    } else {
      mergeState = defaultStateValue;
    }
    const genColor = generateColor(mergeState || '');
    return genColor;
  });

  useEffect(() => {
    if (value) {
      setColorValue(generateColor(value));
    }
  }, [value]);

  return [colorValue, setColorValue];
};

export default useColorState;
