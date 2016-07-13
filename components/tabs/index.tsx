import RcTabs from 'rc-tabs';
import * as React from 'react';
const { cloneElement } = React;
import classNames from 'classnames';
import Icon from '../icon';

type TabsType = 'line' | 'card' | 'editable-card'
type TabsPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TabsProps {
  /** 当前激活 tab 面板的 key    */
  activeKey?: string;
  /** 初始化选中面板的 key，如果没有设置 activeKey*/
  defaultActiveKey?: string;
  /** 是否隐藏加号图标，在 `type="editable-card"` 时有效 */
  hideAdd?: boolean;
  /** 切换面板的回调*/
  onChange?: (activeKey: string) => void;
  /** tab 被点击的回调 */
  onTabClick?: Function;
  /** tab bar 上额外的元素  */
  tabBarExtraContent?: React.ReactNode;
  /** 页签的基本样式，可选 `line`、`card` `editable-card` 类型*/
  type?: TabsType;
  /** 页签位置，可选值有 `top` `right` `bottom` `left`*/
  tabPosition?: TabsPosition;
  /** 新增和删除页签的回调，在 `type="editable-card"` 时有效*/
  onEdit?: (targetKey: string, action: any) => void;
  /** 大小，提供 default 和 small 两种大小    */
  size?: 'default' | 'small';

  style?: React.CSSProperties;
}

// Tabs
export interface TabPaneProps {
  /** 选项卡头显示文字 */
  tab: React.ReactNode | string;
  style?: React.CSSProperties;
}

export default class Tabs extends React.Component<TabsProps, any> {
  static TabPane: TabPaneProps = RcTabs.TabPane;

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
    let { prefixCls, size, tabPosition, animation, type,
      children, tabBarExtraContent, hideAdd } = this.props;
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
    if (type === 'editable-card') {
      children = children.map((child, index) => {
        return cloneElement(child, {
          tab: <div>
            {child.props.tab}
            <Icon type="cross" onClick={(e) => this.removeTab(child.key, e) } />
          </div>,
          key: child.key || index,
        });
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
        tabBarExtraContent={tabBarExtraContent}
        onChange={this.handleChange}
        animation={animation}
        >
        {children}
      </RcTabs>
    );
  }
}
