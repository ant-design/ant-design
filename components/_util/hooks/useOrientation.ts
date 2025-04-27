import { useMemo } from 'react';

export type Orientation = 'horizontal' | 'vertical';

type OrientationFn = (
  orientation?: Orientation,
  defaultVertical?: boolean,
  type?: Orientation,
) => Orientation;
export const useOrientation: OrientationFn = (orientation, defaultVertical, type) => {
  return useMemo(() => {
    const haveOrientation = ['horizontal', 'vertical'].includes(orientation || '');
    if (haveOrientation) {
      return orientation ?? 'horizontal';
    }
    if (defaultVertical) {
      return 'vertical';
    }
    return type ?? 'horizontal';
  }, [type, orientation, defaultVertical]);
};

type VerticalFn = (orientation?: Orientation, defaultVertical?: boolean) => boolean;
export const useVertical: VerticalFn = (orientation, defaultVertical) => {
  return useMemo(() => {
    if (orientation) {
      return orientation === 'vertical';
    }
    return defaultVertical ?? false;
  }, [defaultVertical, orientation]);
};
