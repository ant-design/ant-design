import { useMemo } from 'react';

export type Orientation = 'horizontal' | 'vertical';

export default function useOrientation(
  orientation?: Orientation,
  defaultVertical?: boolean,
  oldOrientation?: Orientation,
): [Orientation, boolean] {
  return useMemo(() => {
    const validOrientation = orientation === 'horizontal' || orientation === 'vertical';
    if (validOrientation) {
      return [orientation, orientation === 'vertical'];
    }
    if (typeof defaultVertical === 'boolean') {
      return [defaultVertical ? 'vertical' : 'horizontal', defaultVertical];
    }
    return [oldOrientation ?? 'horizontal', oldOrientation === 'vertical' || false];
  }, [oldOrientation, orientation, defaultVertical]);
}
