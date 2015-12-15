import React from 'react';
import Select from 'rc-select';
import classNames from 'classnames';

const AntSelect = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-select',
      transitionName: 'slide-up',
      optionLabelProp: 'children',
      choiceTransitionName: 'zoom',
      showSearch: false,
      size: 'default'
    };
  },
  render() {
    let {
      size, className, combobox, notFoundContent
    } = this.props;

    const cls = classNames({
      'ant-select-lg': size === 'large',
      'ant-select-sm': size === 'small',
      [className]: !!className,
    });

    if (combobox) {
      notFoundContent = null;
    }

    return (
      <Select {...this.props}
        className={cls}
        notFoundContent={notFoundContent} />
    );
  }
});

AntSelect.Option = Select.Option;
AntSelect.OptGroup = Select.OptGroup;

export default AntSelect;
