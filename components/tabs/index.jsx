import Tabs, { TabPane } from 'rc-tabs';
import React, { cloneElement } from 'react';
import classNames from 'classnames';
import Icon from '../icon';
let newTabIndex = 0;

class AntTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: props.children,
      activeKey: props.activeKey || props.defaultActiveKey,
    };
    [
      'createNewTab',
      'removeTab',
      'handleChange',
    ].forEach((method) => this[method] = this[method].bind(this));
  }
  componentWillReceiveProps(nextProps) {
    if ('activeKey' in nextProps) {
      this.setState({
        activeKey: nextProps.activeKey,
      });
    }
  }
  createNewTab() {
    const tabs = this.state.tabs;
    let newTab = this.props.newTabPane();
    const newTabKey = newTab.key || ('newTab' + newTabIndex++);
    newTab = cloneElement(newTab, {
      key: newTabKey,
    });
    tabs.push(newTab);
    this.setState({
      tabs,
      activeKey: newTabKey,
    });
  }
  removeTab(key, e) {
    if (!key) {
      return;
    }
    e.stopPropagation();
    let foundIndex = 0;
    let activeKey = this.state.activeKey;
    const tabs = this.state.tabs.filter((tab, index) => {
      if (tab.key !== key) {
        return true;
      } else {
        foundIndex = index;
        return false;
      }
    });
    if (activeKey === key) {
      activeKey = tabs[foundIndex - 1].key;
    }
    this.setState({
      tabs,
      activeKey,
    });
  }
  handleChange(activeKey) {
    if (!('activeKey' in this.props)) {
      this.setState({ activeKey });
    }
    this.props.onChange(activeKey);
  }
  render() {
    let { prefixCls, size, tabPosition, animation, type,
          children, editable, tabBarExtraContent } = this.props;
    let className = classNames({
      [this.props.className]: !!this. props.className,
      [prefixCls + '-mini']: size === 'small' || size === 'mini',
      [prefixCls + '-vertical']: tabPosition === 'left' || tabPosition === 'right',
      [prefixCls + '-' + type]: true,
    });
    if (tabPosition === 'left' || tabPosition === 'right' || type === 'card') {
      animation = null;
    }
    // only card type tabs can be added and closed
    if (type === 'card' && editable) {
      if (this.state.tabs.length > 1) {
        children = this.state.tabs.map((child, index) => {
          return cloneElement(child, {
            tab: <div>
              {child.props.tab}
              <Icon type="cross" onClick={this.removeTab.bind(this, child.key)} />
            </div>,
            key: child.key || index,
          });
        });
      } else {
        children = this.state.tabs;
      }
      // Add new tab handler
      tabBarExtraContent = [
        <Icon type="plus" className={prefixCls + '-new-tab'} onClick={this.createNewTab} />,
        tabBarExtraContent,
      ];
    }
    // Wrap the extra content
    tabBarExtraContent = <div className={prefixCls + '-extra-content'}>
      {tabBarExtraContent}
    </div>;
    let activeKey = this.state.activeKey || children[0].key;
    return <Tabs {...this.props}
      className={className}
      tabBarExtraContent={tabBarExtraContent}
      onChange={this.handleChange}
      activeKey={activeKey}
      animation={animation}>{children}</Tabs>;
  }
}

AntTabs.defaultProps = {
  prefixCls: 'ant-tabs',
  size: 'default',
  animation: 'slide-horizontal',
  type: 'line', // or 'card'
  editable: false,
  newTabPane() {
    return <TabPane tab="New Tab" />;
  },
  onChange() {},
};

AntTabs.TabPane = Tabs.TabPane;

export default AntTabs;
