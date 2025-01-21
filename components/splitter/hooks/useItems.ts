import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';

import type { PanelProps } from '../interface';

function getCollapsible(collapsible?: PanelProps['collapsible']) {
  if (collapsible && typeof collapsible === 'object') {
    return collapsible;
  }

  const mergedCollapsible = !!collapsible;
  return {
    start: mergedCollapsible,
    end: mergedCollapsible,
  };
}

export type ItemType = Omit<PanelProps, 'collapsible'> & {
  collapsible: {
    start?: boolean;
    end?: boolean;
  };
};

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
