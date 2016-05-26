import RcTabs from 'rc-tabs';
import React, { cloneElement } from 'react';
import classNames from 'classnames';
import Icon from '../icon';

export default class Tabs extends React.Component {
  static TabPane = RcTabs.TabPane;

  static defaultProps = {
    prefixCls: 'ant-tabs',
    animation: 'slide-horizontal',
    type: 'line', // or 'card' 'editable-card'
    onChange() {},
    onEdit() {},
    hideAdd: false,
  }

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
            <Icon type="cross" onClick={(e) => this.removeTab(child.key, e)} />
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
        animation={animation}>
        {children}
      </RcTabs>
    );
  }
}
