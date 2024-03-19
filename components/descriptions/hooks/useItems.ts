import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';

import type { DescriptionsItemType, InternalDescriptionsItemType } from '..';
import { matchScreen, type ScreenMap } from '../../_util/responsiveObserver';

// Convert children into items
const transChildren2Items = (childNodes?: React.ReactNode) =>
  toArray(childNodes).map((node) => ({ ...node?.props, key: node.key }));

export default function useItems(
  screens: ScreenMap,
  items?: DescriptionsItemType[],
  children?: React.ReactNode,
) {
  const mergedItems = React.useMemo<DescriptionsItemType[]>(
    () =>
      // Take `items` first or convert `children` into items
      items || transChildren2Items(children),
    [items, children],
  );

  const responsiveItems = React.useMemo<InternalDescriptionsItemType[]>(
    () =>
      mergedItems.map(({ span, ...restItem }) => ({
        ...restItem,
        span: typeof span === 'number' ? span : matchScreen(screens, span),
      })),
    [mergedItems, screens],
  );

  return responsiveItems;
}
