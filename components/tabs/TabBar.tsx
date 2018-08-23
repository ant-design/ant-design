import * as React from 'react';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import { TabsProps } from './index';

export default class TabBar extends React.Component<TabsProps> {
  render() {
    let {
      tabBarStyle,
      animated = true,
      renderTabBar,
      tabBarExtraContent,
    } = this.props;
    let inkBarAnimated = typeof animated === 'object' ? animated.inkBar : animated;

    let RenderTabBar: React.ReactElement<any>;
    const props = {
      ...this.props,
      inkBarAnimated,
      extraContent: tabBarExtraContent,
      style: tabBarStyle,
    };

    if (renderTabBar) {
      RenderTabBar = renderTabBar(props);
    } else {
      RenderTabBar = (
        <ScrollableInkTabBar {...props}/>
      );
    }

    return React.cloneElement(RenderTabBar);
  }
}
