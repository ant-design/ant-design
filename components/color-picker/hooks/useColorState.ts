import { useEffect, useState } from 'react';

import type { Color } from '../color';
import type { ColorValueType } from '../interface';
import { generateColor } from '../util';

function hasValue(value?: ColorValueType) {
  return value !== undefined;
}

const useColorState = (
  defaultStateValue: ColorValueType,
  option: { defaultValue?: ColorValueType; value?: ColorValueType },
): readonly [Color, React.Dispatch<React.SetStateAction<Color>>] => {
  const { defaultValue, value } = option;
  const [colorValue, setColorValue] = useState<Color>(() => {
    let mergedState: ColorValueType | undefined;
    if (hasValue(value)) {
      mergedState = value;
    } else if (hasValue(defaultValue)) {
      mergedState = defaultValue;
    } else {
      mergedState = defaultStateValue;
    }
    return generateColor(mergedState || '');
  });

  useEffect(() => {
    if (value) {
      setColorValue(generateColor(value));
    }
  }, [value]);

  return [colorValue, setColorValue] as const;
};

export default useColorState;
