import type { TabPaneProps } from 'rc-tabs/lib/TabPanelList/TabPane';
import type * as React from 'react';

const TabPane: React.FC<TabPaneProps> = () => null;

if (process.env.NODE_ENV !== 'production') {
  TabPane.displayName = 'DeprecatedTabPane';
}

export { TabPaneProps };

export default TabPane;
