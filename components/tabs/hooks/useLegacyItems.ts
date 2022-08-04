import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';
import type { Tab } from 'rc-tabs/lib/interface';
import type { TabsProps, TabPaneProps } from '..';

function filter<T>(items: (T | null)[]): T[] {
  return items.filter(item => item) as T[];
}

export default function useLegacyItems(items?: TabsProps['items'], children?: React.ReactNode) {
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
