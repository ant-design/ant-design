import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';

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
export default function useItems(children: React.ReactNode): ItemType[] {
  const items = React.useMemo(
    () =>
      toArray(children)
        .filter(React.isValidElement)
        .map((node) => {
          const { props } = node as React.ReactElement<PanelProps>;
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
