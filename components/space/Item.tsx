import * as React from 'react';
import { LastIndexContext } from '.';
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
  direction?: 'horizontal' | 'vertical';
  size?: SizeType | number;
  marginDirection: 'marginLeft' | 'marginRight';
}

export default function Item({
  className,
  direction,
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
              [direction === 'vertical' ? 'marginBottom' : marginDirection]:
                typeof size === 'string' ? spaceSize[size] : size,
            }
      }
    >
      {children}
    </div>
  );
}
