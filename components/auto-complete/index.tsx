import React from 'react';
import { findDOMNode } from 'react-dom';
import Select, { OptionProps, OptGroupProps } from '../select';
import Input from '../input';
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

class InputElement extends React.Component<any, any> {
  private ele: Element;
  focus = () => {
    (findDOMNode(this.ele) as HTMLInputElement).focus();
  }
  blur = () => {
    (findDOMNode(this.ele) as HTMLInputElement).blur();
  }
  render() {
    return React.cloneElement(this.props.children, {
      ...this.props,
      ref: ele => this.ele = ele,
    }, null);
  }
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

  getInputElement = () => {
    const element = this.props.children || <Input/>;
    return <InputElement className="ant-input">{element}</InputElement>;
  }
  render() {
    let {
      size, className = '', notFoundContent, prefixCls, optionLabelProp, dataSource,
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [className]: !!className,
      [`${prefixCls}-show-search`]: true,
      [`${prefixCls}-auto-complete`]: true,
    });

    const options = dataSource ? dataSource.map((item) => {
      if (React.isValidElement(item)) {
        return item;
      }
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
    }) : [];

    return (
      <Select
        {...this.props}
        className={cls}
        optionLabelProp={optionLabelProp}
        combobox
        getInputElement={this.getInputElement}
        notFoundContent={notFoundContent}
      >
        {options}
      </Select>
    );
  }
}
