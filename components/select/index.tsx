import * as React from 'react';
import * as PropTypes from 'prop-types';
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import { ConfigConsumer, ConfigProviderProps } from '../config-provider';
import omit from 'omit.js';
import warning from 'warning';
import Icon from '../icon';
import { tuple } from '../_util/type';

const SelectSizes = tuple('default', 'large', 'small');

export interface AbstractSelectProps {
  prefixCls?: string;
  className?: string;
  showAction?: string | string[];
  size?: (typeof SelectSizes)[number];
  notFoundContent?: React.ReactNode | null;
  transitionName?: string;
  choiceTransitionName?: string;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
  style?: React.CSSProperties;
  tabIndex?: number;
  placeholder?: string | React.ReactNode;
  defaultActiveFirstOption?: boolean;
  dropdownClassName?: string;
  dropdownStyle?: React.CSSProperties;
  dropdownMenuStyle?: React.CSSProperties;
  dropdownMatchSelectWidth?: boolean;
  onSearch?: (value: string) => any;
  getPopupContainer?: (triggerNode: Element) => HTMLElement;
  filterOption?: boolean | ((inputValue: string, option: React.ReactElement<OptionProps>) => any);
  id?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onDropdownVisibleChange?: (open: boolean) => void;
  autoClearSearchValue?: boolean;
  dropdownRender?: (menu?: React.ReactNode, props?: SelectProps) => React.ReactNode;
  loading?: boolean;
}

export interface LabeledValue {
  key: string;
  label: React.ReactNode;
}

export type SelectValue = string | string[] | number | number[] | LabeledValue | LabeledValue[];

export interface SelectProps<T = SelectValue> extends AbstractSelectProps {
  value?: T;
  defaultValue?: T;
  mode?: 'default' | 'multiple' | 'tags' | 'combobox' | string;
  optionLabelProp?: string;
  firstActiveValue?: string | string[];
  onChange?: (value: T, option: React.ReactElement<any> | React.ReactElement<any>[]) => void;
  onSelect?: (value: T, option: React.ReactElement<any>) => any;
  onDeselect?: (value: T) => any;
  onBlur?: (value: T) => void;
  onFocus?: () => void;
  onPopupScroll?: React.UIEventHandler<HTMLDivElement>;
  onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLInputElement>) => any;
  onMouseLeave?: (e: React.MouseEvent<HTMLInputElement>) => any;
  maxTagCount?: number;
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: T[]) => React.ReactNode);
  optionFilterProp?: string;
  labelInValue?: boolean;
  tokenSeparators?: string[];
  getInputElement?: () => React.ReactElement<any>;
  autoFocus?: boolean;
  suffixIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  menuItemSelectedIcon?: React.ReactNode;
}

export interface OptionProps {
  disabled?: boolean;
  value?: string | number;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  key?: string;
  style?: React.CSSProperties;
}

export interface OptGroupProps {
  label?: React.ReactNode;
}

export interface SelectLocale {
  notFoundContent?: string;
}

const SelectPropTypes = {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(SelectSizes),
  notFoundContent: PropTypes.any,
  showSearch: PropTypes.bool,
  optionLabelProp: PropTypes.string,
  transitionName: PropTypes.string,
  choiceTransitionName: PropTypes.string,
  id: PropTypes.string,
};

// => It is needless to export the declaration of below two inner components.
// export { Option, OptGroup };

export default class Select<T = SelectValue> extends React.Component<SelectProps<T>, {}> {
  static Option = Option as React.ClassicComponentClass<OptionProps>;
  static OptGroup = OptGroup as React.ClassicComponentClass<OptGroupProps>;

  static SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE';

  static defaultProps = {
    prefixCls: 'ant-select',
    showSearch: false,
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
  };

  static propTypes = SelectPropTypes;

  private rcSelect: any;

  constructor(props: SelectProps<T>) {
    super(props);

    warning(
      props.mode !== 'combobox',
      'The combobox mode of Select is deprecated, ' +
        'it will be removed in next major version, ' +
        'please use AutoComplete instead',
    );
  }

  focus() {
    this.rcSelect.focus();
  }

