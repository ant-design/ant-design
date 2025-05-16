import { useMemo } from 'react';

export type Orientation = 'horizontal' | 'vertical';

export default function useOrientation(
  orientation?: Orientation,
  defaultVertical?: boolean,
  oldOrientation?: Orientation,
): [Orientation, boolean] {
  return useMemo(() => {
    const validOrientation = orientation === 'horizontal' || orientation === 'vertical';
    let mergedOrientation: Orientation = 'horizontal';
    if (validOrientation) {
      mergedOrientation = orientation;
    } else if (typeof defaultVertical === 'boolean') {
      mergedOrientation = defaultVertical ? 'vertical' : 'horizontal';
    } else {
      mergedOrientation = oldOrientation ?? 'horizontal';
    }

    return [mergedOrientation, mergedOrientation === 'vertical'];
  }, [oldOrientation, orientation, defaultVertical]);
}
