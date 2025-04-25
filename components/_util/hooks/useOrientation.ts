import { useMemo } from 'react';

export type Orientation = 'horizontal' | 'vertical';
interface OrientationProps {
  orientation?: Orientation;
  direction?: any;
  vertical?: boolean;
  ctxVertical?: boolean;
}

export const useOrientation = (
  { orientation, vertical, ctxVertical }: OrientationProps,
  type?: Orientation,
) => {
  const mergedOrientation = useMemo(() => {
    const haveOrientation = ['horizontal', 'vertical'].includes(orientation || '');
    if (haveOrientation) {
      return orientation;
    }
    if (vertical ?? ctxVertical) {
      return 'vertical';
    }
    return type ?? 'horizontal';
  }, [type, orientation, vertical, ctxVertical]);
  return mergedOrientation;
};

interface VerticalProps {
  orientation?: Orientation;
  vertical?: boolean;
  ctxVertical?: boolean;
}
export const useVertical = ({ orientation, vertical, ctxVertical }: VerticalProps) => {
  return useMemo(() => {
    if (orientation) {
      return orientation === 'vertical';
    }
    return vertical ?? ctxVertical ?? false;
  }, []);
};
