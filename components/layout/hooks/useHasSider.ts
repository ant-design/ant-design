import type * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';

import Sider from '../Sider';

export default function useHasSider(
  siders: string[],
  children?: React.ReactNode,
  hasSider?: boolean,
) {
  if (typeof hasSider === 'boolean') {
    return hasSider;
  }

  if (siders.length) {
    return true;
  }

  const childNodes = toArray(children);

  return childNodes.some((node) => node.type === Sider);
}
