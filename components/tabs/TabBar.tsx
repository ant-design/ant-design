import * as React from 'react';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import { TabsProps } from './index';

export default class TabBar extends React.Component<TabsProps> {
  render() {
    const {
      tabBarStyle,
      animated = true,
      renderTabBar,
      tabBarExtraContent,
    } = this.props;
    const inkBarAnimated = typeof animated === 'object' ? animated.inkBar : animated;

    let RenderTabBar: React.ReactElement<any>;
    const renderProps = {
      ...this.props,
      inkBarAnimated,
      extraContent: tabBarExtraContent,
      style: tabBarStyle,
    };

    if (renderTabBar) {
      RenderTabBar = renderTabBar(renderProps);
    } else {
      RenderTabBar = <ScrollableInkTabBar {...renderProps}/>;
    }

    return React.cloneElement(RenderTabBar);
  }
}
