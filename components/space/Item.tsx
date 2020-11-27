import * as React from 'react';
import { LastIndexContext, SpaceSizeContext } from '.';

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
  const latestIndex = React.useContext(LastIndexContext);
  const { horizontalSize, verticalSize } = React.useContext(SpaceSizeContext);

  if (children === null || children === undefined) {
    return null;
  }

  const verticalStyle =
    wrap && direction === 'horizontal' ? { paddingBottom: verticalSize } : undefined;

  const style =
    index >= latestIndex
      ? { ...verticalStyle }
      : {
          [direction === 'vertical' ? 'marginBottom' : marginDirection]:
            (horizontalSize ?? 0) / (split ? 2 : 1),
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
