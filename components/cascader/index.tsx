import * as React from 'react';
import RcCascader from 'rc-cascader';
import arrayTreeFilter from 'array-tree-filter';
import classNames from 'classnames';
import omit from 'omit.js';
import KeyCode from 'rc-util/lib/KeyCode';
import Input from '../input';
import Icon from '../icon';

export interface CascaderOptionType {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  children?: Array<CascaderOptionType>;
  __IS_FILTERED_OPTION?: boolean;
}

export type CascaderExpandTrigger = 'click' | 'hover';

export interface ShowSearchType {
  filter?: (inputValue: string, path: CascaderOptionType[]) => boolean;
  render?: (inputValue: string, path: CascaderOptionType[], prefixCls: string | undefined) => React.ReactNode;
  sort?: (a: CascaderOptionType[], b: CascaderOptionType[], inputValue: string) => number;
  matchInputWidth?: boolean;
}

export interface CascaderProps {
  /** 可选项数据源 */
  options: CascaderOptionType[];
  /** 默认的选中项 */
  defaultValue?: string[];
  /** 指定选中项 */
  value?: string[];
  /** 选择完成后的回调 */
  onChange?: (value: string[], selectedOptions?: CascaderOptionType[]) => void;
  /** 选择后展示的渲染函数 */
  displayRender?: (label: string[], selectedOptions?: CascaderOptionType[]) => React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 自定义浮层类名 */
  popupClassName?: string;
  /** 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` */
  popupPlacement?: string;
  /** 输入框占位文本*/
  placeholder?: string;
  /** 输入框大小，可选 `large` `default` `small` */
  size?: string;
  /** 禁用*/
  disabled?: boolean;
  /** 是否支持清除*/
  allowClear?: boolean;
  showSearch?: boolean | ShowSearchType;
  notFoundContent?: React.ReactNode;
  loadData?: (selectedOptions?: CascaderOptionType[]) => void;
  /** 次级菜单的展开方式，可选 'click' 和 'hover' */
  expandTrigger?: CascaderExpandTrigger;
  /** 当此项为 true 时，点选每级菜单选项值都会发生变化 */
  changeOnSelect?: boolean;
  /** 浮层可见变化时回调 */
  onPopupVisibleChange?: (popupVisible: boolean) => void;
  prefixCls?: string;
  inputPrefixCls?: string;
  getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;
  popupVisible?: boolean;
}

export interface CascaderState {
  inputFocused: boolean;
  inputValue: string;
  value: string[];
  popupVisible: boolean | undefined;
  flattenOptions: CascaderOptionType[][];
}

function highlightKeyword(str: string, keyword: string, prefixCls: string | undefined) {
  return str.split(keyword)
    .map((node: string, index: number) => index === 0 ? node : [
      <span className={`${prefixCls}-menu-item-keyword`} key="seperator">{keyword}</span>,
      node,
    ]);
}

function defaultFilterOption(inputValue: string, path: CascaderOptionType[]) {
  return path.some(option => (option.label as string).indexOf(inputValue) > -1);
}

function defaultRenderFilteredOption(inputValue: string, path: CascaderOptionType[], prefixCls: string | undefined) {
  return path.map(({ label }, index) => {
    const node = (label as string).indexOf(inputValue) > -1 ?
      highlightKeyword(label as string, inputValue, prefixCls) : label;
    return index === 0 ? node : [' / ', node];
  });
}

function defaultSortFilteredOption(a: any[], b: any[], inputValue: string) {
  function callback(elem: CascaderOptionType) {
    return (elem.label as string).indexOf(inputValue) > -1;
  }

  return a.findIndex(callback) - b.findIndex(callback);
}

const defaultDisplayRender = (label: string[]) => label.join(' / ');

export default class Cascader extends React.Component<CascaderProps, CascaderState> {
  static defaultProps = {
    prefixCls: 'ant-cascader',
    inputPrefixCls: 'ant-input',
    placeholder: 'Please select',
    transitionName: 'slide-up',
    popupPlacement: 'bottomLeft',
    options: [],
    disabled: false,
    allowClear: true,
    notFoundContent: 'Not Found',
  };

