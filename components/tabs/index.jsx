'use strict';

var Tabs = require('rc-tabs');
var React = require('react');
var prefixCls = 'ant-tabs';

class AntTabs extends React.Component {
  render() {
    var sizeCls = '';
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

module.exports = AntTabs;
