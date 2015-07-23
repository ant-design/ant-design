import Radio from 'rc-radio';
import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-radio'
    };
  },
  render() {
    return (
      <label>
        <Radio {...this.props} children={null} />
        {this.props.children}
      </label>
    );
  }
});
