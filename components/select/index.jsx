import React from 'react';
import Select from 'rc-select';

let AntSelect = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-select',
      transitionName: 'slide-up',
      optionLabelProp: 'children',
      showSearch: false,
      size: 'default'
    };
  },
  render() {
    const {size, className, combobox, notFoundContent} = this.props;

    let sizeClass = null;
    if (size === 'large') {
      sizeClass = 'ant-select-lg';
    } else if (size === 'small') {
      sizeClass = 'ant-select-sm';
    }

    const classNames = [];

    if (className) {
      classNames.push(className);
    }
    if (sizeClass) {
      classNames.push(sizeClass);
    }
    return (
      <Select {...this.props} className={classNames.join(' ')} notFoundContent={combobox ? null : notFoundContent} />
    );
  }
});

AntSelect.Option = Select.Option;
AntSelect.OptGroup = Select.OptGroup;

export default AntSelect;
