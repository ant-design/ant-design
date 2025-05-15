import { useMemo } from 'react';

export type Orientation = 'horizontal' | 'vertical';

type UseOrientation = (
  orientation?: Orientation,
  defaultVertical?: boolean,
  oldOrientation?: Orientation,
) => [Orientation, boolean];
const useOrientation: UseOrientation = (orientation, defaultVertical, oldOrientation) => {
  return useMemo(() => {
    const haveOrientation = ['horizontal', 'vertical'].includes(orientation || '');
    if (haveOrientation) {
      return [orientation ?? 'horizontal', orientation === 'vertical'];
    }
    if (typeof defaultVertical === 'boolean') {
      return [defaultVertical ? 'vertical' : 'horizontal', !!defaultVertical];
    }
    return [oldOrientation ?? 'horizontal', oldOrientation === 'vertical' || false];
  }, [oldOrientation, orientation, defaultVertical]);
};

export default useOrientation;
