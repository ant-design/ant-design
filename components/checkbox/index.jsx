import RcCheckbox from 'rc-checkbox';
import React from 'react';
import Group from './Group';

class Checkbox extends React.Component {
  render() {
    return <RcCheckbox {...this.props} />;
  }
}

Checkbox.defaultProps = {
  prefixCls: 'ant-checkbox'
};

Checkbox.Group = Group;

export default Checkbox;
