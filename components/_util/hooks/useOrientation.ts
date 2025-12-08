import { useMemo } from 'react';

export type Orientation = 'horizontal' | 'vertical';

const isValidOrientation = (orientation?: Orientation) => {
  return orientation === 'horizontal' || orientation === 'vertical';
};

export const useOrientation = (
  orientation?: Orientation,
  vertical?: boolean,
  legacyDirection?: Orientation,
): [Orientation, boolean] => {
  return useMemo(() => {
    const validOrientation = isValidOrientation(orientation);
    let mergedOrientation: Orientation;
    if (validOrientation) {
      mergedOrientation = orientation;
    } else if (typeof vertical === 'boolean') {
      mergedOrientation = vertical ? 'vertical' : 'horizontal';
    } else {
      const validLegacyDirection = isValidOrientation(legacyDirection);
      mergedOrientation = validLegacyDirection ? legacyDirection : 'horizontal';
    }

    return [mergedOrientation, mergedOrientation === 'vertical'];
  }, [legacyDirection, orientation, vertical]);
};
