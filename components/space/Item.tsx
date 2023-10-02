import * as React from 'react';

import { SpaceContext } from './context';
import type { SpaceContextType } from './context';

export interface ItemProps {
  className: string;
  children: React.ReactNode;
  index: number;
  split?: React.ReactNode;
  style?: React.CSSProperties;
}

const Item: React.FC<ItemProps> = ({ className, index, children, split, style }) => {
  const { latestIndex } = React.useContext<SpaceContextType>(SpaceContext);

  if (children === null || children === undefined) {
    return null;
  }

  return (
    <>
      <div className={className} style={style}>
        {children}
      </div>
      {index < latestIndex && split && <span className={`${className}-split`}>{split}</span>}
    </>
  );
};

export default Item;
