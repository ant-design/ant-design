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
    var sizeClass = 'ant-select-';
    if(this.props.size === 'large'){
      sizeClass += 'lg';
    }
    if(this.props.size === 'small'){
      sizeClass += 'sm';
    }
    return (
      <Select className={sizeClass} {...this.props} />
    );
  }
});

AntSelect.Option = Select.Option;
AntSelect.OptGroup = Select.OptGroup;

export default AntSelect;
