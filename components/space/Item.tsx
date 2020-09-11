import * as React from 'react';
import { LastIndexContext, Directions } from '.';
import { SizeType } from '../config-provider/SizeContext';

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
};

export interface ItemProps {
  className: string;
  children: React.ReactNode;
  index: number;
  direction: Directions;
  inverseDirection?: boolean;
  size?: SizeType | number;
  marginDirection: 'marginLeft' | 'marginRight';
}

const getDirection = (direction: Directions, inverseDirection?: boolean): Directions => {
  if (inverseDirection && direction === 'horizontal') return 'vertical';
  if (inverseDirection && direction === 'vertical') return 'horizontal';

  return direction;
};

export default function Item({
  className,
  direction,
  inverseDirection,
  index,
  size,
  marginDirection,
  children,
}: ItemProps) {
  const latestIndex = React.useContext(LastIndexContext);

  if (children === null || children === undefined) {
    return null;
  }

  return (
    <div
      className={className}
      style={
        index >= latestIndex
          ? {}
          : {
              [getDirection(direction, inverseDirection) === 'vertical'
                ? 'marginBottom'
                : marginDirection]: typeof size === 'string' ? spaceSize[size] : size,
            }
      }
    >
      {children}
    </div>
  );
}
