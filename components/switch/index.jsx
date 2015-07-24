import Switch from 'rc-switch';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-switch'
    };
  },
  render() {
    return <Switch {...this.props}/>;
  }
});
