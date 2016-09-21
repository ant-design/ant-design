import React from 'react';
import Select, { Option, OptGroup } from '../select';
import classNames from 'classnames';

export interface SelectedValue {
  key: string;
  label: React.ReactNode;
}

export interface AutoCompleteProps {
  size?: 'large' | 'small' | 'default';
  className?: string;
  notFoundContent?: Element;
  dataSource: Array<any>;
  prefixCls?: string;
  transitionName?: string;
  optionLabelProp?: string;
  choiceTransitionName?: string;
  showSearch?: boolean;
  defaultValue?: string | Array<any> | SelectedValue | Array<SelectedValue>;
  value?: string | Array<any> | SelectedValue | Array<SelectedValue>;
  allowClear?: boolean;
  onChange?: (value) => void;
  disabled?: boolean;
}

export default class AutoComplete extends React.Component<AutoCompleteProps, any> {
  static Option = Option;
  static OptGroup = OptGroup;

  static defaultProps = {
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    choiceTransitionName: 'zoom',
    showSearch: false,
  };

  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

  render() {
    let {
      size, className, notFoundContent, prefixCls, optionLabelProp, dataSource,
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
              key: item.key || index,
            });
          }
          return <Option key={item.value}>{item.text}</Option>;
        default:
          return [];
      }
    }) : [];

    return (
      <Select {...this.props}
        className={cls}
        optionLabelProp={optionLabelProp}
        combobox
        notFoundContent={notFoundContent} >
        {options}
      </Select>
    );
  }
}