  blur() {
    this.rcSelect.blur();
  }

  saveSelect = (node: any) => {
    this.rcSelect = node;
  };

  getNotFoundContent(locale: SelectLocale) {
    const { notFoundContent } = this.props;
    if (this.isCombobox()) {
      // AutoComplete don't have notFoundContent defaultly
      return notFoundContent === undefined ? null : notFoundContent;
    }
    return notFoundContent === undefined ? locale.notFoundContent : notFoundContent;
  }

  isCombobox() {
    const { mode } = this.props;
    return mode === 'combobox' || mode === Select.SECRET_COMBOBOX_MODE_DO_NOT_USE;
  }

  renderSuffixIcon() {
    const { prefixCls, loading, suffixIcon } = this.props;
    if (suffixIcon) {
      return React.isValidElement<{ className?: string }>(suffixIcon)
        ? React.cloneElement(suffixIcon, {
            className: classNames(suffixIcon.props.className, `${prefixCls}-arrow-icon`),
          })
        : suffixIcon;
    }
    if (loading) {
      return <Icon type="loading" />;
    }
    return <Icon type="down" className={`${prefixCls}-arrow-icon`} />;
  }

  renderSelect = (locale: SelectLocale) => {
    const {
      prefixCls,
      className = '',
      size,
      mode,
      getPopupContainer,
      removeIcon,
      clearIcon,
      menuItemSelectedIcon,
      ...restProps
    } = this.props;
    const rest = omit(restProps, ['inputIcon']);

    const cls = classNames(
      {
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-sm`]: size === 'small',
      },
      className,
    );

    let { optionLabelProp } = this.props;
    if (this.isCombobox()) {
      // children 带 dom 结构时，无法填入输入框
      optionLabelProp = optionLabelProp || 'value';
    }

    const modeConfig = {
      multiple: mode === 'multiple',
      tags: mode === 'tags',
      combobox: this.isCombobox(),
    };

    const finalRemoveIcon = (removeIcon &&
      (React.isValidElement<{ className?: string }>(removeIcon)
        ? React.cloneElement(removeIcon, {
            className: classNames(removeIcon.props.className, `${prefixCls}-remove-icon`),
          })
        : removeIcon)) || <Icon type="close" className={`${prefixCls}-remove-icon`} />;

    const finalClearIcon = (clearIcon &&
      (React.isValidElement<{ className?: string }>(clearIcon)
        ? React.cloneElement(clearIcon, {
            className: classNames(clearIcon.props.className, `${prefixCls}-clear-icon`),
          })
        : clearIcon)) || (
      <Icon type="close-circle" theme="filled" className={`${prefixCls}-clear-icon`} />
    );

    const finalMenuItemSelectedIcon = (menuItemSelectedIcon &&
      (React.isValidElement<{ className?: string }>(menuItemSelectedIcon)
        ? React.cloneElement(menuItemSelectedIcon, {
            className: classNames(
              menuItemSelectedIcon.props.className,
              `${prefixCls}-selected-icon`,
            ),
          })
        : menuItemSelectedIcon)) || <Icon type="check" className={`${prefixCls}-selected-icon`} />;

    return (
      <ConfigConsumer>
        {({ getPopupContainer: getContextPopupContainer }: ConfigProviderProps) => {
          return (
            <RcSelect
              inputIcon={this.renderSuffixIcon()}
              removeIcon={finalRemoveIcon}
              clearIcon={finalClearIcon}
              menuItemSelectedIcon={finalMenuItemSelectedIcon}
              {...rest}
              {...modeConfig}
              prefixCls={prefixCls}
              className={cls}
              optionLabelProp={optionLabelProp || 'children'}
              notFoundContent={this.getNotFoundContent(locale)}
              getPopupContainer={getPopupContainer || getContextPopupContainer}
              ref={this.saveSelect}
            />
          );
        }}
      </ConfigConsumer>
    );
  };

  render() {
    return (
      <LocaleReceiver componentName="Select" defaultLocale={defaultLocale.Select}>
        {this.renderSelect}
      </LocaleReceiver>
    );
  }
}
