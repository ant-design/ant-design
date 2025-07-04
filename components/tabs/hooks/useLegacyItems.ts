import * as React from 'react';
import type { Tab } from 'rc-tabs/lib/interface';
import toArray from 'rc-util/lib/Children/toArray';

import type { TabPaneProps, TabsProps } from '..';
import { devUseWarning } from '../../_util/warning';

function filter<T>(items: (T | null)[]): T[] {
  return items.filter((item) => item) as T[];
}

function useLegacyItems(items?: TabsProps['items'], children?: React.ReactNode) {
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Tabs');
    warning.deprecated(!children, 'Tabs.TabPane', 'items');
  }

  if (items) {
    return items.map<Tab>((item) => {
      const mergedDestroyOnHidden = item.destroyOnHidden ?? item.destroyInactiveTabPane;
      return {
        ...item,
        // TODO: In the future, destroyInactiveTabPane in rc-tabs needs to be upgrade to destroyOnHidden
        destroyInactiveTabPane: mergedDestroyOnHidden,
      };
    });
  }

  const childrenItems = toArray(children).map((node: React.ReactElement) => {
    if (React.isValidElement<TabPaneProps>(node)) {
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

export default useLegacyItems;
