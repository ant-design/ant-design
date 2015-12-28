import RcCheckbox from 'rc-checkbox';
import React from 'react';
import Group from './Group';

const Checkbox = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-checkbox'
    };
  },
  render() {
    return <RcCheckbox {...this.props} />;
  }
});

Checkbox.Group = Group;

export default Checkbox;
