import React from 'react';
import Select from 'rc-select';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-select',
      transitionName: 'slide-up',
      optionLabelProp: 'children',
      showSearch: false
    };
  },
  render() {
    return (
      <Select {...this.props} />
    );
  }
});
