import type * as React from 'react';
import type { TabPaneProps } from 'rc-tabs/lib/TabPanelList/TabPane';

const TabPane: React.FC<TabPaneProps> = () => null;

if (process.env.NODE_ENV !== 'production') {
  TabPane.displayName = 'DeprecatedTabPane';
}

export type { TabPaneProps };

export default TabPane;
