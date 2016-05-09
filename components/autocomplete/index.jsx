import React from 'react';
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';

export default class AutoComplete extends React.Component {
  static Option = Option;
  static OptGroup = OptGroup;

  static defaultProps = {
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    choiceTransitionName: 'zoom',
    showSearch: false,
  }

  static contextTypes = {
    antLocale: React.PropTypes.object,
  }

  render() {
    let {
      size, className, notFoundContent, prefixCls, optionLabelProp, dataSource
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [className]: !!className,
      [`${prefixCls}-show-search`]: true,
    });

    const options = dataSource ? dataSource.map((item, index) => {
      switch (typeof item) {
        case 'string':
          return <Option key={item}>{item}</Option>;
        case 'object':
          if (React.isValidElement(item)) {
            return React.cloneElement(item, {
              key: item.key || index
            });
          }
          return <Option key={item.value}>{item.text}</Option>;
        default:
          return [];
      }
    }) : [];

    return (
      <RcSelect {...this.props}
        className={cls}
        optionLabelProp={optionLabelProp}
        combobox
        notFoundContent={notFoundContent} >
        {options}
      </RcSelect>
    );
  }
}
