import * as React from 'react';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import classNames from 'classnames';
import { UpOutlined, LeftOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';

import { TabsProps } from './index';

export default class TabBar extends React.Component<TabsProps> {
  static defaultProps = {
    animated: true,
    type: 'line',
  };

  render() {
    const {
      tabBarStyle,
      animated,
      renderTabBar,
      tabBarExtraContent,
      tabPosition,
      prefixCls,
      className,
      size,
      type,
    } = this.props;
    const inkBarAnimated = typeof animated === 'object' ? animated.inkBar : animated;

    const isVertical = tabPosition === 'left' || tabPosition === 'right';
    const prevIconComponent = isVertical ? UpOutlined : LeftOutlined;
    const nextIconComponent = isVertical ? DownOutlined : RightOutlined;
    const prevIcon = (
      <span className={`${prefixCls}-tab-prev-icon`}>
        {React.createElement(prevIconComponent, {
          className: `${prefixCls}-tab-prev-icon-target`,
        })}
      </span>
    );
    const nextIcon = (
      <span className={`${prefixCls}-tab-next-icon`}>
        {React.createElement(nextIconComponent, {
          className: `${prefixCls}-tab-next-icon-target`,
        })}
      </span>
    );

    // Additional className for style usage
    const cls: string = classNames(
      `${prefixCls}-${tabPosition}-bar`,
      {
        [`${prefixCls}-${size}-bar`]: !!size,
        [`${prefixCls}-card-bar`]: type && type.indexOf('card') >= 0,
      },
      className,
    );

    const renderProps = {
      ...this.props,
      children: null,
      inkBarAnimated,
      extraContent: tabBarExtraContent,
      style: tabBarStyle,
      prevIcon,
      nextIcon,
      className: cls,
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
