import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';

import type { PanelProps } from '../interface';

/**
 * Convert `children` into `items`.
 */
export default function useItems(children: React.ReactNode) {
  const items = React.useMemo(
    () =>
      toArray(children)
        .filter((node) => React.isValidElement(node))
        .map((node) => (node as React.ReactElement<PanelProps>).props),
    [children],
  );
  return items;
}
