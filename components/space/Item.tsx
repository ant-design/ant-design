import * as React from 'react';
import { clsx } from 'clsx';

import type { SpaceSemanticAllType } from '.';
import isNonNullable from '../_util/isNonNullable';
import { SpaceContext } from './context';
import type { SpaceContextType } from './context';

export interface ItemProps {
  className: string;
  children: React.ReactNode;
  prefix: string;
  index: number;
  separator?: React.ReactNode;
  style?: React.CSSProperties;
  classNames?: SpaceSemanticAllType['classNames'];
  styles?: SpaceSemanticAllType['styles'];
}

const Item: React.FC<ItemProps> = (props) => {
  const { className, prefix, index, children, separator, style, classNames, styles } = props;

  const { latestIndex } = React.useContext<SpaceContextType>(SpaceContext);

  if (!isNonNullable(children)) {
    return null;
  }

  return (
    <>
      <div className={className} style={style}>
        {children}
      </div>
      {index < latestIndex && separator && (
        <span
          className={clsx(`${prefix}-item-separator`, classNames?.separator)}
          style={styles?.separator}
        >
          {separator}
        </span>
      )}
    </>
  );
};

export default Item;
