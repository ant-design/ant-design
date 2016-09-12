import React from 'react';
import { cloneElement } from 'react';
import RcTabs, { TabPane } from 'rc-tabs';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import TabContent from 'rc-tabs/lib/TabContent';
import classNames from 'classnames';
import Icon from '../icon';

export type TabsType = 'line' | 'card' | 'editable-card'
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TabsProps {
  activeKey?: string;
  defaultActiveKey?: string;
  hideAdd?: boolean;
  onChange?: (activeKey: string) => void;
  onTabClick?: Function;
  tabBarExtraContent?: React.ReactNode;
  type?: TabsType;
  tabPosition?: TabsPosition;
  onEdit?: (targetKey: string, action: any) => void;
  size?: 'default' | 'small';
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  animation?: string;
}

// Tabs
export interface TabPaneProps {
  /** 选项卡头显示文字 */
  tab: React.ReactNode | string;
  style?: React.CSSProperties;
}

export default class Tabs extends React.Component<TabsProps, any> {
  static TabPane: TabPaneProps = TabPane;

  static defaultProps = {
    prefixCls: 'ant-tabs',
    animation: 'slide-horizontal',
    type: 'line', // or 'card' 'editable-card'
    onChange() { },
    onEdit() { },
    hideAdd: false,
  };

  createNewTab = (targetKey) => {
    this.props.onEdit(targetKey, 'add');
  }

  removeTab = (targetKey, e) => {
    e.stopPropagation();
    if (!targetKey) {
      return;
    }
    this.props.onEdit(targetKey, 'remove');
  }

  handleChange = (activeKey) => {
    this.props.onChange(activeKey);
  }

  render() {
    let {
      prefixCls,
      size,
      type,
      tabPosition,
      animation,
      children,
      tabBarExtraContent,
      hideAdd,
      onTabClick,
    } = this.props;
    let className = classNames({
      [this.props.className]: !!this.props.className,
      [`${prefixCls}-mini`]: size === 'small' || size === 'mini',
      [`${prefixCls}-vertical`]: tabPosition === 'left' || tabPosition === 'right',
      [`${prefixCls}-card`]: type.indexOf('card') >= 0,
      [`${prefixCls}-${type}`]: true,
    });
    if (tabPosition === 'left' || tabPosition === 'right' || type.indexOf('card') >= 0) {
      animation = null;
    }
    // only card type tabs can be added and closed
    let childrenWithCross;
    if (type === 'editable-card') {
      childrenWithCross = [];
      React.Children.forEach(children, (child: React.ReactElement<any>, index) => {
        childrenWithCross.push(cloneElement(child, {
          tab: (
            <div>
              {child.props.tab}
              <Icon type="cross" onClick={(e) => this.removeTab(child.key, e)} />
            </div>
          ),
          key: child.key || index,
        }));
      });
      // Add new tab handler
      if (!hideAdd) {
        tabBarExtraContent = (
          <span>
            <Icon type="plus" className={`${prefixCls}-new-tab`} onClick={this.createNewTab} />
            {tabBarExtraContent}
          </span>
        );
      }
    }

    tabBarExtraContent = tabBarExtraContent ? (
      <div className={`${prefixCls}-extra-content`}>
        {tabBarExtraContent}
      </div>
    ) : null;

    return (
      <RcTabs {...this.props}
        className={className}
        tabBarPosition={tabPosition}
        renderTabBar={() => (
          <ScrollableInkTabBar
            extraContent={tabBarExtraContent}
            onTabClick={onTabClick}
          />
        )}
        renderTabContent={() => <TabContent />}
        onChange={this.handleChange}
      >
        {childrenWithCross || children}
      </RcTabs>
    );
  }
}
