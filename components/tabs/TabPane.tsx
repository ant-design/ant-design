import type * as React from 'react';
import type { TabPaneProps } from 'rc-tabs/lib/TabPanelList/TabPane';
import warning from '../_util/warning';

const TabPane: React.FC<TabPaneProps> = () => {
  warning(false, 'Tabs', 'Tabs.TabPane is deprecated. Please use `items` directly.');
  return null;
};

if (process.env.NODE_ENV !== 'production') {
  TabPane.displayName = 'DeprecatedTabPane';
}

export { TabPaneProps };

export default TabPane;
