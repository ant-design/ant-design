'use strict';

var Tabs = require('rc-tabs');
var React = require('react');

class AntTabs extends React.Component {
  render() {
    return <Tabs {...this.props}/>;
  }
}

AntTabs.defaultProps = {
  prefixCls: 'ant-tab'
};

AntTabs.TabPane = Tabs.TabPane;

module.exports = AntTabs;
