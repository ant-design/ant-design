import * as React from 'react';
import { toArray } from '@rc-component/util';

import type { PanelProps } from '../interface';

export type ItemType = Omit<PanelProps, 'collapsible'> & {
  collapsible: {
    start?: boolean;
    end?: boolean;
    showCollapsibleIcon: 'auto' | boolean;
  };
};

function getCollapsible(collapsible?: PanelProps['collapsible']): ItemType['collapsible'] {
  if (collapsible && typeof collapsible === 'object') {
    return {
      ...collapsible,
      showCollapsibleIcon:
        collapsible.showCollapsibleIcon === undefined ? 'auto' : collapsible.showCollapsibleIcon,
    };
  }

  const mergedCollapsible = !!collapsible;
  return {
    start: mergedCollapsible,
    end: mergedCollapsible,
    showCollapsibleIcon: 'auto',
  };
}

/**
 * Convert `children` into `items`.
 */
function useItems(children: React.ReactNode): ItemType[] {
  const items = React.useMemo(
    () =>
      toArray(children)
        .filter((item) => React.isValidElement<PanelProps>(item))
        .map((node) => {
          const { props } = node;
          const { collapsible, ...restProps } = props;
          return {
            ...restProps,
            collapsible: getCollapsible(collapsible),
          };
        }),
    [children],
  );
  return items;
}

export default useItems;
