import Tabs from 'rc-tabs';
import React from 'react';
const prefixCls = 'ant-tabs';

class AntTabs extends React.Component {
  render() {
    let className = (this.props.className || '');
    if (this.props.size === 'small' || this.props.size === 'mini') {
      className += ' ' + prefixCls + '-mini';
    }
    if (this.props.tabPosition === 'left' || this.props.tabPosition === 'right') {
      className += ' ' + prefixCls + '-vertical';
    }
    return <Tabs {...this.props} className={className} />;
  }
}

AntTabs.defaultProps = {
  prefixCls: prefixCls,
  size: 'default'
};

AntTabs.TabPane = Tabs.TabPane;

export default AntTabs;
