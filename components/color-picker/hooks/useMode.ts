import { useMemo } from 'react';

import type { ColorPickerProps } from '../interface';

export default function useMode(
  Mode: ColorPickerProps['mode'],
): [single: boolean, gradient: boolean, both: boolean] {
  return useMemo(() => {
    const modeList = Array.isArray(Mode) ? Mode : [Mode];
    const isSingle = modeList.includes('single');
    const isGradient = modeList.includes('gradient');
    return [isSingle, isGradient, isSingle && isGradient];
  }, [Mode]);
}
