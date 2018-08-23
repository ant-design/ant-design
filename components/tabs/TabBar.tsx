import * as React from 'react';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import { TabsProps } from './index';

export default class TabBar extends React.Component<TabsProps> {
  render() {
    let {
      prefixCls,
      tabBarExtraContent,
      tabBarStyle,
      onTabClick,
      onPrevClick,
      onNextClick,
      animated = true,
      tabBarGutter,
      renderTabBar,
    } = this.props;
    let inkBarAnimated = typeof animated === 'object' ? animated.inkBar : animated;

    tabBarExtraContent = tabBarExtraContent ? (
      <div className={`${prefixCls}-extra-content`}>
        {tabBarExtraContent}
      </div>
    ) : null;

    let RenderTabBar: React.ReactElement<any>;
    const props = {
      ...this.props,
      inkBarAnimated: inkBarAnimated,
      extraContent: tabBarExtraContent,
      onTabClick: onTabClick,
      onPrevClick: onPrevClick,
      onNextClick: onNextClick,
      style: tabBarStyle,
      tabBarGutter: tabBarGutter,
    };

    if (renderTabBar) {
      RenderTabBar = renderTabBar(props);
    } else {
      RenderTabBar = (
        <ScrollableInkTabBar {...props}/>
      );
    }

    return React.cloneElement(RenderTabBar, { props });
  }
}
