import { useMemo } from 'react';

type Orientation = 'horizontal' | 'vertical';
interface OrientationProps {
  orientation?: Orientation;
  direction?: any;
  vertical?: boolean;
}
export const useOrientation = (
  { orientation, direction, vertical }: OrientationProps,
  type?: string,
) => {
  const mergedOrientation = useMemo(() => {}, [type, orientation, direction, vertical]);
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
