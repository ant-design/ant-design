import Tabs from 'rc-tabs';
import React from 'react';
const prefixCls = 'ant-tabs';

class AntTabs extends React.Component {
  render() {
    let sizeCls = '';
    if (this.props.size === 'mini') {
      sizeCls = prefixCls + '-mini';
    }
    return <Tabs {...this.props} className={sizeCls} />;
  }
}

AntTabs.defaultProps = {
  prefixCls: prefixCls,
  size: 'normal'
};

AntTabs.TabPane = Tabs.TabPane;

export default AntTabs;

