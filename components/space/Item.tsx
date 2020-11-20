import * as React from 'react';
import { getNumberSize, LastIndexContext, SpaceSize } from '.';

export interface ItemProps {
  className: string;
  children: React.ReactNode;
  index: number;
  direction?: 'horizontal' | 'vertical';
  size?: SpaceSize | [SpaceSize, SpaceSize];
  marginDirection: 'marginLeft' | 'marginRight';
  split?: string | React.ReactNode;
  wrap?: boolean;
}

export default function Item({
  className,
  direction,
  index,
  size,
  marginDirection,
  children,
  split,
  wrap,
}: ItemProps) {
  const latestIndex = React.useContext(LastIndexContext);

  if (children === null || children === undefined) {
    return null;
  }

  const [horizontalSize, verticalSize] = Array.isArray(size) ? size : [size, size];

  const verticalStyle =
    wrap && direction === 'horizontal' ? { paddingBottom: getNumberSize(verticalSize) } : undefined;

  const style =
    index >= latestIndex
      ? { ...verticalStyle }
      : {
          [direction === 'vertical' ? 'marginBottom' : marginDirection]:
            (getNumberSize(horizontalSize) ?? 0) / (split ? 2 : 1),
          ...verticalStyle,
        };

  return (
    <>
      <div className={className} style={style}>
        {children}
      </div>
      {index < latestIndex && split && (
        <span className={`${className}-split`} style={style}>
          {split}
        </span>
      )}
    </>
  );
}
