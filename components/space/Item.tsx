import * as React from 'react';
import { clsx } from 'clsx';

import { SpaceContext } from './context';
import type { SpaceContextType } from './context';

export interface ItemProps {
  className: string;
  children: React.ReactNode;
  prefix: string;
  index: number;
  separator?: React.ReactNode;
  style?: React.CSSProperties;
  classNames: Partial<Record<'separator', string>>;
  styles: Partial<Record<'separator', React.CSSProperties>>;
}

const Item: React.FC<ItemProps> = ({
  className,
  prefix,
  index,
  children,
  separator,
  style,
  classNames,
  styles,
}) => {
  const { latestIndex } = React.useContext<SpaceContextType>(SpaceContext);

  if (children === null || children === undefined) {
    return null;
  }

  return (
    <>
      <div className={className} style={style}>
        {children}
      </div>
      {index < latestIndex && separator && (
        <span
          className={clsx(`${prefix}-item-separator`, classNames.separator)}
          style={styles.separator}
        >
          {separator}
        </span>
      )}
    </>
  );
};

export default Item;