  cachedOptions: CascaderOptionType[];

  private input: Input;

  constructor(props: CascaderProps) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || [],
      inputValue: '',
      inputFocused: false,
      popupVisible: props.popupVisible,
      flattenOptions: props.showSearch && this.flattenTree(props.options, props.changeOnSelect),
    };
  }

  componentWillReceiveProps(nextProps: CascaderProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value || [] });
    }
    if ('popupVisible' in nextProps) {
      this.setState({ popupVisible: nextProps.popupVisible });
    }
    if (nextProps.showSearch && this.props.options !== nextProps.options) {
      this.setState({ flattenOptions: this.flattenTree(nextProps.options, nextProps.changeOnSelect) });
    }
  }

  handleChange = (value: any, selectedOptions: any[]) => {
    this.setState({ inputValue: '' });
    if (selectedOptions[0].__IS_FILTERED_OPTION) {
      const unwrappedValue = value[0];
      const unwrappedSelectedOptions = selectedOptions[0].path;
      this.setValue(unwrappedValue, unwrappedSelectedOptions);
      return;
    }
    this.setValue(value, selectedOptions);
  }

  handlePopupVisibleChange = (popupVisible: boolean) => {
    if (!('popupVisible' in this.props)) {
      this.setState({
        popupVisible,
        inputFocused: popupVisible,
        inputValue: popupVisible ? this.state.inputValue : '',
      });
    }

    const onPopupVisibleChange = this.props.onPopupVisibleChange;
    if (onPopupVisibleChange) {
      onPopupVisibleChange(popupVisible);
    }
  }

  handleInputBlur = () => {
    this.setState({
      inputFocused: false,
    });
  }

  handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { inputFocused, popupVisible } = this.state;
    // Prevent `Trigger` behaviour.
    if (inputFocused || popupVisible) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }
  }

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === KeyCode.BACKSPACE) {
      e.stopPropagation();
    }
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    this.setState({ inputValue });
  }

  setValue = (value: string[], selectedOptions: any[] = []) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(value, selectedOptions);
    }
  }

  getLabel() {
    const { options, displayRender = defaultDisplayRender as Function } = this.props;
    const value = this.state.value;
    const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
    const selectedOptions: CascaderOptionType[] = arrayTreeFilter(options,
      (o: CascaderOptionType, level: number) => o.value === unwrappedValue[level],
    );
    const label = selectedOptions.map(o => o.label);
    return displayRender(label, selectedOptions);
  }

  clearSelection = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.state.inputValue) {
      this.setValue([]);
      this.handlePopupVisibleChange(false);
    } else {
      this.setState({ inputValue: '' });
    }
  }

  flattenTree(options: CascaderOptionType[], changeOnSelect: boolean | undefined, ancestor: CascaderOptionType[] = []) {
    let flattenOptions: any = [];
    options.forEach((option) => {
      const path = ancestor.concat(option);
      if (changeOnSelect || !option.children || !option.children.length) {
        flattenOptions.push(path);
      }
      if (option.children) {
        flattenOptions = flattenOptions.concat(this.flattenTree(option.children, changeOnSelect, path));
      }
    });
    return flattenOptions;
  }

  generateFilteredOptions(prefixCls: string | undefined) {
    const { showSearch, notFoundContent } = this.props;
    const {
      filter = defaultFilterOption,
      render = defaultRenderFilteredOption,
      sort = defaultSortFilteredOption,
    } = showSearch as ShowSearchType;
    const { flattenOptions, inputValue } = this.state;
    const filtered = flattenOptions.filter((path) => filter(this.state.inputValue, path))
      .sort((a, b) => sort(a, b, inputValue));

    if (filtered.length > 0) {
      return filtered.map((path: any) => {
        return {
          __IS_FILTERED_OPTION: true,
          path,
          label: render(inputValue, path, prefixCls),
          value: path.map((o: CascaderOptionType) => o.value),
          disabled: path.some((o: CascaderOptionType) => o.disabled),
        } as CascaderOptionType;
      });
    }
    return [{ label: notFoundContent, value: 'ANT_CASCADER_NOT_FOUND', disabled: true }];
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  saveInput = (node: Input) => {
    this.input = node;
  }

  render() {
    const { props, state } = this;
    const {
      prefixCls, inputPrefixCls, children, placeholder, size, disabled,
      className, style, allowClear, showSearch = false, ...otherProps,
    } = props;
    const value = state.value;

    const sizeCls = classNames({
      [`${inputPrefixCls}-lg`]: size === 'large',
      [`${inputPrefixCls}-sm`]: size === 'small',
    });
    const clearIcon = (allowClear && !disabled && value.length > 0) || state.inputValue ? (
      <Icon
        type="cross-circle"
        className={`${prefixCls}-picker-clear`}
        onClick={this.clearSelection}
      />
    ) : null;
    const arrowCls = classNames({
      [`${prefixCls}-picker-arrow`]: true,
      [`${prefixCls}-picker-arrow-expand`]: state.popupVisible,
    });
    const pickerCls = classNames(
      className, `${prefixCls}-picker`, {
      [`${prefixCls}-picker-with-value`]: state.inputValue,
      [`${prefixCls}-picker-disabled`]: disabled,
      [`${prefixCls}-picker-${size}`]: !!size,
    });

    // Fix bug of https://github.com/facebook/react/pull/5004
    // and https://fb.me/react-unknown-prop
    const inputProps = omit(otherProps, [
      'onChange',
      'options',
      'popupPlacement',
      'transitionName',
      'displayRender',
      'onPopupVisibleChange',
      'changeOnSelect',
      'expandTrigger',
      'popupVisible',
      'getPopupContainer',
      'loadData',
      'popupClassName',
      'filterOption',
      'renderFilteredOption',
      'sortFilteredOption',
      'notFoundContent',
    ]);

    let options = props.options;
    if (state.inputValue) {
      options = this.generateFilteredOptions(prefixCls);
    }
    // Dropdown menu should keep previous status until it is fully closed.
    if (!state.popupVisible) {
      options = this.cachedOptions;
    } else {
      this.cachedOptions = options;
    }

    const dropdownMenuColumnStyle: { width?: number, height?: string } = {};
    const isNotFound = (options || []).length === 1 && options[0].value === 'ANT_CASCADER_NOT_FOUND';
    if (isNotFound) {
      dropdownMenuColumnStyle.height = 'auto'; // Height of one row.
    }
    // The default value of `matchInputWidth` is `true`
    const resultListMatchInputWidth = (showSearch as ShowSearchType).matchInputWidth === false ? false : true;
    if (resultListMatchInputWidth && state.inputValue && this.input) {
      dropdownMenuColumnStyle.width = this.input.input.offsetWidth;
    }

    const input = children || (
      <span
        style={style}
        className={pickerCls}
      >
        <span className={`${prefixCls}-picker-label`}>
          {this.getLabel()}
        </span>
        <Input
          {...inputProps}
          ref={this.saveInput}
          prefixCls={inputPrefixCls}
          placeholder={value && value.length > 0 ? undefined : placeholder}
          className={`${prefixCls}-input ${sizeCls}`}
          value={state.inputValue}
          disabled={disabled}
          readOnly={!showSearch}
          autoComplete="off"
          onClick={showSearch ? this.handleInputClick : undefined}
          onBlur={showSearch ? this.handleInputBlur : undefined}
          onKeyDown={this.handleKeyDown}
          onChange={showSearch ? this.handleInputChange : undefined}
        />
        {clearIcon}
        <Icon type="down" className={arrowCls} />
      </span>
    );

    return (
      <RcCascader
        {...props}
        options={options}
        value={value}
        popupVisible={state.popupVisible}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        onChange={this.handleChange}
        dropdownMenuColumnStyle={dropdownMenuColumnStyle}
      >
        {input}
      </RcCascader>
    );
  }
}
