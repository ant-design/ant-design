import { useMemo } from 'react';

import type { ColorPickerProps } from '../interface';

export default function useMode(
  Mode: ColorPickerProps['mode'],
): [single: boolean, gradient: boolean] {
  return useMemo(() => {
    const modeList = Array.isArray(Mode) ? Mode : [Mode];
    return [modeList.includes('single'), modeList.includes('gradient')];
  }, [Mode]);
}
