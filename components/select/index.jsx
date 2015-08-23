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
    let sizeClass = '';
    if (this.props.size === 'large') {
      sizeClass = 'ant-select-lg';
    } else if (this.props.size === 'small') {
      sizeClass = 'ant-select-sm';
    }
    let className = this.props.className || ' ';
    return (
      <Select {...this.props} className={className + sizeClass} />
    );
  }
});

AntSelect.Option = Select.Option;
AntSelect.OptGroup = Select.OptGroup;

export default AntSelect;
