import * as React from 'react';
import { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import InputElement from './InputElement';
import Input, { InputProps } from '../input';
import Select, { AbstractSelectProps, SelectValue, OptionProps, OptGroupProps } from '../select';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { Omit } from '../_util/type';

export interface DataSourceItemObject {
  value: string;
  text: string;
}
export type DataSourceItemType =
  | string
  | DataSourceItemObject
  | React.ReactElement<OptionProps>
  | React.ReactElement<OptGroupProps>;

export interface AutoCompleteInputProps {
  onChange?: React.FormEventHandler<any>;
  value: any;
}

export type ValidInputElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | React.ReactElement<AutoCompleteInputProps>;

export interface AutoCompleteProps extends Omit<AbstractSelectProps, 'loading'> {
  value?: SelectValue;
  defaultValue?: SelectValue;
  dataSource?: DataSourceItemType[];
  autoFocus?: boolean;
  backfill?: boolean;
  optionLabelProp?: string;
  onChange?: (value: SelectValue) => void;
  onSelect?: (value: SelectValue, option: Object) => any;
  onBlur?: (value: SelectValue) => void;
  onFocus?: () => void;
  children?:
    | ValidInputElement
    | React.ReactElement<InputProps>
    | React.ReactElement<OptionProps>
    | Array<React.ReactElement<OptionProps>>;
}

function isSelectOptionOrSelectOptGroup(child: any): Boolean {
  return child && child.type && (child.type.isSelectOption || child.type.isSelectOptGroup);
}

export default class AutoComplete extends React.Component<AutoCompleteProps, {}> {
  static Option = Option as React.ClassicComponentClass<OptionProps>;

  static OptGroup = OptGroup as React.ClassicComponentClass<OptGroupProps>;

  static defaultProps = {
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    choiceTransitionName: 'zoom',
    showSearch: false,
    filterOption: false,
  };

  private select: any;

  saveSelect = (node: any) => {
    this.select = node;
  };

  getInputElement = () => {
    const { children } = this.props;
    const element =
      children && React.isValidElement(children) && children.type !== Option ? (
        React.Children.only(this.props.children)
      ) : (
        <Input />
      );
    const elementProps = { ...(element as React.ReactElement<any>).props };
    // https://github.com/ant-design/ant-design/pull/7742
    delete elementProps.children;
    return <InputElement {...elementProps}>{element}</InputElement>;
  };

  focus() {
    this.select.focus();
  }

  blur() {
    this.select.blur();
  }

  renderAutoComplete = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      size,
      className = '',
      notFoundContent,
      optionLabelProp,
      dataSource,
      children,
    } = this.props;
    const prefixCls = getPrefixCls('select', customizePrefixCls);

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [className]: !!className,
      [`${prefixCls}-show-search`]: true,
      [`${prefixCls}-auto-complete`]: true,
    });

    let options;
    const childArray = React.Children.toArray(children);
    if (childArray.length && isSelectOptionOrSelectOptGroup(childArray[0])) {
      options = children;
    } else {
      options = dataSource
        ? dataSource.map(item => {
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
                throw new Error(
                  'AutoComplete[dataSource] only supports type `string[] | Object[]`.',
                );
            }
          })
        : [];
    }

    return (
      <Select
        {...this.props}
        className={cls}
        mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE}
        optionLabelProp={optionLabelProp}
        getInputElement={this.getInputElement}
        notFoundContent={notFoundContent}
        ref={this.saveSelect}
      >
        {options}
      </Select>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderAutoComplete}</ConfigConsumer>;
  }
}
