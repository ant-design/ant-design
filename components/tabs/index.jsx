import Tabs from 'rc-tabs';
import React, { cloneElement } from 'react';
import classNames from 'classnames';
import Icon from '../icon';

class AntTabs extends React.Component {
  constructor(props) {
    super(props);
    [
      'createNewTab',
      'removeTab',
      'handleChange',
    ].forEach((method) => this[method] = this[method].bind(this));
  }
  createNewTab(targetKey) {
    this.props.onEdit(targetKey, 'add');
  }
  removeTab(targetKey, e) {
    e.stopPropagation();
    if (!targetKey) {
      return;
    }
    this.props.onEdit(targetKey, 'remove');
  }
  handleChange(activeKey) {
    this.props.onChange(activeKey);
  }
  render() {
    let { prefixCls, size, tabPosition, animation, type,
          children, tabBarExtraContent } = this.props;
    let className = classNames({
      [this.props.className]: !!this. props.className,
      [prefixCls + '-mini']: size === 'small' || size === 'mini',
      [prefixCls + '-vertical']: tabPosition === 'left' || tabPosition === 'right',
      [prefixCls + '-card']: type.indexOf('card') >= 0,
    });
    if (tabPosition === 'left' || tabPosition === 'right' || type.indexOf('card') >= 0) {
      animation = null;
    }
    // only card type tabs can be added and closed
    if (type === 'editable-card') {
      if (children.length > 1) {
        children = children.map((child, index) => {
          return cloneElement(child, {
            tab: <div>
              {child.props.tab}
              <Icon type="cross" onClick={this.removeTab.bind(this, child.key)} />
            </div>,
            key: child.key || index,
          });
        });
      }
      // Add new tab handler
      tabBarExtraContent = <span>
        <Icon type="plus" className={prefixCls + '-new-tab'} onClick={this.createNewTab} />
        {tabBarExtraContent}
      </span>;
    }
    // Wrap the extra content
    tabBarExtraContent = <div className={prefixCls + '-extra-content'}>
      {tabBarExtraContent}
    </div>;
    return <Tabs {...this.props}
      className={className}
      tabBarExtraContent={tabBarExtraContent}
      onChange={this.handleChange}
      animation={animation}>{children}</Tabs>;
  }
}

AntTabs.defaultProps = {
  prefixCls: 'ant-tabs',
  size: 'default',
  animation: 'slide-horizontal',
  type: 'line', // or 'card' 'editable-card'
  onChange() {},
  onEdit() {},
};

AntTabs.TabPane = Tabs.TabPane;

export default AntTabs;
