import React from 'react';
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';

export default class Select extends React.Component {
  static Option = Option;
  static OptGroup = OptGroup;

  static defaultProps = {
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    choiceTransitionName: 'zoom',
    showSearch: false,
  }

  render() {
    let {
      size, className, combobox, notFoundContent, prefixCls,
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
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
