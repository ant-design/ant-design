import * as React from 'react';
import { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import Select, { AbstractSelectProps, SelectValue, OptionProps, OptGroupProps } from '../select';
import Input from '../input';
import InputElement from './InputElement';

export interface DataSourceItemObject { value: string; text: string; }
export type DataSourceItemType = string | DataSourceItemObject;

export interface AutoCompleteInputProps {
  onChange?: React.FormEventHandler<any>;
  value: any;
}

export type ValidInputElement =
  HTMLInputElement |
  HTMLTextAreaElement |
  React.ReactElement<AutoCompleteInputProps>;

export interface AutoCompleteProps extends AbstractSelectProps {
  value?: SelectValue;
  defaultValue?: SelectValue;
  dataSource?: DataSourceItemType[];
  optionLabelProp?: string;
  onChange?: (value: SelectValue) => void;
  onSelect?: (value: SelectValue, option: Object) => any;
  children?: ValidInputElement |
    React.ReactElement<OptionProps> |
    Array<React.ReactElement<OptionProps>>;
}

function isSelectOptionOrSelectOptGroup(child: any): Boolean {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

export default class AutoComplete extends React.Component<AutoCompleteProps, {}> {
  static Option = Option as React.ClassicComponentClass<OptionProps>;
  static OptGroup = OptGroup as React.ClassicComponentClass<OptGroupProps>;

  static defaultProps = {
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    choiceTransitionName: 'zoom',
    showSearch: false,
    filterOption: false,
  };

  private select: any;

  getInputElement = () => {
    const { children } = this.props;
    const element = children && React.isValidElement(children) && children.type !== Option ?
      React.Children.only(this.props.children) : <Input />;
    const elementProps = { ...element.props };
    // https://github.com/ant-design/ant-design/pull/7742
    delete elementProps.children;
    return (
      <InputElement {...elementProps}>{element}</InputElement>
    );
  }

  focus() {
    this.select.focus();
  }

  blur() {
    this.select.blur();
  }

  saveSelect = (node: any) => {
    this.select = node;
  }

  render() {
    let {
      size, className = '', notFoundContent, prefixCls, optionLabelProp, dataSource, children,
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [className]: !!className,
      [`${prefixCls}-show-search`]: true,
      [`${prefixCls}-auto-complete`]: true,
    });

    let options;
    const childArray = React.Children.toArray(children);
    if (childArray.length &&
        isSelectOptionOrSelectOptGroup(childArray[0])
      ) {
      options = children;
    } else {
      options = dataSource ? dataSource.map((item) => {
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
    }

    return (
      <Select
        {...this.props}
        className={cls}
        mode="combobox"
        optionLabelProp={optionLabelProp}
        getInputElement={this.getInputElement}
        notFoundContent={notFoundContent}
        ref={this.saveSelect}
      >
        {options}
      </Select>
    );
  }
}
