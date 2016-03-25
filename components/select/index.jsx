import React from 'react';
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';

export default class Select extends React.Component {
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
      <RcSelect {...this.props}
        className={cls}
        notFoundContent={notFoundContent} />
    );
  }
}

Select.defaultProps = {
  prefixCls: 'ant-select',
  transitionName: 'slide-up',
  optionLabelProp: 'children',
  choiceTransitionName: 'zoom',
  showSearch: false,
};

Select.Option = Option;
Select.OptGroup = OptGroup;
