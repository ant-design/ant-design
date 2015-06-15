'use strict';

var Tab = require('rc-tabs');
var React = require('react');

class AntTabs extends React.Component {
  render() {
    return <Tab {...this.props}/>;
  }
}

AntTabs.defaultProps = {
  prefixCls: 'ant-tab'
};

AntTabs.TabPane = Tab.TabPane;

module.exports = AntTabs;
