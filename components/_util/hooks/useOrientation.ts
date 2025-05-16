import { useMemo } from 'react';

export type Orientation = 'horizontal' | 'vertical';

export default function useOrientation(
  orientation?: Orientation,
  vertical?: boolean,
  legacyDirection?: Orientation,
): [Orientation, boolean] {
  return useMemo(() => {
    const validOrientation = orientation === 'horizontal' || orientation === 'vertical';
    let mergedOrientation: Orientation;
    if (validOrientation) {
      mergedOrientation = orientation;
    } else if (typeof vertical === 'boolean') {
      mergedOrientation = vertical ? 'vertical' : 'horizontal';
    } else {
      mergedOrientation = legacyDirection ?? 'horizontal';
    }

    return [mergedOrientation, mergedOrientation === 'vertical'];
  }, [legacyDirection, orientation, vertical]);
}
