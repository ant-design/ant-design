import React from 'react';
import Select from 'rc-select';

var AntSelect = React.createClass({
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

AntSelect.Option = Select.Option;

export default AntSelect;
