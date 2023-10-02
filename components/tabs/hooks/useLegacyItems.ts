import * as React from 'react';
import type { Tab } from 'rc-tabs/lib/interface';
import toArray from 'rc-util/lib/Children/toArray';

import type { TabPaneProps, TabsProps } from '..';
import { devUseWarning } from '../../_util/warning';

function filter<T>(items: (T | null)[]): T[] {
  return items.filter((item) => item) as T[];
}

export default function useLegacyItems(items?: TabsProps['items'], children?: React.ReactNode) {
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Tabs');
    warning.deprecated(!children, 'Tabs.TabPane', 'items');
  }

  if (items) {
    return items;
  }

  const childrenItems = toArray(children).map((node: React.ReactElement<TabPaneProps>) => {
    if (React.isValidElement(node)) {
      const { key, props } = node;
      const { tab, ...restProps } = props || {};

      const item: Tab = {
        key: String(key),
        ...restProps,
        label: tab,
      };
      return item;
    }

    return null;
  });

  return filter(childrenItems);
}
