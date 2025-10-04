import type * as React from 'react';
import type { TabPaneProps as RcTabPaneProps } from '@rc-component/tabs/lib/TabPanelList/TabPane';

import type { CompatibilityProps } from '.';

type TabPaneProps = CompatibilityProps & Omit<RcTabPaneProps, 'destroyInactiveTabPane'>;

const TabPane: React.FC<TabPaneProps> = () => null;

if (process.env.NODE_ENV !== 'production') {
  TabPane.displayName = 'DeprecatedTabPane';
}

export type { TabPaneProps };

export default TabPane;
