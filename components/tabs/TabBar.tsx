import * as React from 'react';
import Icon from '../icon';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import { TabsProps } from './index';

export default class TabBar extends React.Component<TabsProps> {
  render() {
    const {
      tabBarStyle,
      animated = true,
      renderTabBar,
      tabBarExtraContent,
      tabPosition,
      prefixCls,
    } = this.props;
    const inkBarAnimated = typeof animated === 'object' ? animated.inkBar : animated;

    const isVertical = tabPosition === 'left' || tabPosition === 'right';
    const prevIconType = isVertical ? 'up' : 'left';
    const nextIconType = isVertical ? 'down' : 'right';
    const prevIcon = (
      <span className={`${prefixCls}-tab-prev-icon`}>
        <Icon type={prevIconType} className={`${prefixCls}-tab-prev-icon-target`} />
      </span>
    );
    const nextIcon = (
      <span className={`${prefixCls}-tab-next-icon`}>
        <Icon type={nextIconType} className={`${prefixCls}-tab-next-icon-target`} />
      </span>
    );

    const renderProps = {
      ...this.props,
      inkBarAnimated,
      extraContent: tabBarExtraContent,
      style: tabBarStyle,
      prevIcon,
      nextIcon,
    };

    let RenderTabBar: React.ReactElement<any>;

    if (renderTabBar) {
      RenderTabBar = renderTabBar(renderProps, ScrollableInkTabBar);
    } else {
      RenderTabBar = <ScrollableInkTabBar {...renderProps} />;
    }

    return React.cloneElement(RenderTabBar);
  }
}
