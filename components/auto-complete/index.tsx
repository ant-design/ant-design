import React from 'react';
import Select, { OptionProps, OptGroupProps } from '../select';
import { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';

export interface SelectedValue {
  key: string;
  label: React.ReactNode;
}

export interface DataSourceItemObject { value: string; text: string; };
export type DataSourceItemType = string | DataSourceItemObject;

export interface AutoCompleteProps {
  size?: 'large' | 'small' | 'default';
  className?: string;
  notFoundContent?: Element;
  dataSource: DataSourceItemType[];
  prefixCls?: string;
  transitionName?: string;
  optionLabelProp?: string;
  choiceTransitionName?: string;
  showSearch?: boolean;
  defaultValue?: string | Array<any> | SelectedValue | Array<SelectedValue>;
  value?: string | Array<any> | SelectedValue | Array<SelectedValue>;
  allowClear?: boolean;
  onChange?: (value: string | Array<any> | SelectedValue | Array<SelectedValue>) => void;
  disabled?: boolean;
}

export default class AutoComplete extends React.Component<AutoCompleteProps, any> {
  static Option = Option as React.ClassicComponentClass<OptionProps>;
  static OptGroup = OptGroup as React.ClassicComponentClass<OptGroupProps>;

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
      size, className = '', notFoundContent, prefixCls, optionLabelProp, dataSource, children,
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [className]: !!className,
      [`${prefixCls}-show-search`]: true,
    });

    const options = children || (dataSource ? dataSource.map((item) => {
      switch (typeof item) {
        case 'string':
          return <Option key={item}>{item}</Option>;
        case 'object':
          return (
            <Option key={(item as DataSourceItemObject).value}>
              {(item as DataSourceItemObject).text}
            </Option>
          );
        default:
          throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
      }
    }) : []);

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
