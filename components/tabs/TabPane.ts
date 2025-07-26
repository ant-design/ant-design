import type * as React from 'react';
import type { TabPaneProps as RcTabPaneProps } from 'rc-tabs/lib/TabPanelList/TabPane';

const TabPane: React.FC<TabPaneProps> = () => null;

if (process.env.NODE_ENV !== 'production') {
  TabPane.displayName = 'DeprecatedTabPane';
}

type TabPaneProps = {
  /** @deprecated Please use `destroyOnHidden` instead */
  destroyInactiveTabPane?: boolean;
  /**
   * @since 5.25.0
   */
  destroyOnHidden?: boolean;
} & RcTabPaneProps;

export type { TabPaneProps };

export default TabPane;
