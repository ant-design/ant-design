import React from 'react';
import Select from 'rc-select';

export default React.createClass({
  getDefaultProps: function () {
    return {
      prefixCls: 'ant-select',
      transitionName: 'slide-up',
      optionLabelProp: 'children',
      showSearch: false
    };
  },
  render: function () {
    return (
      <Select {...this.props} />
    );
  }
});

export const Option = Select.Option;
