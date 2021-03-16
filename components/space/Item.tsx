import * as React from 'react';
import { SpaceContext } from '.';

export interface ItemProps {
  className: string;
  children: React.ReactNode;
  index: number;
  direction?: 'horizontal' | 'vertical';
  marginDirection: 'marginLeft' | 'marginRight';
  split?: string | React.ReactNode;
  wrap?: boolean;
}

export default function Item({
  className,
  direction,
  index,
  marginDirection,
  children,
  split,
  wrap,
}: ItemProps) {
  const { horizontalSize, verticalSize, latestIndex } = React.useContext(SpaceContext);

  let style: React.CSSProperties = {};

  if (direction === 'vertical') {
    if (index < latestIndex) {
      style = { marginBottom: horizontalSize / (split ? 2 : 1) };
    }
  } else {
    style = {
      ...(index < latestIndex && { [marginDirection]: horizontalSize / (split ? 2 : 1) }),
      ...(wrap && { paddingBottom: verticalSize }),
    };
  }

  if (children === null || children === undefined) {
    return null;
  }

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
