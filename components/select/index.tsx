import React from 'react';
import { PropTypes } from 'react';
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';

export type SelectValue = string | any[] | { key: string, label: React.ReactNode } |
 Array<{ key: string, label: React.ReactNode }>;

export interface AbstractSelectProps {
  size?: 'default' | 'large' | 'small';
  className?: string;
  notFoundContent?: React.ReactNode | null;
  prefixCls?: string;
  transitionName?: string;
  optionLabelProp?: string;
  choiceTransitionName?: string;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  placeholder?: string;
}

export interface SelectProps extends AbstractSelectProps {
  value?: SelectValue;
  defaultValue?: SelectValue;
  combobox?: boolean;
  multiple?: boolean;
  filterOption?: boolean | ((inputValue: string, option: Object) => any);
  tags?: boolean;
  onSelect?: (value: SelectValue, option: Object) => any;
  onDeselect?: (value: SelectValue) => any;
  onSearch?: (value: string) => any;
  dropdownMatchSelectWidth?: boolean;
  optionFilterProp?: string;
  defaultActiveFirstOption?: boolean;
  labelInValue?: boolean;
  getPopupContainer?: (triggerNode: React.ReactNode) => React.ReactNode | HTMLElement;
  dropdownStyle?: React.CSSProperties;
  dropdownMenuStyle?: React.CSSProperties;
  onChange?: (value: SelectValue) => void;
  tokenSeparators?: string[];
  getInputElement?: () => React.ReactElement<any>;
}

export interface OptionProps {
  disabled?: boolean;
  value?: any;
}

export interface OptGroupProps {
  label?: string | React.ReactElement<any>;
}

export interface SelectContext {
  antLocale?: {
    Select?: any,
  };
}

// => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };

export default class Select extends React.Component<SelectProps, any> {
  static Option = Option as React.ClassicComponentClass<OptionProps>;
  static OptGroup = OptGroup as React.ClassicComponentClass<OptGroupProps>;

  static defaultProps = {
    prefixCls: 'ant-select',
    showSearch: false,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    size: PropTypes.oneOf(['default', 'large', 'small']),
    combobox: PropTypes.bool,
    notFoundContent: PropTypes.any,
    showSearch: PropTypes.bool,
    optionLabelProp: PropTypes.string,
    transitionName: PropTypes.string,
    choiceTransitionName: PropTypes.string,
  };

  context: SelectContext;

  render() {
    const {
      prefixCls,
      className = '',
      size,
      combobox,
      showSearch,
    } = this.props;

    let { notFoundContent = 'Not Found', optionLabelProp } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-show-search`]: showSearch,
    }, className);

    const { antLocale } = this.context;
    if (antLocale && antLocale.Select) {
      notFoundContent = ('notFoundContent' in this.props)
        ? notFoundContent : antLocale.Select.notFoundContent;
    }

    if (combobox) {
      notFoundContent = null;
      // children 带 dom 结构时，无法填入输入框
      optionLabelProp = optionLabelProp || 'value';
    }

    return (
      <RcSelect
        {...this.props}
        className={cls}
        optionLabelProp={optionLabelProp || 'children'}
        notFoundContent={notFoundContent}
      />
    );
  }
}
